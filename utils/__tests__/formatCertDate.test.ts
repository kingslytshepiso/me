import { formatCertDate } from "../formatCertDate";

describe("formatCertDate", () => {
  it("formats YYYY-MM as Month Year", () => {
    expect(formatCertDate("2026-04")).toBe("April 2026");
  });

  it("returns input when format is invalid", () => {
    expect(formatCertDate("invalid")).toBe("invalid");
  });
});
