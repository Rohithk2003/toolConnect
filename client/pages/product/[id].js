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
    <div className="mt-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-black dark:border-gray-700">
      <a href={`http://localhost:3000/product/${item_id}`}>
        <img
          className="rounded-t-lg w-full h-52 object-contain"
          src={item_img}
          alt=""
        />
      </a>
      <div className="p-5 border-t-2">
        <a href={`http://localhost:3000/product/${item_id}`}>
          <h5 className="mb-2 text-2xl font-bold  text-gray-900 dark:text-white">
            {item_name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item_description}
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
  const [modalstate, setstate] = useState("hidden");
  const [wishlistText, setwishlisttext] = useState("Add to wishlist");
  const [modal_text, setmodaltext] = useState(null);
  const [csrf_token, setCsrf] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get_csrf", {
      credentials: "include",
    }).then((response) => {
      setCsrf(response.headers.get("X-CSRFToken"));
    });
  });
  useEffect(() => {
    if (csrf_token)
      fetch("http://127.0.0.1:8000/api/itemAlreadyOrdered", {
        credentials: "include",
        method: "post",
        headers: {
          "X-CSRFToken": csrf_token,
        },
        body: JSON.stringify({
          id: data[0].id,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setValue(result["message"]);
        });
    fetch("http://127.0.0.1:8000/api/presentinwishlist/" + data[0].id, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message) {
          setwishlisttext("Remove from wishlist");
        }
      });
  }, [csrf_token]);

  async function addtowishlist() {
    setstate("hidden");

    fetch("http://127.0.0.1:8000/api/addtowishlist/" + data[0].id, {
      credentials: "include",
      method: "POST",
    })
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
  function OrderItem(id) {
    setstate("hidden");
    if (alreadyOrdered === "please login in") router.push("/login");
    else {
      if (maxdays > 0) {
        if (maxdays <= data[0].max_no_of_days) {
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
              fetch("http://127.0.0.1:8000/api/order", {
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
          setstate("hidden");
          setstate("flex justify-center items-center");
          setmodaltext("No of days must be less than allowed");
        }
      } else {
        setstate("hidden");
        setstate("flex justify-center items-center");
        setmodaltext("Invalid no of days");
      }
    }
  }
  return (
    <>
      <ModalComponent text={modal_text} state={modalstate} />
      <section className="text-white bg-black overflow-hidden w-screen">
        <div className=" pb-24 pt-10">
          <div className="text-3xl pb-8 text-start ml-36 w-full">
            {data[0].item_name}
          </div>
          <div className="grid lg:w-full  lg:grid-cols-2 md:grid-cols-1">
            <div className="flex w-full justify-center align-middle">
              <img
                alt="ecommerce"
                width={200}
                height={200}
                className="lg:w-1/2 w-full lg:h-96 h-auto mr-24 object-center align-center justify-center rounded"
                src={data[0].img}
              />
            </div>
            <div className="flex justify-start align-middle">
              <div className="w-full lg:pr-7 lg:pt-7 lg:pb-7 mt-6 lg:mt-0">
                <h1 className="text-white text-3xl title-font font-medium mb-1">
                  {data[0].item_name}
                </h1>
                <p className="leading-relaxed">{data[0].description}</p>
                <div className="flex mt-6 items-center mb-2">
                  <div className="flex flex-row">
                    <span className="mr-3">Category : {data[0].category}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 mt-6 w-full items-center pb-2">
                  <div className="flex flex-row">
                    <span className="mr-3">Seller : {data[0].seller}</span>
                  </div>

                  <div className="flex justify-end  text-end w-64">
                    <span className="mr-3">Max Rent Days Allowed :</span>
                    <div className="relative ">
                      <div>{data[0].max_no_of_days}</div>
                    </div>
                  </div>
                </div>
                <div className="flex mt-6 w-full  pb-5 border-b-2 border-gray-800 mb-5">
                  <div className="flex w-2/3 flex-row overflow-ellipsis  whitespace-nowrap">
                    <span className="mr-3 ">Address : {data[0].address}</span>
                  </div>

                  <div className="flex text-start flex-row w-2/3 ml-24 ">
                    <span className="mr-3 w-1/2">Listed at :</span>
                    <div className="relative text-end">
                      <div>{data[0].createdTime}</div>
                    </div>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 lg:w-full sm:grid-cols-1  sm:grid-rows-2 lg:grid-rows-1">
                  <div className="flex lg:justify-start lg:w-full sm:w-full sm:justify-center sm:items-center  md:justify-center md:items-center lg:items-center">
                    <span className="mr-3">Days:</span>
                    <div className="relative">
                      <input
                        value={maxdays}
                        onChange={handlechange}
                        className="rounded border sm:w-56 md:w-56 border-gray-700 focus:ring-2  lg:w-36 focus:ring-purple-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-purple-500 text-white pl-3 pr-3 "
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end  mt-10 sm:mt-3 lg:mt-0 md:mt-0 items-center">
                    {alreadyOrdered === "present" ? (
                      <button
                        disabled={true}
                        onClick={() => {
                          OrderItem(data[0].id);
                        }}
                        className={`${clickedState.button} disabled:bg-gray-600 h-12 ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded`}
                      >
                        Already Ordered
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          OrderItem(data[0].id);
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

        <div className="w-full h-1/3 bg-black text-white p-6">
          <div className=" text-2xl">Related Items</div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm-grid-cols-1 grid-rows-2">
            {relatedItems.map((item) => {
              return item.id !== data[0].id ? (
                <RelatedItemsComponent
                  item_id={item.id}
                  item_name={item.item_name}
                  item_img={item.img}
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
    `http://127.0.0.1:8000/api/items/itemid=${params.id}`
  );
  const data = await itemdata.json();
  const relatedItemsResponse = await fetch(
    `http://127.0.0.1:8000/api/items/category=Agricultural`
  );
  const relatedItems = await relatedItemsResponse.json();
  return {
    props: { data, relatedItems },
  };
}

export async function getStaticPaths() {
  const ids = await fetch("http://127.0.0.1:8000/api/getallids");
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
