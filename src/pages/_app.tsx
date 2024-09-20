import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";
import { AuthProvider } from "../context/authContext"; // Adjust the path as necessary
import { ThemeProvider } from "../context/Darkmode"; // Adjust the path as necessary

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Sidebar />
        <div className="page-content">
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
