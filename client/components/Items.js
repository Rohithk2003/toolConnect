export default function Items({ products, searchQuery, searchResultsCount }) {
	let images;
	console.log(products);
	// if (typeof products["images"] === "object") {
	// 	images = products["images"];
	// } else {
	// 	images = JSON.parse(products["images"]);
	// }
	products["items"] = products["items"].filter((item) => item !== null);
	searchResultsCount = Object.keys(products["items"]).length;

	return (
		<div className="order-last min-h-screen ml-2 w-screen md:order-none">
			<div>
				{searchResultsCount >= 0 && searchQuery && (
					<div className="w-1/2 font-light">
						Showing {searchResultsCount} results for "{searchQuery}"
					</div>
				)}
			</div>

			<ul className="grid grid-flow-row  gap-4 md:p-5 p-2 pl-4 md:pl-5 grid-cols-2 md:grid-cols-3">
				{products["items"] &&
					products["items"].map(
						(item, index) =>
							item !== null &&
							item !== undefined && (
								<li
									key={index}
									className="relative aspect-square h-full w-full overflow-hidden transition-opacity animate-fadeIn"
								>
									<a
										className="h-full w-full"
										href={`https://tool-connect.vercel.app/product/${item.id}`}
									>
										<div className=" flex  bg-red h-full w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-900 relative">
											<img
												alt="No Image"
												loading="lazy"
												width="600"
												height="600"
												decoding="async"
												data-nimg="1"
												className="relative  h-full w-full object-contain transition duration-300 ease-in-out hover:scale-105"
												src={`${item.image_url}`}
											/>
											<div className="absolute left-0 top-0 w-3/4 text-black dark:text-white">
												<h3
													data-testid="product-name"
													className="inline bg-white box-decoration-clone py-3 pl-5 font-semibold leading-loose shadow-[1.25rem_0_0] shadow-white dark:bg-black dark:shadow-black text-lg"
												>
													{item.item_name}
												</h3>
												<p className="w-fit bg-white px-5 py-3 text-sm font-semibold dark:bg-black dark:text-white">
													Max:{item.max_no_of_days} days
												</p>
											</div>
										</div>
									</a>
								</li>
							)
					)}
			</ul>
		</div>
	);
}
