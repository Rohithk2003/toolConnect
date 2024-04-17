import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ModalComponent from "@/components/modal";

export function RelatedItemsComponent({
	item_id,
	item_name,
	item_img,
	item_description,
}) {
	return (
		<div
			key={item_id}
			className="mt-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-black dark:border-gray-700"
		>
			<a href={`https://toolconnect.onrender.com/product/${item_id}`}>
				<img
					className="rounded-t-lg object-contain w-full h-52 "
					src={`${item_img}`}
					alt=""
				/>
			</a>
			<div className="p-5 ">
				<a href={`https://toolconnect.onrender.com/product/${item_id}`}>
					<h5 className="mb-2 text-2xl font-bold  text-gray-900 dark:text-white">
						{item_name}
					</h5>
				</a>
				<p className="mb-3 font-normal text-gray-700 overflow-hidden h-20 dark:text-gray-400">
					Description: {item_description}
				</p>
			</div>
		</div>
	);
}

export default function Product({ data, relatedItems }) {
	const [maxdays, setMax] = useState(0);
	const [alreadyOrdered, setValue] = useState(null);
	const handlechange = (event) => {
		setMax(event.target.value);
	};
	const router = useRouter();
	const [clickedState, setStates] = useState({
		gif: "hidden",
		button: "block",
	});
	let [modalstate, setstate] = useState("hidden");
	const [wishlistText, setwishlisttext] = useState("Add to wishlist");
	const [modal_text, setmodaltext] = useState(null);
	const [csrf_token, setCsrf] = useState("");
	useEffect(() => {
		fetch("https://toolconnect.onrender.com/api/get_csrf", {
			credentials: "include",
		}).then((response) => {
			setCsrf(response.headers.get("X-CSRFToken"));
		});
	});
	useEffect(() => {
		if (csrf_token)
			fetch("https://toolconnect.onrender.com/api/itemAlreadyOrdered", {
				credentials: "include",
				method: "post",
				headers: {
					"X-CSRFToken": csrf_token,
				},
				body: JSON.stringify({
					id: data["items"][0].id,
				}),
			})
				.then((response) => response.json())
				.then((result) => {
					console.log(result);
					setValue(result["message"]);
				});
		if (
			localStorage.getItem("status") !== "false" &&
			localStorage.getItem("status") !== ""
		)
			fetch(
				"https://toolconnect.onrender.com/api/presentinwishlist/" +
					data["items"][0].id,
				{
					credentials: "include",
				}
			)
				.then((response) => response.json())
				.then((result) => {
					if (result.message) {
						setwishlisttext("Remove from wishlist");
					}
				});
	}, [csrf_token]);

	async function addtowishlist() {
		setstate("hidden");

		fetch(
			"https://toolconnect.onrender.com/api/addtowishlist/" +
				data["items"][0].id,
			{
				credentials: "include",
				method: "POST",
			}
		)
			.then((response) => response.json())
			.then((result) => {
				if (result["message"] === "please login") {
					router.push("/login");
				} else if (result["message"] === "success") {
					setmodaltext("Added to wishlist");
					setstate("flex justify-center items-center");

					setwishlisttext("Remove from wishlist");
				} else {
					setmodaltext("Removed from wishlist");
					setstate("flex justify-center items-center");
					setwishlisttext("Add to wishlist");
				}
			});
	}

	async function OrderItem(id) {
		await setstate("hidden");
		if (alreadyOrdered === "please login in") router.push("/login");
		else {
			if (maxdays > 0) {
				if (maxdays <= data["items"][0].max_no_of_days) {
					setStates({
						button: "hidden",
						gif: "flex",
					});
					setTimeout(() => {
						setStates({
							button: "hidden",
							gif: "hidden",
						});

						if (
							alreadyOrdered !== "please login in" ||
							alreadyOrdered !== "not present"
						) {
							fetch("https://toolconnect.onrender.com/api/order", {
								credentials: "include",
								method: "PUT",
								body: JSON.stringify({
									item_id: id,
									no_of_days: maxdays,
								}),
							});
							setstate("flex justify-center items-center");
							setmodaltext(
								"Item has been ordered.You will be redirected to order page"
							);
							setTimeout(() => router.push("/orderhistory"), 2000);
						} else {
							router.push("/login");
						}
					}, 3000);
				} else {
					setmodaltext(
						"No of days must be less than maximum days allowed to be rented"
					);
					setstate("flex justify-center items-center");
				}
			} else {
				setmodaltext("Invalid no of days");
				setstate("flex justify-center items-center");
			}
		}
	}

	return (
		<>
			<ModalComponent
				text={modal_text}
				state={modalstate}
			/>
			<section className="text-white bg-black overflow-hidden w-screen">
				<div className=" pb-24 pt-10">
					<div className="text-3xl flex flex-wrap justify-center items-center pb-8 text-start  w-[100px] lg:w-[470px]">
						{data["items"][0].item_name}
					</div>
					<div className="grid lg:w-full  lg:grid-cols-2 md:grid-cols-1">
						<div className="flex w-full justify-center items-center m-auto">
							<img
								alt="ecommerce"
								width={200}
								height={200}
								className="lg:w-1/2 w-full lg:h-96 h-auto  object-contain align-center justify-center rounded"
								src={data["items"][0].image_url}
							/>
						</div>
						<div className="flex w-full p-6 justify-start align-middle flex-wrap">
							<div className="w-full lg:pr-7 lg:pt-7 lg:pb-7 mt-6 lg:mt-0">
								<h1 className="text-white text-3xl title-font font-medium mb-1">
									{data["items"][0].item_name}
								</h1>
								<p className="leading-relaxed overflow-auto">
									{data["items"][0].description}
								</p>
								<div className="flex mt-6 flex-wrap items-center mb-2">
									<div className="flex flex-row">
										<span className="mr-3">
											Category : {data["items"][0].category}
										</span>
									</div>
								</div>
								<div className="flex flex-wrap justify-between mt-6 w-full items-center pb-2">
									<div className="flex justify-start flex-row">
										<span className="mr-3">
											Seller : {data["items"][0].seller}
										</span>
									</div>

									<div className="flex justify-start  text-start w-72">
										<span className="mr-3">Max Rent Days Allowed :</span>
										<div>
											<div>{data["items"][0].max_no_of_days}</div>
										</div>
									</div>
								</div>
								<div className="flex mt-6 w-full flex-wrap  justify-between pb-5 border-b-2 border-gray-800 mb-5">
									<div className="flex flex-row overflow-ellipsis  whitespace-nowrap">
										<span className="mr-3 ">
											Address : {data["items"][0].address}
										</span>
									</div>
									<div className="flex  flex-wrap text-start  flex-row w-72">
										<span className="mr-3 ">Listed at :</span>
										<div className="relative text-end ">
											<div>{data["items"][0].createdTime}</div>
										</div>
									</div>
								</div>
								<div className="flex flex-wrap  w-auto  justify-between">
									<div className="ml-5 md:ml-0 flex justify-center lg:justify-start ">
										<span className="mr-3 mt-2">Days:</span>
										<div className="relative">
											<input
												value={maxdays}
												onChange={handlechange}
												className="rounded border sm:w-56 md:w-56 border-gray-700 focus:ring-2  lg:w-36 focus:ring-purple-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-purple-500 text-white pl-3 pr-3 "
												type="number"
											/>
										</div>
									</div>
									<div className="flex justify-end  mt-10 sm:mt-3 lg:mt-0 md:mt-0 md:mr-0  items-center">
										{alreadyOrdered === "present" ? (
											<button
												disabled={true}
												onClick={() => {
													OrderItem(data["items"][0].id);
												}}
												className={`${clickedState.button} disabled:bg-gray-600 h-12 ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded`}
											>
												Already Ordered
											</button>
										) : (
											<button
												onClick={() => {
													OrderItem(data["items"][0].id);
												}}
												className={`${clickedState.button} ml-auto text-white  h-12 w-28 bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded`}
											>
												Rent
											</button>
										)}
										<div
											className={`${clickedState.gif} items-center justify-center bg-black rounded uppercase tracking-wide text-white opacity-90 dark:bg-black dark:text-white`}
										>
											<button
												className={`flex disabled:bg-gray-600 pt-3 text-start h-12 w-40 text-md  text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded`}
											>
												Processing
												<div>
													<img
														src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
														width={24}
														height={24}
														className="ml-5 text-white"
														alt={"loading"}
													/>
												</div>
											</button>
										</div>
										<button
											onClick={addtowishlist}
											data-modal-target="defaultModal"
											data-modal-show="defaultModal"
											className="text-start rounded  lg:whitespace-nowrap md:whitespace-break-spaces px-6 bg-purple-500  h-12    hover:bg-purple-600 text-white ml-4"
										>
											{wishlistText}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full h-max p-10  bg-black text-white ">
					<div className="text-2xl">Related Items</div>
					<div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2 sm-grid-cols-1 grid-rows-1">
						{relatedItems["items"].map((item, index) => {
							return item.id !== data["items"][0].id ? (
								<RelatedItemsComponent
									item_id={item.id}
									item_name={item.item_name}
									item_img={item.image_url}
									item_description={item.description}
								/>
							) : null;
						})}
					</div>
				</div>
			</section>
		</>
	);
}

export async function getStaticProps({ params }) {
	const itemdata = await fetch(
		`https://toolconnect.onrender.com/api/items/itemid=${params.id}`
	);
	const data = await itemdata.json();
	const relatedItemsResponse = await fetch(
		`https://toolconnect.onrender.com/api/items/category=Agricultural`
	);
	const relatedItems = await relatedItemsResponse.json();
	return {
		props: { data, relatedItems },
	};
}

export async function getStaticPaths() {
	const ids = await fetch("https://toolconnect.onrender.com/api/getallids");
	const data = await ids.json();
	const d = () => {
		return data.map((id) => {
			return {
				params: {
					id: id,
				},
			};
		});
	};
	const d1 = d();
	return {
		paths: d1,
		fallback: false,
	};
}
