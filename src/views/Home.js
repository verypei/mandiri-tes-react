import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import Footer from "../components/Footer";
import "../styles/Home.css";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Form } from 'react-bootstrap';
import SearchBar from "../components/SearchBar"


export default function Home() {
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate();

  //   --------------------------------------------------PAGINATION SET UP-------------------------------------------
  function buttonFormatter(cell, row){
  return `<button type="submit">Delete</button>`;
}

const toCoinsDetail ={
  onClick: (e) => {
    console.log("clicked");
  }
  // navigate('coin-list')
}

const handleAPI = (URL)=>{
  fetch(`${URL}`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].is_new = "True"
        }
        console.log(data[0]);
        return setCoins(data)
      })
}
  let columns = [
      {dataField : "id" , text:'ID', rowEvents:{toCoinsDetail}},
      {dataField : "name", text:'Name'},
      {dataField : "symbol", text:'Symbol'},
      {dataField : "rank", text:'Rank'},
      {dataField : "type", text:'Type'},
      {dataField : "is_new", text:"Active"},
      {dataField : "", text:'Action', formatter:(rowContent, row)=>{
        return (<Button sty>delete</Button>)
      }}
  ]
  return (
    <div>
      <Navbar />
      <Form className="search-select">
        <SearchBar handle={handleAPI}/>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="email" placeholder="search" />
        </Form.Group>
        
    </Form>
        <BootstrapTable 
            bootstrap4
            keyField="id"
            data={coins}
            columns={columns}
            pagination={paginationFactory()}
        />
      <Footer />
    </div>
  );
}
// tigor.manurung@bankmandiri.co.id
