import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import DB from "../dummy_db.json";
import "../styles/Home.css";
import { Button, Form, Pagination, Table } from "react-bootstrap";

export default function Home() {
  let paginationArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [API, setAPI] = useState("");
  const [coins, setCoins] = useState([]);
  const [tableView, setTableView] = useState(0);
  const [tablePerNum, setTablePerNum] = useState([]); //tampilan per 4 or per 'num' listing coins
  const [paginationNumber, setPaginationNumber] = useState(paginationArr);
  const [activePagination, setActivePagination] = useState(0);
  const navigate = useNavigate();
  let listNumberRef = useRef();

  //   ---------------------------------------------------------USE EFFECT---------------------------------------------------
  useEffect(()=>{
    for (let i = 0; i < coins.length; i++) {
      coins[i].value = i;
    }
  },[coins])
  useEffect(() => {}, [tableView]);
  //   -----------------------------------------------------------TO COINS DETAILS--------------------------------------------
  const toCoinsDetail = (e) => {
    console.log("clicked to detail", e.target.text);
    navigate(`coin-list/${e.target.text}`);
  };
  // --------------------------------------------------------------HANDLE API--------------------------------------------------

  const handleAPI = (emitAPI) => {
    // if there is another API setup
    if (!API) {
      let firstCoins = [];
      if (!listNumberRef.current.value || listNumberRef.current.value < 1) {
        listNumberRef.current.value = 4;
      }
      for (let i = 0; i < listNumberRef.current.value; i++) {
        firstCoins.push(DB[i]);
      }
      setTablePerNum(firstCoins);
      setAPI(emitAPI);
      setCoins(DB);
      setActivePagination(1);
    } 
    else {
      let arrCoins = [];
      for (let i = 0; i < listNumberRef.current.value; i++) {
        arrCoins.push(DB[i]);
      }
      setTablePerNum(arrCoins);
      setActivePagination(1);
    }
  };
  //   ---------------------------------------------------------SET PAGINATION--------------------------------------------------
  const movePaginationUP = () => {
    if (
      coins.length !== 0 &&
      paginationNumber[paginationNumber.length - 1] !==
        Math.ceil(coins.length / listNumberRef.current.value)
    ) {
      let result = paginationNumber.map((el) => {
        return el + 1;
      });
      setPaginationNumber(result);
    }
  };

  const movePaginationDown = () => {
    if (paginationNumber[paginationNumber.length - 1] > 10) {
      let result = paginationNumber.map((el) => {
        return el - 1;
      });
      setPaginationNumber(result);
    }
  };

  const lastPagination = () => {
    if (coins.length !== 0) {
      let end = Math.ceil(coins.length / listNumberRef.current.value);
      let temp = [];
      for (let i = end; i > end - 10; i--) {
        temp.push(i);
      }
      setPaginationNumber(temp.reverse());
    }
  };

  const firstPagination = () => {
    if (coins.length !== 0) {
      let temp = [];
      for (let i = 1; i <= 10; i++) {
        temp.push(i);
      }
      setPaginationNumber(temp);
    }
  };
  //   -------------------------------------------------SET TABLE PER 4 or NUM VIEW-------------------------------------------
  const setTable = (e) => {
    // set table per four or 'num' column after adapted from page number
    let startingNum = Number(e.target.text); //data from pagination button
    let result = [];
    let start =
      startingNum === undefined
        ? tableView * listNumberRef.current.value
        : startingNum * listNumberRef.current.value;
    let limit = start - listNumberRef.current.value;
    if (start > coins.length) {
      start = coins.length;
    } else if (start < listNumberRef.current.value) {
      limit = 0;
    }
    for (let i = start - 1; i >= limit; i--) {
      result.push(coins[i]);
    }
    setTablePerNum(result.reverse());
    setActivePagination(startingNum);
  };
  //   --------------------------------------------------------DELETE FUNCTION------------------------------------------------
  const deleteCoins = (e) => {
    let id = Number(e.target.value);
    let result = tablePerNum.filter((el, idx) => {
      return idx !== id;
    });
    setTablePerNum(result);//get add element array after delete
  };
  //   ----------------------------------------------------------RENDERING ---------------------------------------------------
  return (
    <div className="container">
      {/* NAVBAR */}
      <Navbar handle={handleAPI} className="navbar" />
      {/* SELECT AND SEARCH */}
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="search"
            style={{ width: "220px", height: "40px" }}
          />
          <Form.Control
            type="number"
            min="1"
            ref={listNumberRef}
            placeholder="custom list "
            style={{ width: "220px", height: "40px" }}
          />
          <Button onClick={handleAPI}>reset list by</Button>
        </Form.Group>
      </Form>
      {/* TABLE */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Rank</th>
            <th>Type</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tablePerNum.map((el, idx) => {
            return (
              <>
                <tr key={idx}>
                  <td>
                    <a href="#" onClick={toCoinsDetail}>
                      {el.id}
                    </a>
                  </td>
                  <td>{el.name}</td>
                  <td>{el.symbol}</td>
                  <td>{el.rank}</td>
                  <td>{el.type}</td>
                  <td>{!el.is_new && "True"}</td>
                  <td>
                    <Button onClick={deleteCoins} value={el.value}>
                      delete
                    </Button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
      {/* PAGINATION */}
      <Pagination>
        <Pagination.First onClick={firstPagination} />
        <Pagination.Prev onClick={movePaginationDown} />
        {paginationNumber.map((el, idx) => {
          return (
            <Pagination.Item key={idx} onClick={setTable}>
              {el}
            </Pagination.Item>
          );
        })}
        <Pagination.Next onClick={movePaginationUP} />
        <Pagination.Last onClick={lastPagination} />
      </Pagination>
      {/* <Footer /> */}
    </div>
  );
}
