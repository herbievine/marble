import { AppProps } from "next/app";
import LoadingProvider from "../contexts/Loading";
import AuthProvider from "../contexts/Auth";
import "../styles/globals.css";
import { useEffect } from "react";
import { magic } from "../lib/magic";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    magic().preload();
  }, []);

  return (
    <LoadingProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </LoadingProvider>
  );
};

export default MyApp;
