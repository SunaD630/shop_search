import React from 'react';
import {useNavigate} from 'react-router-dom'

export function Search(){
    const navigate = useNavigate();
    return(
        <div>
            <label>住所</label>
        </div>
    )
}

export default Search;