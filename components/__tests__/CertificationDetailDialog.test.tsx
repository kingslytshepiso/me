import React from "react";
import { render, screen } from "@testing-library/react-native";
import { LINKEDIN_PROFILE_URL } from "../../constants/profileLinks";
import type { Certification } from "../../utils/badgeUtils";
import { CertificationDetailDialog } from "../CertificationDetailDialog";
import { TestProviders } from "../testHelpers/TestProviders";

const certWithLinkedIn: Certification = {
  id: "pcap-31-03",
  name: "PCAP – Certified Associate Python Programmer",
  issuer: "Python Institute",
  earnedDate: "2026-04",
  badgeKey: "python-pcap",
  azureLevel: null,
  credentialUrl: LINKEDIN_PROFILE_URL,
};

const certWithVerificationUrl: Certification = {
  id: "github-administration",
  name: "GitHub Administration Certification",
  issuer: "Microsoft",
  earnedDate: "2026-06",
  badgeKey: "github-administration",
  azureLevel: null,
  credentialUrl:
    "https://learn.microsoft.com/api/credentials/share/en-us/kingslyMokgwathi-5489/9B50A8D5A91399DA?sharingId=21CF9C60CCCF4686",
};

function renderDialog(
  cert: Certification | null = certWithLinkedIn,
  visible = true
) {
  return render(
    <TestProviders>
      <CertificationDetailDialog
        cert={cert}
        visible={visible}
        onDismiss={jest.fn()}
      />
    </TestProviders>
  );
}

describe("CertificationDetailDialog", () => {
  it("shows certification name and issuer when visible", () => {
    renderDialog(certWithLinkedIn, true);
    expect(
      screen.getByText("PCAP – Certified Associate Python Programmer")
    ).toBeTruthy();
    expect(screen.getByText("Python Institute")).toBeTruthy();
    expect(screen.getByText("Earned April 2026")).toBeTruthy();
  });

  it("shows View on LinkedIn when credential URL is the LinkedIn profile", () => {
    renderDialog(certWithLinkedIn, true);
    expect(screen.getByText("View on LinkedIn")).toBeTruthy();
    expect(screen.queryByText("View credential")).toBeNull();
  });

  it("shows View credential when a verification URL is set", () => {
    renderDialog(certWithVerificationUrl, true);
    expect(screen.getByText("View credential")).toBeTruthy();
    expect(screen.queryByText("View on LinkedIn")).toBeNull();
  });

  it("renders nothing when cert is null", () => {
    const { queryByText } = render(
      <TestProviders>
        <CertificationDetailDialog
          cert={null}
          visible={true}
          onDismiss={jest.fn()}
        />
      </TestProviders>
    );
    expect(queryByText("View on LinkedIn")).toBeNull();
    expect(queryByText("View credential")).toBeNull();
  });
});
