import ItemPageLayout from "@/components/ItemPageLayout";
import { useSelectedLayoutSegment } from "next/navigation";

export default function DisplayAllItems({ data }) {
  return <ItemPageLayout displayitems={data} />;
}

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/api/items");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
