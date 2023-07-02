import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
