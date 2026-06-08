import type { CategoryId } from './categoryThemes'

export const HOME_TAB_QUERY = 'tab'

const HOME_TAB_IDS: CategoryId[] = ['flights', 'trains', 'buses', 'hotels', 'darshan']

export function isCategoryId(value: string | null): value is CategoryId {
  return value !== null && HOME_TAB_IDS.includes(value as CategoryId)
}

export function categoryFromHomeTab(tab: string | null): CategoryId {
  return isCategoryId(tab) ? tab : 'flights'
}

export const HOME_DARSHAN_PATH = `/?${HOME_TAB_QUERY}=darshan`

export function isHomeDarshanView(pathname: string, search: string): boolean {
  return pathname === '/' && new URLSearchParams(search).get(HOME_TAB_QUERY) === 'darshan'
}
