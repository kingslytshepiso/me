import React, { useCallback, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import certificationsData from "../data/certifications.json";
import {
  BADGE_GAP,
  BADGE_STRIP_EDGE_PADDING,
  BADGE_STRIP_HEIGHT_COLLAPSED,
  BADGE_STRIP_HEIGHT_EXPANDED,
  type BadgeTooltipAlign,
} from "../constants/badgeLayout";
import { Certification } from "../utils/badgeUtils";
import { useDebouncedBoolean } from "../hooks/useDebouncedBoolean";
import { useDragToScroll } from "../hooks/useDragToScroll";
import { CertificationBadge } from "./CertificationBadge";
import { CertificationDetailDialog } from "./CertificationDetailDialog";

const certifications = certificationsData.certifications as Certification[];

function getClientX(event: {
  nativeEvent?: { clientX?: number };
  clientX?: number;
}): number {
  return event.nativeEvent?.clientX ?? event.clientX ?? 0;
}

function getWebClassName(
  isScrollActive: boolean,
  isGrabbing: boolean,
  isExpanded: boolean
): { strip?: string; scroll?: string } {
  if (Platform.OS !== "web") return {};
  const stripClasses = ["certBadgeStrip"];
  if (isGrabbing) stripClasses.push("certBadgeStrip--grabbing");
  if (isExpanded) stripClasses.push("certBadgeStrip--expanded");
  return {
    strip: stripClasses.join(" "),
    scroll: isScrollActive
      ? "certBadgeScroll certBadgeScroll--active"
      : "certBadgeScroll",
  };
}

interface CertificationBadgeStripProps {
  linkedInUrl: string;
}

export function CertificationBadgeStrip({
  linkedInUrl,
}: CertificationBadgeStripProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [scrollX, setScrollX] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrollDragging, setIsScrollDragging] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const {
    isDragging,
    didDragRef,
    beginDrag,
    moveDrag,
    endDrag,
    resetDidDrag,
    isWeb,
  } = useDragToScroll(scrollRef);

  const isInteracting = isHovering || isDragging || isScrollDragging;
  const isExpanded = useDebouncedBoolean(isInteracting, 300);
  const webClass = getWebClassName(isInteracting, isDragging, isExpanded);

  const wrapperStyle =
    Platform.OS !== "web"
      ? {
          height: isExpanded
            ? BADGE_STRIP_HEIGHT_EXPANDED
            : BADGE_STRIP_HEIGHT_COLLAPSED,
        }
      : undefined;

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      setScrollX(e.nativeEvent.contentOffset.x);
    },
    []
  );

  const handleBadgePress = useCallback(
    (cert: Certification) => {
      if (didDragRef.current) {
        resetDidDrag();
        return;
      }
      setSelectedCert(cert);
      setDialogVisible(true);
    },
    [didDragRef, resetDidDrag]
  );

  const handleDismissDialog = useCallback(() => {
    setDialogVisible(false);
    setSelectedCert(null);
  }, []);

  const handleMouseDown = useCallback(
    (e: {
      nativeEvent?: { clientX?: number };
      clientX?: number;
      preventDefault?: () => void;
    }) => {
      if (!isWeb) return;
      e.preventDefault?.();
      beginDrag(getClientX(e), scrollX);
    },
    [isWeb, beginDrag, scrollX]
  );

  const handleMouseMove = useCallback(
    (e: { nativeEvent?: { clientX?: number }; clientX?: number }) => {
      if (!isWeb) return;
      moveDrag(getClientX(e));
    },
    [isWeb, moveDrag]
  );

  const webPointerProps =
    Platform.OS === "web"
      ? ({
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => {
            setIsHovering(false);
            endDrag();
          },
          onMouseDown: handleMouseDown,
          onMouseMove: handleMouseMove,
          onMouseUp: endDrag,
          onDragStart: (e: { preventDefault?: () => void }) => {
            e.preventDefault?.();
          },
        } as Record<string, unknown>)
      : {};

  return (
    <>
      <View
        style={[styles.wrapper, wrapperStyle]}
        className={webClass.strip}
        accessibilityRole="none"
        accessibilityLabel="Certifications"
        {...webPointerProps}
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onScrollBeginDrag={() => setIsScrollDragging(true)}
          onScrollEndDrag={() => setIsScrollDragging(false)}
          onMomentumScrollEnd={() => setIsScrollDragging(false)}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          accessibilityRole="list"
          className={webClass.scroll}
        >
          {certifications.map((cert, index) => {
            const lastIndex = certifications.length - 1;
            const tooltipAlign: BadgeTooltipAlign =
              certifications.length === 1
                ? "center"
                : index === 0
                  ? "start"
                  : index === lastIndex
                    ? "end"
                    : "center";

            return (
              <CertificationBadge
                key={cert.id}
                cert={cert}
                onPress={handleBadgePress}
                tooltipAlign={tooltipAlign}
              />
            );
          })}
        </ScrollView>
      </View>
      <CertificationDetailDialog
        cert={selectedCert}
        visible={dialogVisible}
        onDismiss={handleDismissDialog}
        linkedInUrl={linkedInUrl}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    overflow: "visible",
  },
  scrollView: {
    flex: 1,
    overflow: "visible",
  },
  scrollContent: {
    alignItems: "flex-start",
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: BADGE_STRIP_EDGE_PADDING,
    gap: BADGE_GAP,
    overflow: "visible",
  },
});
