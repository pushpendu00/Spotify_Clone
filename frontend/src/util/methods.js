
import { base_url } from "./constant";

const getMethod = async(path,body)=>{
    const res = await fetch(`${base_url}${path}`,{
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const resData = await res.json();
    return resData;
}

const postMethod = async(path,body)=>{
    const res = await fetch(`${base_url}${path}`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const resData = await res.json();
    // console.log(resData);
    return resData;
}

export { getMethod, postMethod };
