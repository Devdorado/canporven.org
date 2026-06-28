import {
  nameSimilarity,
  ageMatch,
  municipalityMatch,
  cedulaMatch,
  calculateConfidence,
} from './fuzzyMatcher.js';

/**
 * Match missing persons (SOS Venezuela) against hospital patients (Google Sheets)
 * 
 * @param {Array} missingPersons - Normalized persons from SOS Venezuela
 * @param {Array} hospitalPatients - Normalized patients from Google Sheets
 * @param {Object} options - Matching thresholds
 * @returns {Array} Matches with confidence scores
 */
export function findMatches(missingPersons, hospitalPatients, options = {}) {
  const {
    nameThreshold = 0.75,
    maxResultsPerPerson = 5,
    minConfidence = 0.50,
  } = options;

  const matches = [];

  for (const missing of missingPersons) {
    const candidateMatches = [];

    for (const patient of hospitalPatients) {
      // Calculate individual scores
      const nameScore = nameSimilarity(missing.displayName, patient.displayName);
      
      // If name similarity is too low, skip (early pruning)
      if (nameScore < nameThreshold * 0.5) continue;

      const cedulaScore = cedulaMatch(missing.cedula, patient.cedula);
      const ageScore = ageMatch(missing.age, patient.age);
      const municipalityScore = municipalityMatch(missing.municipio, patient.municipio);

      const match = {
        missingPerson: missing,
        hospitalPatient: patient,
        nameScore,
        cedulaScore,
        ageScore,
        municipalityScore,
      };

      match.confidence = calculateConfidence(match);

      // Boost confidence if cedula matches (strong signal)
      if (cedulaScore === 1.0) {
        match.confidence = Math.min(1.0, match.confidence + 0.15);
        match.cedulaMatch = true;
      }

      if (match.confidence >= minConfidence) {
        candidateMatches.push(match);
      }
    }

    // Sort by confidence and take top results
    candidateMatches.sort((a, b) => b.confidence - a.confidence);
    const topMatches = candidateMatches.slice(0, maxResultsPerPerson);

    if (topMatches.length > 0) {
      matches.push({
        missingPerson: missing,
        matches: topMatches,
        bestConfidence: topMatches[0].confidence,
        requiresHumanReview: topMatches[0].confidence < 0.85,
      });
    }
  }

  // Sort overall results by best confidence
  matches.sort((a, b) => b.bestConfidence - a.bestConfidence);

  return matches;
}

/**
 * Generate a human-readable summary of matches
 */
export function formatMatchSummary(matchResult) {
  const { missingPerson, matches, requiresHumanReview } = matchResult;
  const best = matches[0];

  const status = requiresHumanReview ? '⚠️ REVISAR' : '✅ POSIBLE';
  const confidence = Math.round(best.confidence * 100);

  let summary = `${status} ${missingPerson.displayName} (confianza: ${confidence}%)\n`;
  summary += `  Desaparecido: ${missingPerson.municipio || '?'}, ${missingPerson.age ?? '?'} años\n`;
  
  for (const m of matches.slice(0, 3)) {
    const p = m.hospitalPatient;
    summary += `  → ${p.displayName} @ ${p.hospitalName || '?'} (${Math.round(m.confidence * 100)}%)`;
    if (m.cedulaMatch) summary += ' [CEDULA COINCIDE]';
    summary += '\n';
  }

  return summary;
}

/**
 * Export matches to a format suitable for display in a React component
 */
export function matchesToDisplayFormat(matchResults) {
  return matchResults.map(result => ({
    missingPerson: {
      id: result.missingPerson.id,
      name: result.missingPerson.displayName,
      age: result.missingPerson.age,
      sex: result.missingPerson.sex,
      municipio: result.missingPerson.municipio,
      cedula: result.missingPerson.cedula,
      photo: result.missingPerson.photoPath,
      sourceUrl: `https://sosvenezuela2026.com/personas/${result.missingPerson.id}`,
    },
    candidates: result.matches.map(m => ({
      id: m.hospitalPatient.id,
      name: m.hospitalPatient.displayName,
      age: m.hospitalPatient.age,
      sex: m.hospitalPatient.sex,
      municipio: m.hospitalPatient.municipio,
      hospital: m.hospitalPatient.hospitalName,
      cedula: m.hospitalPatient.cedula,
      notes: m.hospitalPatient.notes,
      confidence: Math.round(m.confidence * 100),
      cedulaMatch: m.cedulaMatch || false,
      nameScore: Math.round(m.nameScore * 100),
      ageScore: m.ageScore != null ? Math.round(m.ageScore * 100) : null,
      municipalityScore: m.municipalityScore != null ? Math.round(m.municipalityScore * 100) : null,
      requiresReview: m.confidence < 0.85,
    })),
    bestConfidence: Math.round(result.bestConfidence * 100),
    requiresHumanReview: result.requiresHumanReview,
  }));
}

/**
 * Run the full matching pipeline
 */
export async function runMatchingPipeline({
  sosVenezuelaClient,
  googleSheetsClient,
  options = {},
}) {
  console.log('🔄 Fetching missing persons from SOS Venezuela 2026...');
  const missingPersons = await sosVenezuelaClient.fetchNormalizedMissingPersons();
  console.log(`  → ${missingPersons.length} missing persons loaded`);

  console.log('🔄 Fetching hospital patients from Google Sheets...');
  const hospitalPatients = await googleSheetsClient.fetchPatients();
  console.log(`  → ${hospitalPatients.length} hospital patients loaded`);

  console.log('🔍 Running fuzzy matching...');
  const matches = findMatches(missingPersons, hospitalPatients, options);
  console.log(`  → ${matches.length} potential matches found`);

  const displayMatches = matchesToDisplayFormat(matches);
  
  return {
    stats: {
      missingPersons: missingPersons.length,
      hospitalPatients: hospitalPatients.length,
      potentialMatches: matches.length,
      highConfidence: matches.filter(m => m.bestConfidence >= 0.85).length,
      needsReview: matches.filter(m => m.requiresHumanReview).length,
    },
    matches: displayMatches,
  };
}
