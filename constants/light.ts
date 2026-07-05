import {
  ITheme,
  ThemeColors,
  ThemeGradients,
  ThemeSizes,
  ThemeSpacing,
} from "./types";

import { THEME as commonTheme } from "./theme";

export const COLORS: ThemeColors = {
  // default text color
  text: "#fffbea",

  // base colors - black & yellow palette
  primary: "#facc15",
  secondary: "#17140a",
  tertiary: "#0f0e08",

  // non-colors
  black: "#000000",
  white: "#FFFFFF",

  dark: "#000000",
  light: "#ffffff",

  // gray variations
  gray: "#b7a865",

  // colors variations
  danger: "#ff3b30",
  warning: "#f59e0b",
  success: "#34c759",
  info: "#facc15",

  // UI colors for navigation & card
  card: "#211c0d",
  background: "#0f0e08",

  // UI color for shadowColor
  shadow: "#000000",
  overlay: "rgba(0,0,0,0.68)",

  // UI color for input borderColor on focus
  focus: "#facc15",
  input: "#fff8dc",

  // UI color for switch checked/active color
  switchOn: "#34c759",
  switchOff: "#3a3a3c",

  // UI color for checkbox icon checked/active color
  checkbox: ["#fde047", "#ca8a04"],
  checkboxIcon: "#000000",

  // social colors
  facebook: "#3B5998",
  twitter: "#55ACEE",
  dribbble: "#EA4C89",

  // icon tint color
  icon: "#ffffff",

  // blur tint color
  blurTint: "dark",

  // product link color
  link: "#facc15",
};

export const GRADIENTS: ThemeGradients = {
  primary: ["#fde047", "#facc15", "#ca8a04"],
  secondary: ["#332b12", "#211c0d", "#0f0e08"],
  info: ["#fde047", "#ca8a04"],
  success: ["#2ecc71", "#27ae60"],
  warning: ["#fde68a", "#f59e0b"],
  danger: ["#e74c3c", "#c0392b"],

  light: ["#fffbea", "#fef3c7", "#fde68a"],
  dark: ["#0f0e08", "#211c0d"],

  white: [String(COLORS.white), "#fff8dc"],
  black: [String(COLORS.black), "#211c0d"],

  divider: ["rgba(250, 204, 21, 0.28)", "rgba(202, 138, 4, 0.62)"],
  menu: [
    "rgba(33, 28, 13, 0.94)",
    "rgba(250, 204, 21, 0.35)",
    "rgba(33, 28, 13, 0.94)",
  ],
};

export const SIZES: ThemeSizes = {
  // global sizes
  base: 8,
  text: 14,
  radius: 4,
  padding: 20,

  // font sizes
  h1: 44,
  h2: 40,
  h3: 32,
  h4: 24,
  h5: 18,
  p: 16,

  // button sizes
  buttonBorder: 1,
  buttonRadius: 8,
  socialSize: 64,
  socialRadius: 16,
  socialIconSize: 26,

  // button shadow
  shadowOffsetWidth: 0,
  shadowOffsetHeight: 7,
  shadowOpacity: 0.07,
  shadowRadius: 4,
  elevation: 2,

  // input sizes
  inputHeight: 46,
  inputBorder: 1,
  inputRadius: 8,
  inputPadding: 12,

  // card sizes
  cardRadius: 16,
  cardPadding: 10,

  // image sizes
  imageRadius: 14,
  avatarSize: 32,
  avatarRadius: 8,

  // switch sizes
  switchWidth: 50,
  switchHeight: 24,
  switchThumb: 20,

  // checkbox sizes
  checkboxWidth: 18,
  checkboxHeight: 18,
  checkboxRadius: 5,
  checkboxIconWidth: 10,
  checkboxIconHeight: 8,

  // product link size
  linkSize: 12,

  multiplier: 2,
};

export const SPACING: ThemeSpacing = {
  xs: SIZES.base * 0.5,
  s: SIZES.base * 1,
  sm: SIZES.base * 2,
  m: SIZES.base * 3,
  md: SIZES.base * 4,
  l: SIZES.base * 5,
  xl: SIZES.base * 6,
  xxl: SIZES.base * 7,
};

export const light: ITheme = {
  ...commonTheme,
  colors: COLORS,
  gradients: GRADIENTS,
  sizes: { ...SIZES, ...commonTheme.sizes, ...SPACING },
};
