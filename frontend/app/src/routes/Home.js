import React from 'react';
import {useNavigate} from 'react-router-dom'

export function Home(){
    const navigate = useNavigate();
    return(
        <div>
            <label>店名</label>
        </div>
    )
}

export default Home;