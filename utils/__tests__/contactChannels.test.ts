import { PROFILE } from "../../constants/profile";
import {
  WHATSAPP_URL,
  buildWhatsAppUrl,
} from "../../constants/contactChannels";

describe("contactChannels WhatsApp URL", () => {
  it("builds wa.me URL from phoneTel digits only", () => {
    const url = buildWhatsAppUrl(PROFILE.contact.phoneTel);
    expect(url).toMatch(/^https:\/\/wa\.me\/27760768257\?text=/);
    expect(decodeURIComponent(url.split("?text=")[1] ?? "")).toContain(
      "Hi Kingsly"
    );
  });

  it("exports WHATSAPP_URL consistent with profile phoneTel", () => {
    expect(WHATSAPP_URL).toContain("27760768257");
    expect(WHATSAPP_URL).toBe(buildWhatsAppUrl(PROFILE.contact.phoneTel));
  });
});
