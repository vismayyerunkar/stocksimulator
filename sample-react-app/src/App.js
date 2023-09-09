import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from "react"

import { io } from 'socket.io-client';
const URL = 'http://localhost:5000';

const socket = io(URL);

function App() {

  const [testData,setTestData] = React.useState("No data present");
  const [trendings,setTrendings] = React.useState("No trending stock data present");

  useEffect(() => {

    socket.on("TRENDING_STOCKS",(data)=>{
      setTrendings(data);
    });
    socket.emit("GET_STOCK_DATA",{symbols:["TCS.NS"]},(vals)=>{
      console.log("kkkkkkk" ,vals);
      setTestData(vals);
    });

    socket.on("PRICE_CHANGED",(datta)=>{
      console.log("REceived new price ",datta);
      setTestData(datta);
    })

  }, [])

  return (
    <div className="App">
        <h1>Trending stock data</h1>
        <p>{JSON.stringify(trendings)}</p>
        <p>{JSON.stringify(testData)}</p>

    </div>
  );
}

export default App;
