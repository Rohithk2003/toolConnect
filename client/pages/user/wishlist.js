import ItemPageLayout from "@/components/ItemPageLayout";
import { useEffect, useState } from "react";

export default function DisplayAllItems() {
  const [items, setItems] = useState(null);
  async function loadData() {
    const res = await fetch("http://127.0.0.1:8000/api/getwishilistitems", {
      credentials: "include",
    });
    const data = await res.json();
    setItems(data);
  }
  useEffect(() => loadData, []);
  return <ItemPageLayout displayitems={items} />;
}
