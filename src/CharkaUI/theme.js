// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF3c00",
    },
  },
  fonts: {
    body: 'Open Sans, sans-serif',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: 'gray.200',
      },
    }),
  },
  components: {
     Button,
  },
});
