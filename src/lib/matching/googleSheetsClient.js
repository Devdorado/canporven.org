/**
 * Google Sheets Client for Hospital Patient Data
 * 
 * Usage:
 *   const client = new GoogleSheetsClient({
 *     apiKey: 'YOUR_GOOGLE_API_KEY',
 *     spreadsheetId: '1FlFw-gu...',
 *     range: 'Sheet1!A2:Z',
 *   });
 *   const patients = await client.fetchPatients();
 */

export class GoogleSheetsClient {
  constructor({ apiKey, spreadsheetId, range = 'Sheet1!A2:Z' }) {
    if (!apiKey) throw new Error('GoogleSheetsClient: apiKey is required');
    if (!spreadsheetId) throw new Error('GoogleSheetsClient: spreadsheetId is required');
    
    this.apiKey = apiKey;
    this.spreadsheetId = spreadsheetId;
    this.range = range;
    this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  }

  async fetchRawData() {
    const url = `${this.baseUrl}/${this.spreadsheetId}/values/${encodeURIComponent(this.range)}?key=${this.apiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Google Sheets API error ${res.status}: ${err}`);
    }
    const data = await res.json();
    return data.values || [];
  }

  /**
   * Parse rows into normalized patient objects.
   * 
   * Expected columns (configurable via headerMap):
   *   - name / nombre
   *   - age / edad
   *   - cedula / documento
   *   - sex / sexo
   *   - municipio
   *   - hospital
   *   - status / estado
   *   - notes / notas
   */
  async fetchPatients(headerMap = {}) {
    const rows = await this.fetchRawData();
    if (rows.length === 0) return [];

    // Auto-detect headers from first row if they look like headers
    const firstRow = rows[0];
    const hasHeaders = firstRow.some(cell => 
      /nombre|name|edad|age|cedula|hospital|municipio|sexo|sex/i.test(cell)
    );

    const dataRows = hasHeaders ? rows.slice(1) : rows;
    const headers = hasHeaders 
      ? firstRow.map(h => normalizeHeader(h))
      : buildDefaultHeaders(firstRow.length);

    // Map column names to indices
    const colMap = {
      name: findColIndex(headers, headerMap.name || ['nombre', 'name', 'paciente', 'persona']),
      age: findColIndex(headers, headerMap.age || ['edad', 'age', 'años']),
      cedula: findColIndex(headers, headerMap.cedula || ['cedula', 'documento', 'id', 'dni', 'ci']),
      sex: findColIndex(headers, headerMap.sex || ['sexo', 'sex', 'genero', 'gender']),
      municipio: findColIndex(headers, headerMap.municipio || ['municipio', 'ciudad', 'city', 'lugar']),
      hospital: findColIndex(headers, headerMap.hospital || ['hospital', 'centro', 'clinica', 'institucion']),
      status: findColIndex(headers, headerMap.status || ['estado', 'status', 'condicion', 'situacion']),
      notes: findColIndex(headers, headerMap.notes || ['notas', 'notes', 'observaciones', 'detalles']),
    };

    return dataRows.map((row, idx) => ({
      id: `sheet_${idx}`,
      source: 'google_sheets',
      displayName: getCell(row, colMap.name) || '',
      cedula: getCell(row, colMap.cedula) || '',
      age: parseAge(getCell(row, colMap.age)),
      sex: getCell(row, colMap.sex) || '',
      municipio: getCell(row, colMap.municipio) || '',
      hospitalName: getCell(row, colMap.hospital) || '',
      status: getCell(row, colMap.status) || 'hospitalizado',
      notes: getCell(row, colMap.notes) || '',
      rawRow: row,
    }));
  }
}

function normalizeHeader(h) {
  return String(h || '').toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function buildDefaultHeaders(count) {
  // If no headers detected, assume: A=name, B=age, C=cedula, D=sex, E=municipio, F=hospital
  const defaults = ['nombre', 'edad', 'cedula', 'sexo', 'municipio', 'hospital'];
  return Array.from({ length: count }, (_, i) => defaults[i] || `col_${i}`);
}

function findColIndex(headers, candidates) {
  for (const candidate of candidates) {
    const norm = normalizeHeader(candidate);
    const idx = headers.indexOf(norm);
    if (idx >= 0) return idx;
  }
  return -1;
}

function getCell(row, index) {
  if (index < 0 || index >= row.length) return '';
  return String(row[index] || '').trim();
}

function parseAge(value) {
  if (!value) return null;
  const num = parseInt(value, 10);
  return isNaN(num) ? null : num;
}

export default GoogleSheetsClient;
