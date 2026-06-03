import React from "react";
import { render, screen } from "@testing-library/react-native";
import { ExperienceTimeline } from "../ExperienceTimeline";
import { ProfileHeroCard } from "../ProfileHeroCard";
import { TestProviders } from "../testHelpers/TestProviders";
import { EXPERIENCE, PROFILE } from "../../constants/profile";

function renderWithProviders(ui: React.ReactElement) {
  return render(<TestProviders>{ui}</TestProviders>);
}

describe("ProfileHeroCard", () => {
  it("renders name, headline, and Bridged Platforms CTA", () => {
    renderWithProviders(<ProfileHeroCard />);

    expect(screen.getByText(PROFILE.name)).toBeTruthy();
    expect(screen.getByText(PROFILE.headline)).toBeTruthy();
    expect(screen.getByLabelText("Visit Bridged Platforms website")).toBeTruthy();
    expect(screen.getByLabelText("Visit LinkedIn profile")).toBeTruthy();
  });
});

describe("ExperienceTimeline", () => {
  it("renders all experience entries", () => {
    renderWithProviders(<ExperienceTimeline entries={EXPERIENCE} />);

    EXPERIENCE.forEach((entry) => {
      expect(screen.getByText(entry.role)).toBeTruthy();
      expect(screen.getByText(entry.company)).toBeTruthy();
      expect(screen.getByText(entry.period)).toBeTruthy();
    });
  });
});
