import { createTheme } from "@mui/material/styles";
import { Roboto, Manrope } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const primaryFont = roboto.style.fontFamily;
const secondaryFont = manrope.style.fontFamily;

const light30 = "#E0E4EC";
const light40 = "#EDF2F6";
const light50 = "#a1a1a6";
const light60 = "#eee";
const light100 = "#fff";

const dark100 = "#000";
const dark90 = "#101316";
const dark60 = "#544f4f";
const dark50 = "#333333";
const dark40 = "#4C535F";

const success90 = "#7CB342";
const success80 = "#51A937";
const success70 = "#489647";
const success60 = "#45a049";
const success50 = "#5DC358";
const success40 = "#4CAF50";
const success30 = "#40B93C";
const red90 = "#ff0000";
const red = "#FF0505";
const lightRed = "#FF0000";
const darkGrey = "#222";
const yellow50 = "#FFE605";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    common: {
      red: red,
      red90: red90,
      lightRed: lightRed,
      dark40: dark40,
      dark50: dark50,
      dark60: dark60,
      dark90: dark90,
      dark100: dark100,
      light30: light30,
      light40: light40,
      light50: light50,
      light60: light60,
      light100: light100,
      success90: success90,
      success80: success80,
      success70: success70,
      success60: success60,
      success50: success50,
      success40: success40,
      success30: success30,
      darkGrey: darkGrey,
      yellow50: yellow50,
    },
    primary: {
      main: success40,
    },
    secondary: {
      main: light100,
    },
    error: {
      main: red,
    },
  },
  typography: {
    fontFamily: primaryFont,
    secondaryFont: secondaryFont,
  },
  mixins: {
    px: { md: "32px", sm: "16px", xs: "10px" },
  },
});

export default theme;
