export function MainPage({ repo }) {
	console.log(JSON.parse(repo["images"]));
	return (
		<>
			<div className="w-full z-0 relative  h-screen">
				<div className="flex w-full flex-wrap flex-row flex-grow z-0 h-full">
					<div className="z-0 w-1/2 h-full bg-[#9300CC]">
						<a
							href={
								repo["items"][0] &&
								`http://localhost:3000/product/${repo["items"][0].id}`
							}
						>
							<div className=" absolute left-0 z-10 top-[-2px] w-max text-black dark:text-white">
								<h3
									data-testid="product-name"
									className="inline bg-white  z-0 relative box-decoration-clone pb-4 py-3 pl-5 font-semibold leading-loose shadow-[1.25rem_0_0] shadow-white dark:bg-black dark:shadow-black text-3xl"
								>
									{repo["items"][0] ? repo["items"][0].item_name : "None"}
								</h3>
								<p className="w-36 bg-white mt-0  z-0 border-collapse pb-2 mb-2 px-5 py-3 text-sm font-semibold dark:bg-black dark:text-white">
									{repo["items"][0]
										? ` Max : ${repo["items"][0].max_no_of_days} days`
										: "None"}
								</p>
							</div>
							<img
								src={
									repo["items"][0]
										? `https://toolconnect.onrender.com/media/${
												JSON.parse(repo["images"])[0]["fields"]["img"]
										  }`
										: "none"
								}
								alt="none"
								className=" bg-transparent relative object-contain  h-full bg-opacity-0 bg-purple-600 w-full z-0 transition duration-300 "
							/>
						</a>
					</div>
					<div className="flex flex-col h-full w-1/2 flex-wrap">
						<div className="w-full h-1/2 bg-[#171717]">
							<a
								href={
									repo["items"][1] &&
									`http://localhost:3000/product/${repo["items"][1].id}`
								}
							>
								<div className="absolute w-max z-10 text-black dark:text-white">
									<h3
										data-product-name="product-name"
										className="inline bg-white box-decoration-clone pb-4 py-3 pl-5 font-semibold leading-loose shadow-[1.25rem_0_0] shadow-white dark:bg-black dark:shadow-black text-3xl"
									>
										{repo["items"][1] ? repo["items"][1].item_name : "None"}
									</h3>
									<p className="w-fit bg-white mt-0 border-collapse pb-2 mb-2 px-5 py-3 text-sm font-semibold dark:bg-black dark:text-white">
										{repo["items"][1]
											? ` Max : ${repo["items"][1].max_no_of_days} days`
											: "None"}
									</p>
								</div>
								<img
									src={
										repo["items"][0]
											? `https://toolconnect.onrender.com/media/${
													JSON.parse(repo["images"])[1]["fields"]["img"]
											  }`
											: "none"
									}
									alt="none"
									width="540"
									height="540"
									fetchPriority="high"
									className="relative h-full object-contain bg-opacity-100 w-full z-0 transition duration-300 ease-in-out hover:scale-100"
								/>
							</a>
						</div>
						<div className="w-full h-1/2 bg-white">
							<a
								href={
									repo["items"][2] &&
									`http://localhost:3000/product/${repo["items"][2].id}`
								}
							>
								<div className="absolute w-max z-10  text-black dark:text-white">
									<h3
										data-testid="product-name"
										className="inline bg-white box-decoration-clone pb-4 py-3 pl-5 font-semibold leading-loose shadow-[1.25rem_0_0] shadow-white dark:bg-black dark:shadow-black text-3xl"
									>
										{repo["items"][2] ? repo["items"][2].item_name : "None"}
									</h3>
									<p className="w-fit bg-white mt-0 border-collapse pb-2 mb-2 px-5 py-3 text-sm font-semibold dark:bg-black dark:text-white">
										{repo["items"][2]
											? ` Max : ${repo["items"][2].max_no_of_days} days`
											: "None"}
									</p>
								</div>
								<img
									src={
										repo["items"][2]
											? `https://toolconnect.onrender.com/media/${
													JSON.parse(repo["images"])[2]["fields"]["img"]
											  }`
											: "none"
									}
									alt="none"
									alt="none"
									width="540"
									height="540"
									fetchPriority="high"
									className="relative h-full object-contain bg-opacity-100 w-full z-0 transition duration-300 ease-in-out hover:scale-100"
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default function mainPage({ repo }) {
	return <MainPage repo={repo} />;
}

export async function getStaticProps() {
	const res = await fetch("https://toolconnect.onrender.com/api/main_items");
	const repo = await res.json();
	return {
		props: {
			repo,
		},
	};
}
