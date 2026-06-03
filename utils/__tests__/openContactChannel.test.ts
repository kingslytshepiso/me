import { Linking } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { openContactChannel } from "../openContactChannel";

jest.spyOn(Linking, "openURL").mockResolvedValue(undefined as never);

describe("openContactChannel", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it("opens email without persisting engagement", async () => {
    await openContactChannel("email");

    expect(Linking.openURL).toHaveBeenCalledWith(
      "mailto:kingslytshepiso@gmail.com"
    );
    const keys = await AsyncStorage.getAllKeys();
    expect(keys).toHaveLength(0);
  });

  it("opens WhatsApp without persisting engagement", async () => {
    await openContactChannel("whatsapp");

    expect(Linking.openURL).toHaveBeenCalledWith(
      expect.stringContaining("https://wa.me/27760768257")
    );
    const keys = await AsyncStorage.getAllKeys();
    expect(keys).toHaveLength(0);
  });

  it("opens GitHub without persisting engagement", async () => {
    await openContactChannel("github");

    expect(Linking.openURL).toHaveBeenCalledWith(
      "https://github.com/kingslytshepiso"
    );
    const keys = await AsyncStorage.getAllKeys();
    expect(keys).toHaveLength(0);
  });
});
