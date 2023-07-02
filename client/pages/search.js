import { useSearchParams } from "next/navigation";
import ItemPageLayout from "@/components/ItemPageLayout";
import axios, { get } from "axios";
import { useEffect, useState } from "react";

function HandleItemsClient(box, storage) {}

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
  if (category)
    data = data.map((item) => {
      if (item)
        if (item.category === category) {
          return item;
        } else {
          return null;
        }
      else {
        return null;
      }
    });
  if (query)
    data = data.map((item) => {
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
  if (sort)
    data = data.map((item) => {
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
  return {
    props: {
      data: data,
    },
  };
}
