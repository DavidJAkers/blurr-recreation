export default function normalizeString(str: string) {
  const strNoInnerspaces = str.replace(/\s+/g, '')
  const strNoOuterspaces = strNoInnerspaces.trim()
  const strNoAsterisk = strNoOuterspaces.replace('*', '')
  const strUpper = strNoAsterisk.toUpperCase()
  return strUpper
}
