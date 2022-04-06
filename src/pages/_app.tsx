import { AppProps } from "next/app";
import LoadingProvider from "../contexts/Loading";
import AuthProvider from "../contexts/Auth";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </LoadingProvider>
  );
};

export default MyApp;
