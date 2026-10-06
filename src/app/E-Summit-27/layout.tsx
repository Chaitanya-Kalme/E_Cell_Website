
import type { Metadata, Viewport } from "next";
import { Lora, Poppins } from "next/font/google";
import "./e27.css";
import NavBar27 from "@/components/E-Summit-27/NavBar27";
import Footer27 from "@/components/E-Summit-27/Footer27";

// Only the weights actually used on the page.
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--e27-font-heading",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--e27-font-body",
});

export const metadata: Metadata = {
  title: "E-Summit'27 | Igniting the Unwritten | IIT Ropar",
  description:
    "E-Summit'27, the flagship entrepreneurship summit of E-Cell IIT Ropar — keynotes, workshops, competitions and startup showcases.",
};

export const viewport: Viewport = {
  themeColor: "#050008",
  colorScheme: "dark",
};

export default function ESummit27Layout({ children }: { children: React.ReactNode }) {
  return (
    // Providers (AuthProvider, data context) go here later, wrapping this div.
    <div className={`e27-root dark ${lora.variable} ${poppins.variable}`}>
      <NavBar27 />
      {children}
      <Footer27 />
    </div>
  );
}