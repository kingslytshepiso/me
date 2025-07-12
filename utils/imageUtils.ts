import { ImageSourcePropType } from "react-native";

// Centralized image imports
const projectImages: Record<string, ImageSourcePropType> = {
  "ioco.png": require("../assets/images/logos/ioco.png"),
  "Katekani-lodge.jpg": require("../assets/images/logos/Katekani-lodge.jpg"),
  "pp.png": require("../assets/images/logos/pp.png"),
  "playerlinc.png": require("../assets/images/logos/playerlinc.png"),
  "athena.png": require("../assets/images/logos/athena.png"),
  "claim-manager.png": require("../assets/images/logos/claim-manager.png"),
  "Lexi-ai.png": require("../assets/images/logos/Lexi-ai.png"),
  "Sensor Networks.png": require("../assets/images/logos/Sensor Networks.png"),
  "zendacare.png": require("../assets/images/logos/zendacare.png"),
  "blueapp.png": require("../assets/images/logos/blueapp.png"),
};

/**
 * Get image source from image path
 * @param imagePath - The path to the image (e.g., "../assets/images/logos/ioco.png")
 * @returns ImageSourcePropType or undefined if not found
 */
export const getImageSource = (
  imagePath: string
): ImageSourcePropType | undefined => {
  const imageName = imagePath.split("/").pop();
  return imageName ? projectImages[imageName] : undefined;
};

/**
 * Get all available project image names
 * @returns Array of image names
 */
export const getAvailableImageNames = (): string[] => {
  return Object.keys(projectImages);
};
