import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom'
import "../App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
export function Search(){
    const navigate = useNavigate();
    const location = useLocation();
    const shop_list = location.state.shop_list;
    const user_id = location.state.user_id;
    console.log("user_id : "+user_id);
    function registerData(e){
        const selected_index = Number(e.target.id);
        const selected_shop = shop_list[selected_index];
        const data = {
            'user_id': user_id,
            'shop': selected_shop
        }
        const url = "http://localhost:3000/shops/register";
        const config = {
            headers : {
                'Content-Type': 'application/json',
            }
        }
        axios
        .post(url,data,config,{withCredentials: true})
        .then((response) => {
            console.log("registering shop");
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <div key={location.key}> 
          {shop_list.map((shop_info,index) => {
              return(
                  <form >
                      <Card bg='primary' text='white' border='secondary' style={{ width: '20rem' }}>
                          <Card.Img variant="top" src={shop_info.logo_image} />
                          <Card.Body>
                              <Card.Title>{shop_info.name}</Card.Title>
                              <Card.Text>
                              {shop_info.genre}
                              <br/>
                              住所：{shop_info.address}
                              <br/>
                              最寄駅：{shop_info.station}
                              </Card.Text>
                              <Card.Link href={shop_info.URL}>ホットペッパーURL</Card.Link>
                              <Button variant="info" id={index} onClick={registerData}>登録</Button>
                          </Card.Body>
                          <br/>
                      </Card>
                  </form>
                  );
              })
          }
        </div>
        )
}

export default Search;