import { Image, type ImageProps } from "expo-image";
import React from "react";

import {
  BLURHASH_BY_KIND,
  IMAGE_CACHE_POLICY,
  IMAGE_TRANSITION_MS,
  type ImagePlaceholderKind,
} from "../constants/imageLoading";

export type AppImageProps = Omit<ImageProps, "placeholder"> & {
  placeholderKind: ImagePlaceholderKind;
};

export function AppImage({
  placeholderKind,
  contentFit = "cover",
  cachePolicy = IMAGE_CACHE_POLICY,
  transition = IMAGE_TRANSITION_MS,
  ...rest
}: AppImageProps) {
  return (
    <Image
      cachePolicy={cachePolicy}
      transition={transition}
      placeholder={BLURHASH_BY_KIND[placeholderKind]}
      placeholderContentFit={contentFit}
      contentFit={contentFit}
      {...rest}
    />
  );
}
