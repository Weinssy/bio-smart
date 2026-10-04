/**
 * Utility untuk resolusi aset media (gambar, diagram, ikon)
 * Memastikan kompatibilitas penuh dengan base path Vite (misalnya GitHub Pages: /biosmart-sma/)
 */

/**
 * Resolves an asset path to its full URL or path considering Vite's BASE_URL
 * @param {string} src - The relative or absolute path of the asset
 * @returns {string} The fully resolved URL
 */
export function resolveAsset(src) {
  if (!src || typeof src !== 'string') {
    return ''
  }

  // Handle external/data URLs
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src
  }

  // Format base URL
  const baseUrl = import.meta.env?.BASE_URL || '/'
  const formattedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`

  // Strip leading slash(es) from relative path
  const cleanPath = src.replace(/^\/+/, '')

  return `${formattedBase}${cleanPath}`
}

/**
 * Checks whether an asset source is local to the repository
 * @param {string} src - The asset source path
 * @returns {boolean}
 */
export function isLocalAsset(src) {
  if (!src || typeof src !== 'string') return false
  return !src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('//')
}

/**
 * Validasi struktur diagram secara ringan pada waktu pengembangan (development-time)
 * Mencegah error runtime pada diagram parts dan hotspot
 * @param {object} diagram - Objek data diagram
 * @returns {boolean} true jika valid
 */
export function validateDiagramData(diagram) {
  if (!diagram || typeof diagram !== 'object') {
    if (import.meta.env?.DEV) console.warn('[DiagramValidator] Objek diagram tidak valid:', diagram)
    return false
  }

  if (!diagram.src) {
    if (import.meta.env?.DEV) console.warn('[DiagramValidator] Diagram tidak memiliki properti "src":', diagram.title)
    return false
  }

  if (!Array.isArray(diagram.parts)) {
    if (import.meta.env?.DEV) console.warn('[DiagramValidator] diagram.parts harus berupa array:', diagram.title)
    return false
  }

  const seenIds = new Set()
  for (let i = 0; i < diagram.parts.length; i++) {
    const part = diagram.parts[i]
    if (!part.id) {
      if (import.meta.env?.DEV) console.warn(`[DiagramValidator] Bagian index ${i} tidak memiliki 'id'`, diagram.title)
      return false
    }
    if (seenIds.has(part.id)) {
      if (import.meta.env?.DEV) console.warn(`[DiagramValidator] Duplikasi part ID '${part.id}' ditemukan`, diagram.title)
      return false
    }
    seenIds.add(part.id)

    if (!part.label) {
      if (import.meta.env?.DEV) console.warn(`[DiagramValidator] Part '${part.id}' tidak memiliki label`, diagram.title)
      return false
    }

    if (!part.hotspot || typeof part.hotspot.x !== 'number' || typeof part.hotspot.y !== 'number') {
      if (import.meta.env?.DEV) console.warn(`[DiagramValidator] Part '${part.id}' koordinat hotspot tidak valid`, diagram.title)
      return false
    }

    if (part.hotspot.x < 0 || part.hotspot.x > 100 || part.hotspot.y < 0 || part.hotspot.y > 100) {
      if (import.meta.env?.DEV) console.warn(`[DiagramValidator] Part '${part.id}' hotspot di luar jangkauan (0-100)`, diagram.title)
      return false
    }
  }

  return true
}
