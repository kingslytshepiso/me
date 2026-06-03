import React from "react";
import { render } from "@testing-library/react-native";
import { AppImage } from "../AppImage";
import {
  BLURHASH_BY_KIND,
  IMAGE_CACHE_POLICY,
  IMAGE_TRANSITION_MS,
} from "../../constants/imageLoading";

jest.mock("expo-image", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- jest mock factory
  const React = require("react");
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- jest mock factory
  const { View } = require("react-native");
  return {
    Image: (props: Record<string, unknown>) =>
      React.createElement(View, { testID: "expo-image", ...props }),
  };
});

describe("AppImage", () => {
  it("applies cache policy, transition, and category placeholder", () => {
    const { getByTestId } = render(
      <AppImage
        source={1}
        placeholderKind="logo"
        contentFit="contain"
        style={{ width: 48, height: 48 }}
      />
    );
    const image = getByTestId("expo-image");
    expect(image.props.cachePolicy).toBe(IMAGE_CACHE_POLICY);
    expect(image.props.transition).toBe(IMAGE_TRANSITION_MS);
    expect(image.props.placeholder).toBe(BLURHASH_BY_KIND.logo);
    expect(image.props.placeholderContentFit).toBe("contain");
    expect(image.props.contentFit).toBe("contain");
  });
});
