// ============================================================
// Certifications — affichées dans la section Compétences.
// ============================================================

export interface Certification {
  name: string
  issuer: string
  year: string
}

export const certifications: Certification[] = [
  { name: 'Virtual Assistant', issuer: 'Alx', year: '2024' },
  { name: 'Python Essential 1', issuer: 'Cisco', year: '2024' },
  { name: 'CI/CD, SQL', issuer: 'Simplilearn Skillup', year: '2024' },
]
