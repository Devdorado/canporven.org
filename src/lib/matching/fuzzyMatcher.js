/**
 * Fuzzy Name Matching Utility
 * Levenshtein distance + Jaro-Winkler-inspired similarity
 * Optimized for Spanish/Latin American names
 */

function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function similarityScore(a, b) {
  if (!a || !b) return 0;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  const distance = levenshteinDistance(a, b);
  return 1 - distance / maxLen;
}

function normalizeName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9\s]/g, ' ')     // replace special chars with space
    .replace(/\s+/g, ' ')            // collapse multiple spaces
    .trim();
}

function tokenizeName(name) {
  const normalized = normalizeName(name);
  return normalized.split(' ').filter(t => t.length > 1);
}

function nameSimilarity(nameA, nameB) {
  const normA = normalizeName(nameA);
  const normB = normalizeName(nameB);
  
  if (!normA || !normB) return 0;
  
  // Exact match
  if (normA === normB) return 1.0;
  
  // Full string similarity
  const fullSim = similarityScore(normA, normB);
  
  // Token-based similarity (handles reordered names: "Jose Garcia" vs "Garcia Jose")
  const tokensA = tokenizeName(nameA);
  const tokensB = tokenizeName(nameB);
  
  let tokenMatches = 0;
  let totalTokenSim = 0;
  
  for (const tokenA of tokensA) {
    let bestSim = 0;
    for (const tokenB of tokensB) {
      const sim = similarityScore(tokenA, tokenB);
      if (sim > bestSim) bestSim = sim;
    }
    if (bestSim >= 0.75) {
      tokenMatches++;
      totalTokenSim += bestSim;
    }
  }
  
  const tokenSim = tokensA.length > 0 ? totalTokenSim / tokensA.length : 0;
  
  // Combine: weight full string more, but token match helps with reordered names
  return Math.max(fullSim, tokenSim * 0.9);
}

function ageMatch(ageA, ageB, tolerance = 5) {
  if (ageA == null || ageB == null) return null; // unknown
  const diff = Math.abs(ageA - ageB);
  if (diff <= tolerance) return 1 - (diff / tolerance) * 0.3; // 1.0 to 0.7
  return 0;
}

function municipalityMatch(munA, munB) {
  if (!munA || !munB) return null;
  const sim = similarityScore(normalizeName(munA), normalizeName(munB));
  return sim >= 0.9 ? sim : 0;
}

function cedulaMatch(cedulaA, cedulaB) {
  if (!cedulaA || !cedulaB) return null;
  // Extract digits
  const digitsA = cedulaA.replace(/\D/g, '');
  const digitsB = cedulaB.replace(/\D/g, '');
  if (!digitsA || !digitsB) return null;
  
  // Full match
  if (digitsA === digitsB) return 1.0;
  
  // Partial match (last 4 digits)
  const last4A = digitsA.slice(-4);
  const last4B = digitsB.slice(-4);
  if (last4A === last4B && last4A.length === 4) return 0.85;
  
  return 0;
}

/**
 * Calculate overall match confidence (0-1)
 */
function calculateConfidence(match) {
  const weights = {
    name: 0.40,
    cedula: 0.30,
    age: 0.15,
    municipality: 0.15,
  };
  
  let totalWeight = 0;
  let weightedScore = 0;
  
  if (match.nameScore != null) {
    weightedScore += match.nameScore * weights.name;
    totalWeight += weights.name;
  }
  if (match.cedulaScore != null) {
    weightedScore += match.cedulaScore * weights.cedula;
    totalWeight += weights.cedula;
  }
  if (match.ageScore != null) {
    weightedScore += match.ageScore * weights.age;
    totalWeight += weights.age;
  }
  if (match.municipalityScore != null) {
    weightedScore += match.municipalityScore * weights.municipality;
    totalWeight += weights.municipality;
  }
  
  return totalWeight > 0 ? weightedScore / totalWeight : 0;
}

export {
  levenshteinDistance,
  similarityScore,
  normalizeName,
  tokenizeName,
  nameSimilarity,
  ageMatch,
  municipalityMatch,
  cedulaMatch,
  calculateConfidence,
};
