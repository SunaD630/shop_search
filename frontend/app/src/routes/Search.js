import React from 'react';
import {useNavigate} from 'react-router-dom'
import "../App.css"
export function Search(){
    const navigate = useNavigate();
    return(
        <div>
            <label>検索結果</label>
        </div>
    )
}

export default Search;