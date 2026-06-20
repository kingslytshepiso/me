import { StyleSheet } from "react-native";

export const DETAIL_DIALOG_MAX_WIDTH_COMPACT = 400;
export const DETAIL_DIALOG_MAX_WIDTH_WIDE = 560;
export const DETAIL_DIALOG_MAX_HEIGHT_RATIO = 0.85;
export const DETAIL_DIALOG_OVERLAY_PADDING = 24;
export const DETAIL_DIALOG_CONTENT_PADDING = 24;

export const detailDialogStyles = StyleSheet.create({
  overlayCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: DETAIL_DIALOG_OVERLAY_PADDING,
  },
  dialogSurface: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    paddingTop: 12,
    paddingBottom: 4,
    paddingHorizontal: DETAIL_DIALOG_CONTENT_PADDING,
  },
  content: {
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  scrollContent: {
    paddingHorizontal: DETAIL_DIALOG_CONTENT_PADDING,
    paddingVertical: 8,
    paddingBottom: 16,
  },
  actions: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    minHeight: 44,
  },
});
