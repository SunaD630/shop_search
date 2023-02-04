import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from 'axios';
import "../App.css";

function Signin() {
  const navigate = useNavigate();
  const [no_data_alert, setNo_data_alert] = useState();
  const {register, setValue, handleSubmit} = useForm();

  

  function performSignIn(data){
      axios
      .post("http://localhost:3000/users/signin",JSON.stringify(data),{headers: {'Content-Type': 'application/json'}},{withCredentials: true})
      .then(response => {
        //   console.log("response: "+ response.data[0].user_name);
        if (response.data.length == 0){
            console.log("no data");
            setNo_data_alert("メールアドレスまたはパスワードが間違っています");
        }else{
            navigate("/home",{state: {'user_name': response.data[0].user_name, 'user_id': response.data[0].user_id}});
        }
      })
      .catch(() => {
          console.log("failed to submit");
      })
      
  }
  const onSubmit = inputdata => {
    performSignIn(inputdata);
  }
    return (
      <div>
        <h1>ログイン画面</h1>
        <p>ユーザー情報を入力</p>
        <form action="home" onSubmit={handleSubmit(onSubmit)}>
        <label>メール</label>
        <input type="email" {...register("email")}/>
        <br/>
        <label>パスワード</label>
        <input type="password" {...register("password")}/>
        <label>{no_data_alert}</label>
        <input type="submit" value="サインイン"/>
        </form>
        <button onClick={() => navigate("/signup")}>新規登録はこちら</button>
      </div>
      );
}

export default Signin;
