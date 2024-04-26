import ItemPageLayout from "@/components/ItemPageLayout";
import { useSelectedLayoutSegment } from "next/navigation";
import {getServerUrl} from "@/configs";

export default function DisplayAllItems({ data }) {
	return <ItemPageLayout displayitems={data} />;
}

export async function getStaticProps() {
	const res = await fetch(`${getServerUrl()}/api/items`);
	const data = await res.json();
	return {
		props: {
			data,
		},
	};
}
