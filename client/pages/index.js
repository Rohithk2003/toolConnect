import Layout from "@/components/Layout";

export function MainPage({ repo }) {
  return (
    <div className="w-full z-0 relative  h-screen">
      <div className="flex w-full  z-0 h-full">
        <div className="z-0 w-1/2 h-full bg-[#9300CC]">
          <a href={repo[0] && `http://localhost:3000/product/${repo[0].id}`}>
            <div className=" absolute left-0 z-10 top-[-2px] w-3/4 text-black dark:text-white">
              <h3
                data-testid="product-name"
                className="inline bg-white  z-0 relative   box-decoration-clone pb-4 py-3 pl-5 font-semibold leading-loose shadow-[1.25rem_0_0] shadow-white dark:bg-black dark:shadow-black text-3xl"
              >
                {repo[0] ? repo[0].item_name : "None"}
              </h3>
              <p className="w-36 bg-white mt-0  z-0 border-collapse pb-2 mb-2 px-5 py-3 text-sm font-semibold dark:bg-black dark:text-white">
                {repo[0] ? ` Max : ${repo[0].max_no_of_days} days` : "None"}
              </p>
            </div>
            <img
              src={repo[0] && repo[0].img}
              alt="none"
              className=" relative object-contain bg-transparent h-full bg-opacity-100 w-full z-0 transition duration-300 "
            />
          </a>
        </div>
        <div className="grid grid-cols-1 h-full w-1/2 grid-rows-2">
          <div className="w-full h-full bg-[#171717]">
            <a href={repo[1] && `http://localhost:3000/product/${repo[1].id}`}>
              <div className="absolute w-3/4 z-10 text-black dark:text-white">
                <h3
                  data-product-name="product-name"
                  className="inline bg-white box-decoration-clone pb-4 py-3 pl-5 font-semibold leading-loose shadow-[1.25rem_0_0] shadow-white dark:bg-black dark:shadow-black text-3xl"
                >
                  {repo[1] ? repo[1].item_name : "None"}
                </h3>
                <p className="w-fit bg-white mt-0 border-collapse pb-2 mb-2 px-5 py-3 text-sm font-semibold dark:bg-black dark:text-white">
                  {repo[1] ? ` Max : ${repo[1].max_no_of_days} days` : "None"}
                </p>
              </div>
              <img
                src={repo[1] ? repo[1].img : "None"}
                alt="none"
                width="540"
                height="540"
                fetchpriority="high"
                className="relative h-full object-contain bg-opacity-100 w-full z-0 transition duration-300 ease-in-out hover:scale-100"
              />
            </a>
          </div>
          <div className="w-full h-full bg-white">
            <a href={repo[2] && `http://localhost:3000/product/${repo[2].id}`}>
              <div className="absolute w-3/4 z-10  text-black dark:text-white">
                <h3
                  data-testid="product-name"
                  className="inline bg-white box-decoration-clone pb-4 py-3 pl-5 font-semibold leading-loose shadow-[1.25rem_0_0] shadow-white dark:bg-black dark:shadow-black text-3xl"
                >
                  {repo[2] ? repo[2].item_name : "None"}
                </h3>
                <p className="w-fit bg-white mt-0 border-collapse pb-2 mb-2 px-5 py-3 text-sm font-semibold dark:bg-black dark:text-white">
                  {repo[2] ? ` Max : ${repo[2].max_no_of_days} days` : "None"}
                </p>
              </div>
              <img
                src={repo[2] ? repo[2].img : "None"}
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
  );
}

export default function mainPage({ repo }) {
  return <MainPage repo={repo} />;
}

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/api/main_items");
  const repo = await res.json();
  return {
    props: {
      repo,
    },
  };
}
