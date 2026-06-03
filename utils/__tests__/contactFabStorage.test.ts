import {
  clearSessionDismissForTests,
  isSessionDismissed,
  setSessionDismissed,
} from "../contactFabStorage";

describe("contactFabStorage", () => {
  beforeEach(() => {
    clearSessionDismissForTests();
  });

  describe("session dismiss", () => {
    it("tracks session dismiss in memory on native", () => {
      expect(isSessionDismissed()).toBe(false);
      setSessionDismissed();
      expect(isSessionDismissed()).toBe(true);
    });
  });
});
