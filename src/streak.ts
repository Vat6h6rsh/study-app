export const STREAK_KEY = 'exam-desk.practice-streak.v1'

export function loadStreak(): number {
  try {
    const value = JSON.parse(localStorage.getItem(STREAK_KEY) || '0')
    return Number.isSafeInteger(value) && value >= 0 ? value : 0
  } catch { return 0 }
}

export function storeStreak(value: number) {
  try { localStorage.setItem(STREAK_KEY, JSON.stringify(value)) } catch { /* Session still works. */ }
}
