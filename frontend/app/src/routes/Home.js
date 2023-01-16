import React from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form";
import axios from 'axios';

export function Home() {
  const navigate = useNavigate();
  const { register, setValue, handleSubmit } = useForm();
  const location = useLocation();
  const user_data = location.state;
  const url = "http://localhost:3000/shops/search";
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };
  function searchShop(data){
      axios
      .post(url,data,config,{withCredentials: true})
      .then((response) => {
          console.log("response:",response.data);
          navigate("/search",{state: response.data});
      })
      .catch(() => {
          console.log("cannot search");
      })
  }
  const onSubmit = inputdata => {
      searchShop(JSON.stringify(inputdata));
  }
    return(
        <div>
            <h1>店を検索</h1>
            <form action="search" onSubmit={handleSubmit(onSubmit)}>
                <label>{user_data.name}さん</label>
                <label>店名</label>
                <input type="text" {...register("name")} />
                <label>エリア名</label>
                <input type="text" {...register("middle_area")} />
                <input type="submit" value="検索"></input>
            </form>
        </div>
    )
}

export default Home;