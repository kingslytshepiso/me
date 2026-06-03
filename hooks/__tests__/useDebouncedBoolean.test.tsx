import React from "react";
import { Text } from "react-native";
import { act, render, screen } from "@testing-library/react-native";
import { useDebouncedBoolean } from "../useDebouncedBoolean";

function DebouncedProbe({
  value,
  delayMs = 300,
}: {
  value: boolean;
  delayMs?: number;
}) {
  const debounced = useDebouncedBoolean(value, delayMs);
  return <Text testID="debounced">{debounced ? "true" : "false"}</Text>;
}

describe("useDebouncedBoolean", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns true immediately when value becomes true", () => {
    const { rerender } = render(<DebouncedProbe value={false} />);
    expect(screen.getByTestId("debounced").props.children).toBe("false");

    rerender(<DebouncedProbe value={true} />);
    expect(screen.getByTestId("debounced").props.children).toBe("true");
  });

  it("returns false only after delayMs of continuous false", () => {
    const { rerender } = render(<DebouncedProbe value={true} />);
    expect(screen.getByTestId("debounced").props.children).toBe("true");

    rerender(<DebouncedProbe value={false} />);
    expect(screen.getByTestId("debounced").props.children).toBe("true");

    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(screen.getByTestId("debounced").props.children).toBe("true");

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.getByTestId("debounced").props.children).toBe("false");
  });

  it("cancels pending collapse when value becomes true again", () => {
    const { rerender } = render(<DebouncedProbe value={true} />);

    rerender(<DebouncedProbe value={false} />);
    act(() => {
      jest.advanceTimersByTime(150);
    });

    rerender(<DebouncedProbe value={true} />);
    expect(screen.getByTestId("debounced").props.children).toBe("true");

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(screen.getByTestId("debounced").props.children).toBe("true");
  });
});
