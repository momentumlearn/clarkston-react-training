const textOptions = [
  {
    id: 'ampersand',
    label: 'Replace "and" with ampersand',
    fn: text => text.replace(/\band\b/, '&')
  },
  {
    id: 'with',
    label: 'Replace "with" with "w/"',
    fn: text => text.replace(/\bwith\b/, 'w/')
  },
  {
    id: 'because',
    label: 'Replace "because" with "b/c"',
    fn: text => text.replace(/\bbecause\b/, 'b/c')
  },
  {
    id: 'oxford',
    label: 'Eliminate Oxford commas',
    fn: text => text.replace(/,\s+(and|&)\s+/, ' $1 ')
  }
]

export default textOptions
