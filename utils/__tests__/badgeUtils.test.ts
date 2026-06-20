import type { Certification } from "../badgeUtils";
import {
  getBadgeImageSource,
  getCredentialAction,
  resolveBadgeKey,
  usesIconFallback,
} from "../badgeUtils";

const base: Omit<Certification, "id" | "name" | "badgeKey" | "azureLevel"> = {
  issuer: "Test",
  earnedDate: "2026-01",
  credentialUrl: "https://example.com",
};

describe("badgeUtils", () => {
  it("resolves AWS SAA badge key", () => {
    const cert: Certification = {
      ...base,
      id: "aws-saa",
      name: "SAA",
      badgeKey: "aws-saa",
      azureLevel: null,
    };
    expect(resolveBadgeKey(cert)).toBe("aws-saa");
    expect(usesIconFallback(cert)).toBe(false);
  });

  it("resolves Azure associate tier", () => {
    const cert: Certification = {
      ...base,
      id: "az-dev",
      name: "Azure Developer",
      badgeKey: "azure",
      azureLevel: "associate",
    };
    expect(resolveBadgeKey(cert)).toBe("azure-associate");
    expect(getBadgeImageSource(cert)).not.toBeNull();
  });

  it("uses icon fallback for unknown certs", () => {
    const cert: Certification = {
      ...base,
      id: "snow",
      name: "SnowPro",
      badgeKey: null,
      azureLevel: null,
    };
    expect(resolveBadgeKey(cert)).toBeNull();
    expect(usesIconFallback(cert)).toBe(true);
    expect(getBadgeImageSource(cert)).toBeNull();
  });

  it("resolves aws-clf and python-pcep keys", () => {
    expect(
      resolveBadgeKey({
        ...base,
        id: "ccp",
        name: "CCP",
        badgeKey: "aws-clf",
        azureLevel: null,
      })
    ).toBe("aws-clf");
    expect(
      resolveBadgeKey({
        ...base,
        id: "pcep",
        name: "PCEP",
        badgeKey: "python-pcep",
        azureLevel: null,
      })
    ).toBe("python-pcep");
  });

  it("resolves snowflake and github-administration badge keys", () => {
    const snowflake: Certification = {
      ...base,
      id: "snowpro-core",
      name: "SnowPro Core",
      badgeKey: "snowflake",
      azureLevel: null,
    };
    const github: Certification = {
      ...base,
      id: "github-administration",
      name: "GitHub Administration",
      badgeKey: "github-administration",
      azureLevel: null,
    };
    expect(resolveBadgeKey(snowflake)).toBe("snowflake");
    expect(usesIconFallback(snowflake)).toBe(false);
    expect(resolveBadgeKey(github)).toBe("github-administration");
    expect(getBadgeImageSource(github)).not.toBeNull();
  });

  describe("getCredentialAction", () => {
    const linkedInFallback = "https://www.linkedin.com/in/kingsly-m-062a7bb8";

    it("returns credential URL and label for verification links", () => {
      const cert: Certification = {
        ...base,
        id: "github-administration",
        name: "GitHub Administration",
        badgeKey: "github-administration",
        azureLevel: null,
        credentialUrl:
          "https://learn.microsoft.com/api/credentials/share/en-us/example",
      };
      expect(getCredentialAction(cert, linkedInFallback)).toEqual({
        url: cert.credentialUrl,
        label: "View credential",
      });
    });

    it("falls back to LinkedIn for profile placeholder URLs", () => {
      const cert: Certification = {
        ...base,
        id: "aws-saa",
        name: "SAA",
        badgeKey: "aws-saa",
        azureLevel: null,
        credentialUrl: linkedInFallback,
      };
      expect(getCredentialAction(cert, linkedInFallback)).toEqual({
        url: linkedInFallback,
        label: "View on LinkedIn",
      });
    });
  });
});
