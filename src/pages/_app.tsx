import { AppProps } from "next/app";
import LoadingProvider from "../contexts/Loading";
import AuthProvider from "../contexts/Auth";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo";
import GlobalErrorProvider from "../contexts/GlobalError";
import UserProvider from "../contexts/User";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // useEffect(() => {
  //   magic().preload();
  // }, []);

  return (
    <ApolloProvider client={client}>
      <LoadingProvider>
        <GlobalErrorProvider>
          <UserProvider>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </UserProvider>
        </GlobalErrorProvider>
      </LoadingProvider>
    </ApolloProvider>
  );
};

export default MyApp;
