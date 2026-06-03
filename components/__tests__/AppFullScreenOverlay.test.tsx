import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { OVERLAY_MODAL_ANIMATION } from "../../constants/overlay";
import { AppFullScreenOverlay } from "../AppFullScreenOverlay";
import { TestProviders } from "../testHelpers/TestProviders";

function renderOverlay(
  props: Partial<React.ComponentProps<typeof AppFullScreenOverlay>> = {}
) {
  const onDismiss = props.onDismiss ?? jest.fn();
  return render(
    <TestProviders>
      <AppFullScreenOverlay visible onDismiss={onDismiss} {...props}>
        <Text>Overlay content</Text>
      </AppFullScreenOverlay>
    </TestProviders>
  );
}

describe("AppFullScreenOverlay", () => {
  it("renders children when visible", () => {
    renderOverlay();
    expect(screen.getByText("Overlay content")).toBeTruthy();
  });

  it("does not render children when not visible", () => {
    render(
      <TestProviders>
        <AppFullScreenOverlay visible={false} onDismiss={jest.fn()}>
          <Text>Overlay content</Text>
        </AppFullScreenOverlay>
      </TestProviders>
    );

    expect(screen.queryByText("Overlay content")).toBeNull();
  });

  it("calls onDismiss when scrim is pressed", () => {
    const onDismiss = jest.fn();
    render(
      <TestProviders>
        <AppFullScreenOverlay
          visible
          onDismiss={onDismiss}
          scrimAccessibilityLabel="Close overlay"
        >
          <TouchableOpacity accessibilityLabel="Inner control">
            <Text>Inside</Text>
          </TouchableOpacity>
        </AppFullScreenOverlay>
      </TestProviders>
    );

    fireEvent.press(screen.getByLabelText("Close overlay"));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("uses instant modal animation (no fade) by default", () => {
    renderOverlay();
    const modal = screen.getByTestId("overlay-modal-host");
    expect(modal.props.animationType).toBe(OVERLAY_MODAL_ANIMATION);
    expect(modal.props.animationType).toBe("none");
  });

  it("renders dim scrim without blur modal host structure", () => {
    renderOverlay({ scrim: "dim" });
    expect(screen.getByTestId("overlay-modal-host")).toBeTruthy();
    expect(screen.getByText("Overlay content")).toBeTruthy();
  });

  it("portalFixed host dismisses on scrim press", () => {
    const onDismiss = jest.fn();
    render(
      <TestProviders>
        <AppFullScreenOverlay
          visible
          host="portalFixed"
          onDismiss={onDismiss}
          scrimAccessibilityLabel="Close portal overlay"
        >
          <Text>Portal content</Text>
        </AppFullScreenOverlay>
      </TestProviders>
    );

    expect(screen.getByTestId("overlay-portal-fixed-host")).toBeTruthy();
    fireEvent.press(screen.getByLabelText("Close portal overlay"));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
