import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "@/themes";
import { SnackbarProvider } from "notistack";
import { UIProvider } from "@/Context/ui";
import { EntriesProvider } from "@/Context/entries";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}
