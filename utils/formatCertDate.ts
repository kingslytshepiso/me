const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Formats YYYY-MM (e.g. 2026-04) as "April 2026". */
export function formatCertDate(earnedDate: string): string {
  const [year, month] = earnedDate.split("-");
  const monthIndex = parseInt(month ?? "", 10) - 1;
  if (!year || !month || monthIndex < 0 || monthIndex > 11) {
    return earnedDate;
  }
  return `${MONTH_NAMES[monthIndex]} ${year}`;
}
