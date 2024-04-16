import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Signout() {
  useEffect(() => {
    localStorage.setItem("status", false);
    localStorage.setItem("username", "");
    localStorage.setItem("username", "");
  });
  const router = useRouter();
  fetch("https://toolconnect.onrender.com/api/logout", {
    credentials: "include",
  }).then((response) => {
    console.log("helll");
    router.push("/");
  });
}
