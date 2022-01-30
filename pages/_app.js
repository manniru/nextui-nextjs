import "../styles/globals.css";
import { CssBaseline, NextUIProvider } from "@nextui-org/react";
import UserProvider from "../context/userContext";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <UserProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </UserProvider>
    </NextUIProvider>
  );
}

export default MyApp;
