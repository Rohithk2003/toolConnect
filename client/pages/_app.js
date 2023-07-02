import "@/styles/globals.css";
import Layout from "@/components/Layout";
import styles from "/styles/navbar.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
