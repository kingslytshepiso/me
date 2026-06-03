import React from "react";
import { Platform, Text } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { CertificationTooltip } from "../CertificationTooltip";
import { TestProviders } from "../testHelpers/TestProviders";

function renderWithProviders(ui: React.ReactElement) {
  return render(<TestProviders>{ui}</TestProviders>);
}

describe("CertificationTooltip", () => {
  const originalPlatform = Platform.OS;

  afterEach(() => {
    Platform.OS = originalPlatform;
  });

  it("shows cert name only on web hover", () => {
    Platform.OS = "web";
    const onHoverChange = jest.fn();

    renderWithProviders(
      <CertificationTooltip
        title="AWS Certified Developer – Associate"
        onHoverChange={onHoverChange}
      >
        <Text>child</Text>
      </CertificationTooltip>
    );

    expect(screen.queryByText("AWS Certified Developer – Associate")).toBeNull();

    fireEvent(screen.getByTestId("certification-tooltip-wrapper"), "mouseEnter");

    expect(
      screen.getByText("AWS Certified Developer – Associate")
    ).toBeTruthy();
    expect(screen.queryByText(/Python Institute/)).toBeNull();
    expect(onHoverChange).toHaveBeenCalledWith(true);

    fireEvent(screen.getByTestId("certification-tooltip-wrapper"), "mouseLeave");
    expect(onHoverChange).toHaveBeenCalledWith(false);
  });

  it("does not set inline minHeight on web wrapper (CSS controls layout)", () => {
    Platform.OS = "web";
    renderWithProviders(
      <CertificationTooltip title="PCAP">
        <Text>child</Text>
      </CertificationTooltip>
    );

    const wrapper = screen.getByTestId("certification-tooltip-wrapper");
    const flatStyle = Array.isArray(wrapper.props.style)
      ? Object.assign({}, ...wrapper.props.style)
      : wrapper.props.style;

    expect(flatStyle.minHeight).toBeUndefined();
  });

  it("renders child on native without web tooltip wrapper", () => {
    Platform.OS = "ios";
    renderWithProviders(
      <CertificationTooltip title="PCAP">
        <Text testID="badge-child">child</Text>
      </CertificationTooltip>
    );
    expect(screen.getByTestId("badge-child")).toBeTruthy();
  });
});
