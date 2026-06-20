import { ImageSourcePropType } from "react-native";

export type AzureLevel = "foundation" | "associate" | "expert";

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  earnedDate: string;
  badgeKey: string | null;
  azureLevel: AzureLevel | null;
  credentialUrl: string;
}

const badgeImages: Record<string, ImageSourcePropType> = {
  "aws-saa": require("../assets/images/badges/aws-ssa.png"),
  "aws-dva": require("../assets/images/badges/aws-dva.png"),
  "aws-clf": require("../assets/images/badges/aws-clf.png"),
  "aws-aif": require("../assets/images/badges/aws-aif.png"),
  "python-pcap": require("../assets/images/badges/pcap.png"),
  "python-pcep": require("../assets/images/badges/pcep.png"),
  "azure-foundation": require("../assets/images/badges/microsoft-certified-fundamentals-badge.png"),
  "azure-associate": require("../assets/images/badges/microsoft-certified-associate-badge.png"),
  "azure-expert": require("../assets/images/badges/microsoft-certified-expert-badge.png"),
  "snowflake": require("../assets/images/badges/snowflake.png"),
  "github-administration": require("../assets/images/badges/github-administration.png"),
};

export function resolveBadgeKey(cert: Certification): string | null {
  if (cert.badgeKey && badgeImages[cert.badgeKey]) {
    return cert.badgeKey;
  }

  if (cert.badgeKey === "azure" && cert.azureLevel) {
    const azureKey = `azure-${cert.azureLevel}`;
    return badgeImages[azureKey] ? azureKey : null;
  }

  return null;
}

export function getBadgeImageSource(
  cert: Certification
): ImageSourcePropType | null {
  const key = resolveBadgeKey(cert);
  if (!key) return null;
  return badgeImages[key] ?? null;
}

export function usesIconFallback(cert: Certification): boolean {
  return getBadgeImageSource(cert) === null;
}

/** @deprecated Use getBadgeImageSource instead */
export function getBadgeSource(cert: Certification): ImageSourcePropType | null {
  return getBadgeImageSource(cert);
}

export function isPlaceholderCredentialUrl(url: string): boolean {
  return url.includes("TODO_REPLACE");
}

export function getCredentialAction(
  cert: Certification,
  linkedInFallback: string
): { url: string; label: string } {
  const isLinkedInProfile = cert.credentialUrl.includes(
    "linkedin.com/in/kingsly-m-062a7bb8"
  );
  const url = isLinkedInProfile ? linkedInFallback : cert.credentialUrl;
  const label = isLinkedInProfile ? "View on LinkedIn" : "View credential";
  return { url, label };
}
