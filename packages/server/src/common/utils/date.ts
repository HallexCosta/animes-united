export function getCurrentDate(
  showNameMonth = false,
  abbreviateMonth = false
): string {
  const monthsAbbreviation = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const monthsComplete = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const today = new Date()

  const currentYear = today.getFullYear()

  const currentMonth: string | number = showNameMonth
    ? abbreviateMonth
      ? monthsAbbreviation[today.getMonth()]
      : monthsComplete[today.getMonth()]
    : today.getMonth()
  const currentDay = today.getDate()

  const currentDate = `${currentYear}-${currentMonth}-${currentDay}`

  return currentDate
}

export function getCurrentTime(): string {
  const today = new Date()

  const currentHours = today.getHours()
  const currentMinutes = today.getMinutes()
  const currentSeconds = today.getSeconds()

  const currentTime = `${currentHours}:${currentMinutes}:${currentSeconds}`

  return currentTime
}
