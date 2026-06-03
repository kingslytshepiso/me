import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";

import { CONTACT_FAB_APPEAR_DELAY_MS } from "../../utils/contactFabStorage";
import { useContactFabVisibility } from "../useContactFabVisibility";

const mockUsePathname = jest.fn(() => "/");

jest.mock("expo-router", () => ({
  usePathname: () => mockUsePathname(),
}));

function VisibilityProbe() {
  const { visibility, dismissForSession } = useContactFabVisibility();
  return (
    <>
      <Text testID="visibility">{visibility}</Text>
      <TouchableOpacity testID="dismiss" onPress={dismissForSession}>
        <Text>dismiss</Text>
      </TouchableOpacity>
    </>
  );
}

async function flushPromises() {
  await act(async () => {
    await Promise.resolve();
  });
}

describe("useContactFabVisibility", () => {
  beforeEach(async () => {
    jest.useFakeTimers();
    await AsyncStorage.clear();
    mockUsePathname.mockReturnValue("/");
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("starts loading then waits before becoming visible", async () => {
    render(<VisibilityProbe />);

    expect(screen.getByTestId("visibility").props.children).toBe("loading");

    await flushPromises();
    expect(screen.getByTestId("visibility").props.children).toBe("waiting");

    act(() => {
      jest.advanceTimersByTime(CONTACT_FAB_APPEAR_DELAY_MS - 1);
    });
    expect(screen.getByTestId("visibility").props.children).toBe("waiting");

    act(() => {
      jest.advanceTimersByTime(1);
    });
    await flushPromises();

    expect(screen.getByTestId("visibility").props.children).toBe("visible");
  });

  it("uses 10 second appear delay", () => {
    expect(CONTACT_FAB_APPEAR_DELAY_MS).toBe(10_000);
  });

  it("stays hidden on contact route", async () => {
    mockUsePathname.mockReturnValue("/contact");
    render(<VisibilityProbe />);

    await flushPromises();
    act(() => {
      jest.advanceTimersByTime(CONTACT_FAB_APPEAR_DELAY_MS);
    });
    await flushPromises();

    expect(screen.getByTestId("visibility").props.children).toBe("hidden");
  });

  it("hides after session dismiss", async () => {
    render(<VisibilityProbe />);

    await flushPromises();
    act(() => {
      jest.advanceTimersByTime(CONTACT_FAB_APPEAR_DELAY_MS);
    });
    await flushPromises();

    expect(screen.getByTestId("visibility").props.children).toBe("visible");

    act(() => {
      fireEvent.press(screen.getByTestId("dismiss"));
    });

    expect(screen.getByTestId("visibility").props.children).toBe("hidden");
  });
});
