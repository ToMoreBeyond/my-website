/**
 * 起動画面（LoadingOverlay）が終わったことをページへ知らせる小さな合図。
 * Hero の演出は、この合図を待ってから始める。
 */
export const READY_EVENT = 'tmb:ready'
const READY_ATTR = 'data-site-ready'

export function markSiteReady() {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute(READY_ATTR, 'true')
  window.dispatchEvent(new Event(READY_EVENT))
}

export function isSiteReady(): boolean {
  if (typeof document === 'undefined') return false
  return document.documentElement.getAttribute(READY_ATTR) === 'true'
}
