import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import Footer from "../components/Footer";
import "../styles/Home.css";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap'


export default function Home() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    let URL = `https://api.coinpaprika.com/v1/coins/`;
    fetch(`${URL}`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].is_new = "True"
        }
        return setCoins(data)
      });
  }, []);
  // ---------------------------------------------------CHANGING FALSE / TRUE

  //   --------------------------------------------------PAGINATION SET UP-------------------------------------------
  let columns = [
      {dataField : "id", text:'ID'},
      {dataField : "name", text:'Name'},
      {dataField : "symbol", text:'Symbol'},
      {dataField : "rank", text:'Rank'},
      {dataField : "id", text:'Type'},
      {dataField : "is_new", text:"Active"},
      {dataField : "", text:'Action'}
  ]
  return (
    <div>
      <Navbar />
        <BootstrapTable 
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
