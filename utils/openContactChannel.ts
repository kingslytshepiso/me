import { Linking } from "react-native";

import {
  ContactChannel,
  ContactChannelId,
  getChannelById,
} from "../constants/contactChannels";

export async function openContactChannel(
  channel: ContactChannel | ContactChannelId
): Promise<void> {
  const resolved =
    typeof channel === "string" ? getChannelById(channel) : channel;
  if (!resolved) {
    console.warn("Unknown contact channel:", channel);
    return;
  }

  await Linking.openURL(resolved.url);
}
