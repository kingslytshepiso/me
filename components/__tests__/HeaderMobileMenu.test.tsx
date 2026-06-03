import React from "react";
import { render, screen } from "@testing-library/react-native";

import { DIRECT_CONTACT_CHANNELS } from "../../constants/contactChannels";
import { HeaderMobileMenu } from "../HeaderMobileMenu";
import { TestProviders } from "../testHelpers/TestProviders";

function renderMenu(visible = true) {
  const onDismiss = jest.fn();
  const onNavigate = jest.fn();
  render(
    <TestProviders>
      <HeaderMobileMenu
        visible={visible}
        onDismiss={onDismiss}
        onNavigate={onNavigate}
      />
    </TestProviders>
  );
  return { onDismiss, onNavigate };
}

describe("HeaderMobileMenu", () => {
  it("renders section titles when visible", () => {
    renderMenu(true);

    expect(screen.getByText("Navigate")).toBeTruthy();
    expect(screen.getByText("Contact me")).toBeTruthy();
    expect(screen.getByText("Appearance")).toBeTruthy();
  });

  it("renders direct contact channel labels", () => {
    renderMenu(true);

    DIRECT_CONTACT_CHANNELS.forEach((channel) => {
      expect(screen.getByText(channel.displayText ?? channel.id)).toBeTruthy();
    });
  });

  it("renders navigation items", () => {
    renderMenu(true);

    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("About")).toBeTruthy();
    expect(screen.getByText("Projects")).toBeTruthy();
    expect(screen.getByText("Contact")).toBeTruthy();
  });

  it("renders theme appearance row", () => {
    renderMenu(true);

    expect(screen.getByText(/mode$/)).toBeTruthy();
  });
});
