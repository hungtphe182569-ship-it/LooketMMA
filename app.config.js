// Dynamic Expo config: reads secrets from environment variables
// Do NOT commit your real secrets; use .env (not committed) or CI secrets

module.exports = ({ config }) => {
  return {
    ...config,
    name: "Final Project",
    slug: "finalmma",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/looket-icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/looket-splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#FACC15",
    },
    ios: {
      bundleIdentifier: "com.mma.finalmma",
      supportsTablet: true,
      config: {
        usesNonExemptEncryption: false
      }
    },
    android: {
      package: "com.mma.finalmma",
      adaptiveIcon: {
        foregroundImage: "./assets/looket-adaptive-icon.png",
        backgroundColor: "#FACC15",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: "./assets/looket-favicon.png",
    },
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./assets/looket-icon.png",
          color: "#FACC15"
        }
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "This app uses location to tag photos with their location."
        }
      ]
    ],
    extra: {
      "eas": {
        "projectId": "bd55fcc9-9c42-425c-8a07-3973dab7dc3f"
      },
      HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY,
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
      // GEMINI removed
    },
  };
};
