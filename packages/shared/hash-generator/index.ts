export function guid(): string {
  const date = new Date()
  const timestamp = ((date.getTime() / 1000) | 0).toString(16)
  const context = `${timestamp}xxxxxxxxxxxxxxxx`
  const hash = context
    .replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
    .toLowerCase()

  return hash
}
