import ItemPageLayout from "@/components/ItemPageLayout";
import { useSelectedLayoutSegment } from "next/navigation";

export default function DisplayAllItems({ data }) {
	return <ItemPageLayout displayitems={data} />;
}

export async function getStaticProps() {
	const res = await fetch("https://toolconnect.onrender.com/api/items");
	const data = await res.json();
	return {
		props: {
			data,
		},
	};
}
