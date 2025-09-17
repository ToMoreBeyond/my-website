export type Crumb = { label: string; href?: string }

export const HOME: Crumb = { label: 'ホーム', href: '/' }
export const PRODUCTS_INDEX: Crumb = { label: 'プロダクト', href: '/#products' }
export const TEAM_INDEX: Crumb = { label: 'チーム', href: '/#team' }

export const productBreadcrumbs = (productName: string): Crumb[] => [
  HOME,
  PRODUCTS_INDEX,
  { label: productName },
]

export const teamBreadcrumbs = (memberName: string): Crumb[] => [
  HOME,
  TEAM_INDEX,
  { label: memberName },
]

