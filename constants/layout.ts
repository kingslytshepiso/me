export const BREAKPOINT_SM = 768;
export const BREAKPOINT_MD = 1024;
export const BREAKPOINT_LG = 1280;
export const BREAKPOINT_XL = 1536;

export type ContentPadding = {
  horizontal: number;
  vertical: number;
};

export function getContentPadding(width: number): ContentPadding {
  if (width < BREAKPOINT_SM) {
    return { horizontal: 8, vertical: 12 };
  }
  if (width < BREAKPOINT_MD) {
    return { horizontal: 16, vertical: 16 };
  }
  return { horizontal: 24, vertical: 16 };
}
