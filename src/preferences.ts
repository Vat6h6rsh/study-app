export const themeChoices = ['system', 'paper', 'sky', 'midnight', 'ember'] as const
export type ThemeChoice = typeof themeChoices[number]
export const THEME_KEY = 'exam-desk.theme'
export const SIDEBAR_KEY = 'exam-desk.sidebar-collapsed'

export function preference(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}
export function persistPreference(key: string, value: string) {
  try { localStorage.setItem(key, value) } catch { /* Preferences remain usable without storage. */ }
}
export function savedTheme(): ThemeChoice {
  const value = preference(THEME_KEY)
  return themeChoices.includes(value as ThemeChoice) ? value as ThemeChoice : 'system'
}
export function resolvedTheme(choice: ThemeChoice, dark: boolean) {
  return choice === 'system' ? dark ? 'midnight' : 'paper' : choice
}
