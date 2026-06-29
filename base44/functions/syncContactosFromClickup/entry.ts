import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const LIST_ID = '901524133837';

// Map of ClickUp custom field name (exact) -> Contacto field
const FIELD_MAP = {
  Categoria: 'categoria',
  Tipo: 'tipo',
  Pais: 'pais',
  Ciudad: 'ciudad',
  Telefono: 'telefono',
  Email: 'email',
  Website: 'website',
  Area: 'area',
  EstadoOperativo: 'estadoOperativo',
  Verificado: 'verificado',
  Fuente: 'fuente',
  Stand: 'stand',
  Notas: 'notas',
};

// Resolve a ClickUp custom field value into a plain string.
function resolveCustomFieldValue(cf) {
  const val = cf.value;
  if (val === null || val === undefined || val === '') return '';

  // Dropdown / labels: value is an index or array of ids -> look up in type_config.options
  const options = cf.type_config?.options;
  if (options && Array.isArray(options)) {
    // single dropdown: value is the option index or id
    if (!Array.isArray(val)) {
      const opt = options.find((o) => o.id === val || o.orderindex === val);
      if (opt) return opt.name ?? opt.label ?? String(val);
    } else {
      // labels: array of option ids
      const names = val
        .map((id) => {
          const opt = options.find((o) => o.id === id || o.orderindex === id);
          return opt ? (opt.name ?? opt.label) : null;
        })
        .filter(Boolean);
      if (names.length) return names.join(', ');
    }
  }

  if (Array.isArray(val)) return val.join(', ');
  if (typeof val === 'object') {
    // e.g. {email}, {formatted}, etc.
    return val.email || val.formatted || val.value || JSON.stringify(val);
  }
  return String(val);
}

function mapTaskToContacto(task) {
  const contacto = {
    nombre: task.name || '',
    clickupTaskId: task.id,
    syncedAt: new Date().toISOString(),
  };

  const customFields = Array.isArray(task.custom_fields) ? task.custom_fields : [];
  for (const cf of customFields) {
    const target = FIELD_MAP[cf.name];
    if (target) {
      contacto[target] = resolveCustomFieldValue(cf);
    }
  }
  return contacto;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Admin-only guard.
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const token = Deno.env.get('CLICKUP_API_KEY');
    if (!token) {
      return Response.json({ error: 'CLICKUP_API_KEY is not set' }, { status: 500 });
    }

    // 1) Fetch all tasks from the list, paginated.
    const allTasks = [];
    let page = 0;
    let lastPage = false;
    while (!lastPage && page < 50) {
      const url = `https://api.clickup.com/api/v2/list/${LIST_ID}/task?include_closed=true&page=${page}`;
      const res = await fetch(url, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const body = await res.text();
        return Response.json(
          { error: `ClickUp API error (${res.status})`, detail: body.slice(0, 500) },
          { status: 502 },
        );
      }
      const data = await res.json();
      const tasks = Array.isArray(data.tasks) ? data.tasks : [];
      allTasks.push(...tasks);
      lastPage = data.last_page === true || tasks.length === 0;
      page += 1;
    }

    // 2) Load existing mirror records to know which clickupTaskIds exist.
    const existing = await base44.asServiceRole.entities.Contacto.list('-syncedAt', 5000);
    const byTaskId = new Map();
    for (const rec of existing) {
      if (rec.clickupTaskId) byTaskId.set(rec.clickupTaskId, rec);
    }

    // 3) Upsert one-way.
    let created = 0;
    let updated = 0;
    let errors = 0;
    const db = base44.asServiceRole.entities.Contacto;

    for (const task of allTasks) {
      try {
        const contacto = mapTaskToContacto(task);
        const found = byTaskId.get(task.id);
        if (found) {
          await db.update(found.id, contacto);
          updated += 1;
        } else {
          await db.create(contacto);
          created += 1;
        }
      } catch (_e) {
        errors += 1;
      }
    }

    return Response.json({
      synced: allTasks.length,
      created,
      updated,
      errors,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});