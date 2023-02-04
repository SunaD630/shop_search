import {React, useState, useEffect} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form";
import axios from 'axios';

export function Home() {
    const navigate = useNavigate();
    const { register, setValue, handleSubmit } = useForm();
    const [areas, setAreas] = useState([]);
    const [shops, setShops] = useState([]);
    const location = useLocation();
    const user_name = location.state.user_name;
    const user_id = location.state.user_id;
    function searchShop(data){ // 入力データから店舗を検索 
        const url = "http://localhost:3000/shops/search";
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios
        .post(url,data,config,{withCredentials: true})
        .then((response) => {
            console.log("response:" + response.data);
            navigate("/search",
                {state: {'shop_list': response.data, 'user_id': user_id}}
            );
        })
        .catch(() => {
            console.log("cannot search");
        })
    }
    const getShop = () => {
        const url = "http://localhost:3000/home";
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return new Promise((resolve, reject) => {
            axios
            .post(url,{'id': user_id},config)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
            })
        })
    }
    const onSubmit = inputdata => {
        searchShop(JSON.stringify(inputdata));
    }
    useEffect(() => {
        console.log(user_id);
        const showShop = async() => {
            let res = await getShop();
            setAreas(res.data.area_list);
            setShops(res.data.shop_list);
            console.log(res);
            // console.log(shops[1][0]);
        }
        showShop();
    },[]);
    return(
        <>
        <div>
            <h1>ホーム</h1>
            <form action="search" onSubmit={handleSubmit(onSubmit)}>
                <label>{user_name}さん</label>
                {areas.map((area, index) => {
                    return(
                        <div>
                        <h2>{area.area_name}</h2>
                        {shops[index].map((shop,index) => {
                            return(
                                <div>
                                <label>{shop.shop_name}</label>
                                </div>
                            )
                        })}
                        </div>
                    )
                })}
                <h2>店を検索</h2>
                <label>店名</label>
                <input type="text" {...register("name")} />
                <label>エリア名</label>
                <input type="text" {...register("middle_area")} />
                <input type="submit" value="検索"></input>
            </form>
        </div>
        </>
    )
}

export default Home;