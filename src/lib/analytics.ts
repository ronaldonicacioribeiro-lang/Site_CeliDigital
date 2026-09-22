import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Fires a dataLayer event GTM can pick up as a conversion trigger — same
 * pattern used for the Google Ads conversion tag on the Ventura Odontologia
 * container. `location` says which CTA was clicked (navbar, hero, footer...)
 * so it's possible to compare which one actually converts.
 */
export function trackWhatsappClick(location: string) {
  sendGTMEvent({ event: "whatsapp_click", cta_location: location });
}
