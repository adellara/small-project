import React, { useEffect,useState } from "react";
import "./Searchbar.css";

const Searchbar=(props)=>{

    const onChange = e => {
        props.onChange(e.target.value.toLowerCase())
    }

    return(
        <input className="input" type="text" onChange={onChange} value={props.value}/>
    )
}

export default Searchbar;