export function toUpperFirstCase(text: string) {
  let textModified = ''

  for (let i = 0; i < text.length; i++) {
    textModified += i === 0 ? text[i].toUpperCase() : text[i].toLowerCase()
  }

  return textModified
}
