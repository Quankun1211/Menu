/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#D16D2F';
const tintColorDark = '#fff';

export const AppTheme = {
  colors: {
    primary: '#D16D2F',
    primaryPressed: '#B95B27',
    brown: '#5C4033',
    brownSoft: '#765746',
    cream: '#FAECE1',
    creamDark: '#E8C5A8',
    canvas: '#FFFDF9',
    surface: '#FFFFFF',
    text: '#2E211B',
    textMuted: '#806D63',
    border: '#EEDCCF',
    success: '#3F7D58',
    danger: '#C94A42',
  },
  radius: { sm: 12, md: 18, lg: 24, pill: 999 },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  shadow: {
    shadowColor: '#5C4033',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
  },
} as const;

export const Colors = {
  light: {
    text: '#11181C',
    background: AppTheme.colors.canvas,
    tint: tintColorLight,
    icon: AppTheme.colors.textMuted,
    tabIconDefault: AppTheme.colors.textMuted,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
