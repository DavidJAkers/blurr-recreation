const normalizeString = (str: string): string => {
  const str_no_innerspaces = str.replace(/\s+/g, "")
  const str_no_outerspaces = str_no_innerspaces.trim()
  const str_no_asterisk = str_no_outerspaces.replace('*', "")
  const str_upper = str_no_asterisk.toUpperCase()
  return str_upper
} 

export default normalizeString