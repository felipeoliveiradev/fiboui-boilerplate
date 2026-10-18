/**
 * Move the FiboUI Router. Next stays the host; it does not own the screens.
 * `pushState` updates the URL. The popstate event is what Router listens to.
 */
export function go(to: string) {
  if (typeof window === 'undefined') return
  const path = to.startsWith('/') ? to : `/${to}`
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (current === path) return
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
