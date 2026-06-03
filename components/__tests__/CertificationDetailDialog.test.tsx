import React from "react";
import { render, screen } from "@testing-library/react-native";
import type { Certification } from "../../utils/badgeUtils";
import { CertificationDetailDialog } from "../CertificationDetailDialog";
import { TestProviders } from "../testHelpers/TestProviders";

const cert: Certification = {
  id: "pcap-31-03",
  name: "PCAP – Certified Associate Python Programmer",
  issuer: "Python Institute",
  earnedDate: "2026-04",
  badgeKey: "python-pcap",
  azureLevel: null,
  credentialUrl: "https://www.credly.com/badges/TODO_REPLACE",
};

function renderDialog(visible = true) {
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
    renderDialog(true);
    expect(
      screen.getByText("PCAP – Certified Associate Python Programmer")
    ).toBeTruthy();
    expect(screen.getByText("Python Institute")).toBeTruthy();
    expect(screen.getByText("Earned April 2026")).toBeTruthy();
  });

  it("disables View credential when URL is placeholder", () => {
    renderDialog(true);
    expect(screen.getByText("Credential link coming soon.")).toBeTruthy();
    const button = screen.getByText("View credential");
    expect(button).toBeTruthy();
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
    expect(queryByText("View credential")).toBeNull();
  });
});
