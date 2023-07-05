import { useSearchParams } from "next/navigation";
import ItemPageLayout from "@/components/ItemPageLayout";

export default function ResultPage({ data }) {
	let dataLength = 0;
	for (let i in data) {
		if (data[i] !== null) dataLength++;
	}
	return (
		<ItemPageLayout
			displayitems={data}
			searchQuery={useSearchParams().get("q")}
			searchResultsNumber={dataLength}
		/>
	);
}

export async function getServerSideProps(context) {
	const query = context.query.q ? context.query.q : null;
	let sort = context.query.sort;
	if (sort) sort = sort.split("-");
	else sort = null;
	const category = context.query.category ? context.query.category : null;

	const res = await fetch("http://127.0.0.1:8000/api/items");
	let data = await res.json();
	if (category) {
		data["items"] = data["items"].filter((item) => item.category === category);
		let id_array = [];
		for (let i in data["items"]) {
			id_array.push(data["items"][i].id);
		}
		data["images"] = JSON.parse(data["images"]).filter((image) =>
			id_array.includes(image["fields"]["item"])
		);
	}
	if (query) {
		data["items"] = data["items"].map((item) => {
			if (item)
				if (item.item_name.startsWith(query)) {
					console.log(item);
					return item;
				} else {
					return null;
				}
			else {
				return null;
			}
		});
		let id_array = [];
		for (let i in data["items"]) {
			if (data["items"][i]) id_array.push(data["items"][i].id);
		}
		if (typeof data["images"] === "string")
			data["images"] = JSON.parse(data["images"]).filter((image) =>
				id_array.includes(image["fields"]["item"])
			);
		else {
			data["images"] = data["images"].filter((image) =>
				id_array.includes(image["fields"]["item"])
			);
		}
	}
	if (sort) {
		data["items"] = data["items"].map((item) => {
			if (item)
				if (
					item.max_no_of_days >= Number(sort[0]) &&
					item.max_no_of_days <= Number(sort[1])
				) {
					return item;
				} else {
					return null;
				}
			else return null;
		});
		let id_array = [];
		for (let i in data["items"]) {
			if (data["items"][i]) id_array.push(data["items"][i].id);
		}
		if (typeof data["images"] === "string")
			data["images"] = JSON.parse(data["images"]).filter((image) =>
				id_array.includes(image["fields"]["item"])
			);
		else {
			data["images"] = data["images"].filter((image) =>
				id_array.includes(image["fields"]["item"])
			);
		}
	}

	return {
		props: {
			data: data,
		},
	};
}
