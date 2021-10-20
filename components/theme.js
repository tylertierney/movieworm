import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const themeObj = {
  config: {
    initialColorMode: "dark",
  },
  colors: {
    brand: {
      primary: {
        1000: "#22D0EA",
        900: "#65def1",
        800: "#7CE3F3",
        700: "#8FE7F5",
        600: "#A1EBF7",
        500: "#B4EFF8",
        400: "#C7F3FA",
        300: "#D9F7FC",
        200: "#ECFBFD",
        100: "#ECFBFD",
      },
      secondary: {
        1000: "#EF644F",
        900: "#F17865",
        800: "#F28170",
        700: "#F38B7B",
        600: "#F49586",
        500: "#F59E91",
        400: "#F6A89C",
        300: "#F7B2A7",
        200: "#F8BBB2",
        100: "#F9C5BD",
      },
      white: "#F5F5F5",
      // gray: "#2D3748",
      gray: "#35353b",
      darkgray: "#232329",
      text: {
        dark: "#696969",
        light: "#E1E1E1",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "gray.700",
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("brand.white", "brand.gray")(props),
      },

      p: {
        color: mode("#696969", "#E1E1E1")(props),
      },
      span: {
        color: mode("#696969", "#E1E1E1")(props),
      },
    }),
  },
};

// const theme = extendTheme({ colors });
const theme = extendTheme(themeObj);

console.log(theme);

export default theme;
