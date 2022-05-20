import React from 'react'
import { Navbar } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

export default function CoinList() {
  const {id} = useParams();
  console.log(id,"param in list");
  return (
      <>
        <Navbar/>
        <h1>Coin Detail</h1>
        <h4>{id}</h4>
        <h4></h4>
        <h4></h4>
        <h4></h4>
        <h4></h4>
        <h4></h4>
      </>
  )
}
