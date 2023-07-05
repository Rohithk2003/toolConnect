import {useEffect, useState} from "react";
import {CustomerItemComponent} from "@/components/usersitems";
import {useRouter} from "next/router";

export default function Wishlist() {
    const [products,setProducts ] = useState(null);
    const router = useRouter();
    const loadProducts = async () => {

        const res = await fetch("http://127.0.0.1:8000/api/getwishilistitems",{
            credentials:"include",
        })
        const data = await res.json();
        setProducts(data);
    }
    useEffect(()=>{
        if (localStorage.getItem("status") === "false")
            router.push("/login")
        loadProducts()},[])
    return(
        <CustomerItemComponent item={products}/>
    )
}
