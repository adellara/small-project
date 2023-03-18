import React, { useEffect,useState } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import "./Dropdown.css";

const apiURL = "https://dummyjson.com/products";

function Dropdown() {
  const [data, setData] = useState([]); //data yang awal difetch
  const [find, setFind] = useState(""); //string filtering
  const [clicked,setClicked] = useState("")
  const [selected,setSelected] = useState([])
  const [multi,setMulti] = useState(false)
  const [show,setShow] = useState(false)

  useEffect(()=>{
    axios.get(apiURL).then((response)=>{
      setData(response.data.products)
    })
  },[])

  useEffect(()=>{
    setClicked(data[0]?.title)
  },[data])

  const filterData = (filter) => {
    setFind(filter)
  }

  const filteredData = data.filter((el)=>{
    if (find===""){
        return el.title;
    } 
    else {
        return el.title.toLowerCase().includes(find)
    }
  })
  const onClick = (clickedData) => {
    setFind(clickedData)
    setClicked(clickedData)
  }

  const onSelect = (e) => {
    setSelected([])
    if(e.target.checked){
      setMulti(true)
    } else {
      setMulti(false)
    }
  }

  const updateSelected = (update) => {
    setSelected([update,...selected])
    setClicked(update)
  }

  const showList = () => {
    setShow(!show)
  }

  return (
    <div className='root'>
      <div className='flex'>
        <h1>Dropdown</h1>
        <div>
          <input type="checkbox" id="multi-select" name="multi-select" onChange={onSelect}/>
          <label for="multi-select">Multi-select</label>
        </div>
        <div className='search-container'>
            <div className='dropdown'>
              <div className='dropdown-row title' >
                {clicked}
                <i class="arrow down" onClick={showList}></i>
              </div>
              <div className='search-inner'>
                <Searchbar onChange={filterData}/>
              </div>
              {find || show? 
                  filteredData.map(object => (
                    <div className="dropdown-row" onClick={()=>onClick(object.title)}>
                      {object.title}
                      {multi?<button className="button" onClick={()=>{
                          setFind("")
                          updateSelected(object.title)
                      }
                      }
                      >choose</button>:null}
                    </div>
                  ))
              :null}
            </div>
        </div>
    </div>
      {multi?<div class="show-selected">
        <h3>Selected items </h3>
        {selected.map(item=><p>{item}</p>)}
      </div>:null}
    </div>
  );
}

export default Dropdown;



//TODO
//Nambah button Select sama dropdown