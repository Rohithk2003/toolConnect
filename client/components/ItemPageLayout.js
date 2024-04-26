import { useEffect, useState } from "react";
import Categories from "@/components/Categories";
import Items from "@/components/Items";
import Filter from "@/components/filters";

export default function ItemPageLayout({
	displayitems,
	searchResultsNumber,
	searchQuery,
}) {
	const [categories, setCategories] = useState([]);
	let [items, setItems] = useState(displayitems);
	useEffect(() => setItems((items = displayitems)), [displayitems]);
	const [filters, setFilters] = useState([]);
	useEffect(() => {
		if (localStorage.getItem("categories")) {
			setCategories(localStorage.getItem("categories").split(","));
			setFilters(localStorage.getItem("maxdaysfilter").split(","));
		} else {
			fetch("https://toolconnect.onrender.com/api/pre_data")
				.then((response) => response.json())
				.then((data) => {
					setCategories(data["categories"]);
					setFilters(data["maxnoofdays"]);
					localStorage.setItem("categories", data["categories"]);
					localStorage.setItem("maxdaysfilter", data["maxnoofdays"]);
				});
		}
	}, []);

	return (
		<>
			<main className="w-screen">
				<div className="mr-0 flex  w-screen  flex-col bg-white py-6  text-black dark:bg-black dark:text-white md:flex-row">
					<Categories categories={categories} />
					<Items
						products={items}
						searchQuery={searchQuery}
						searchResultsCount={searchResultsNumber}
					/>
					<Filter filters={filters} />
				</div>
			</main>
		</>
	);
}
