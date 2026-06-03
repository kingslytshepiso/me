import {
  getOverlayBlurProps,
  OVERLAY_BLUR_INTENSITY,
  OVERLAY_DEFAULT_SCRIM_ENTER_MS,
  OVERLAY_MODAL_ANIMATION,
} from "../overlay";

describe("overlay constants", () => {
  it("defaults to instant modal and scrim enter", () => {
    expect(OVERLAY_MODAL_ANIMATION).toBe("none");
    expect(OVERLAY_DEFAULT_SCRIM_ENTER_MS).toBe(0);
  });

  it("returns header-aligned blur props for each theme", () => {
    expect(getOverlayBlurProps("dark")).toEqual({
      intensity: OVERLAY_BLUR_INTENSITY.dark,
      tint: "dark",
    });
    expect(getOverlayBlurProps("light")).toEqual({
      intensity: OVERLAY_BLUR_INTENSITY.light,
      tint: "light",
    });
  });
});
