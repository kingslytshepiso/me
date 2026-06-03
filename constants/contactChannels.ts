import { Ionicons } from "@expo/vector-icons";
import { PROFILE } from "./profile";
import { SOCIAL_LINKS } from "./profileLinks";

export type ContactChannelId =
  | "email"
  | "phone"
  | "whatsapp"
  | "github"
  | "twitter"
  | "linkedin";

export type ContactChannelKind = "direct" | "social";

export interface ContactChannel {
  id: ContactChannelId;
  kind: ContactChannelKind;
  url: string;
  icon: keyof typeof Ionicons.glyphMap;
  accessibilityLabel: string;
  accessibilityHint?: string;
  displayText?: string;
}

const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Kingsly, I saw your portfolio and wanted to connect.";

function phoneTelToWhatsAppDigits(phoneTel: string): string {
  return phoneTel.replace(/\D/g, "");
}

export function buildWhatsAppUrl(phoneTel: string, message?: string): string {
  const digits = phoneTelToWhatsAppDigits(phoneTel);
  const text = encodeURIComponent(message ?? WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${digits}?text=${text}`;
}

export const WHATSAPP_URL = buildWhatsAppUrl(PROFILE.contact.phoneTel);

export const DIRECT_CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "email",
    kind: "direct",
    url: `mailto:${PROFILE.contact.email}`,
    icon: "mail-outline",
    accessibilityLabel: `Email ${PROFILE.contact.email}`,
    accessibilityHint: "Opens your email app",
    displayText: PROFILE.contact.email,
  },
  {
    id: "phone",
    kind: "direct",
    url: `tel:${PROFILE.contact.phoneTel}`,
    icon: "call-outline",
    accessibilityLabel: `Phone ${PROFILE.contact.phone}`,
    accessibilityHint: "Opens your phone app",
    displayText: PROFILE.contact.phone,
  },
  {
    id: "whatsapp",
    kind: "direct",
    url: WHATSAPP_URL,
    icon: "logo-whatsapp",
    accessibilityLabel: `Message on WhatsApp, ${PROFILE.contact.phone}`,
    accessibilityHint: "Opens WhatsApp to start a chat",
    displayText: "WhatsApp",
  },
];

export const SOCIAL_CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "github",
    kind: "social",
    url: SOCIAL_LINKS.github,
    icon: "logo-github",
    accessibilityLabel: "Open GitHub profile",
    accessibilityHint: "Opens GitHub in your browser",
  },
  {
    id: "twitter",
    kind: "social",
    url: SOCIAL_LINKS.twitter,
    icon: "logo-twitter",
    accessibilityLabel: "Open Twitter profile",
    accessibilityHint: "Opens Twitter in your browser",
  },
  {
    id: "linkedin",
    kind: "social",
    url: SOCIAL_LINKS.linkedin,
    icon: "logo-linkedin",
    accessibilityLabel: "Open LinkedIn profile",
    accessibilityHint: "Opens LinkedIn in your browser",
  },
];

export const FAB_CONTACT_CHANNELS: ContactChannel[] = [
  ...DIRECT_CONTACT_CHANNELS,
  ...SOCIAL_CONTACT_CHANNELS,
];

export function getChannelById(id: ContactChannelId): ContactChannel | undefined {
  return FAB_CONTACT_CHANNELS.find((channel) => channel.id === id);
}

export function isDirectChannel(id: ContactChannelId): boolean {
  return DIRECT_CONTACT_CHANNELS.some((channel) => channel.id === id);
}
