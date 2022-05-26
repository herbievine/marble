import { AppProps } from "next/app";
import LoadingProvider from "../contexts/Loading";
import AuthProvider from "../contexts/Auth";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo";
import UserProvider from "../contexts/User";
import AuthFlowProvider from "../contexts/AuthFlow";
import ModalProvider from "../contexts/Modal";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // useEffect(() => {
  //   magic().preload();
  // }, []);

  return (
    <ApolloProvider client={client}>
      <LoadingProvider>
        <AuthFlowProvider>
          <UserProvider>
            <AuthProvider>
              <ModalProvider>
                <Component {...pageProps} />
              </ModalProvider>
            </AuthProvider>
          </UserProvider>
        </AuthFlowProvider>
      </LoadingProvider>
    </ApolloProvider>
  );
};

export default MyApp;
