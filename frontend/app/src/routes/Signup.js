import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form";
import axios from 'axios';
import "../App.css"
function Signup() {
  const navigate = useNavigate()
  const [prefectures, setPrefectures] = useState([]);
  const {register, setValue, handleSubmit} = useForm();

  const config = {
    url: "http://localhost:3000/users/prefectures",
    method: "GET",
    headers: {
      'Content-Type': "application/json"
    },
    withCredentials: true
  }
  useEffect(() => {
    axios(config)
    .then(response => {
        setPrefectures(response.data.prefectures);      
    })
    .catch(() => {
      console.log("failed to connect");
    });

  },[]);

  function searchZipcode(e) {
    let zipcode = e.target.value;
    const url = "https://zipcloud.ibsnet.co.jp/api/search";
    axios.get(url+"?zipcode="+zipcode)
    .then(response => {
        const data = response.data.results[0];
        console.log(data);
        setValue("prefecture",data.address1);
        setValue("city_name",data.address2 + data.address3);
    })
  };
  function registerUser(data){
      axios
      .post("http://localhost:3000/users/register",JSON.stringify(data),{headers: {'Content-Type': 'application/json'}},{withCredentials: true})
      .then(() => {
          console.log("succeed to submit");
          navigate("/home",{state: data});
        }
      )
      .catch(() => {
          console.log("failed to submit");
      })
      
  }
  const onSubmit = inputdata => {
    registerUser(inputdata);
  }
    return (
      <div>
        <h1>新規登録画面</h1>
      <p>ユーザー情報を入力</p>
      <form action="home" onSubmit={handleSubmit(onSubmit)}>
        <label>名前</label>
        <input type="text" {...register("name")} placeholder="Your name" />
      <br/>
      <label>郵便番号</label>
      <input type="text" {...register("zipcode")} placeholder="例)1460092" onChange={searchZipcode}/>
      <br/>
      <label>都道府県</label>
      <select {...register("prefecture")} placeholder="都道府県を選択してください">
        {prefectures.map(value => {
          return (<option value={value}>{value}</option>)
      })}
      </select>
      <br/>
      <label>市区町村</label>
      <input type="text" {...register("city_name")} id="address"/>
      <br/>
      <label>番地</label>
      <input type="text" {...register("house_number")} id="address"/>
      <br/>
      <label>メール</label>
      <input type="email" {...register("email")}/>
      <br/>
      <label>パスワード</label>
      <input type="password" {...register("password")}/>
      <br/>
      <input type="submit" value="送信"/>
        </form>
      </div>
      );
}

export default Signup;
