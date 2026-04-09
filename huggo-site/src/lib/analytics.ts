/**
 * Plausible-compatible event tracking utilities.
 */

/**
 * Sends a custom event to Plausible Analytics.
 * Safely no-ops if Plausible is not loaded or running server-side.
 */
export function trackEvent(eventName: string, props?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, { props });
  }
}

/**
 * Tracks a demo request event with the originating source.
 */
export function trackDemoRequest(source: string) {
  trackEvent('Demo Request', { source });
}

/**
 * Tracks a contact form submission with the form type.
 */
export function trackContactForm(type: 'merchant' | 'distributor') {
  trackEvent('Contact Form', { type });
}
