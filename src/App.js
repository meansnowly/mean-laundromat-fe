import './App.css';
import React from 'react';
import {useState, useEffect} from "react";
import Timer from "./Timer";
import Axios from 'axios'

function App() {

    const [mcHistoryList, setMcHistory] = useState([]);

    const getMcHistory = ()=>{
        Axios.get('https://mean-laundromat-be.herokuapp.com/mchistory').then((response)=>{
            setMcHistory(response.data)
        })
    }

    // const addMcHistory = ()=>{
    //     Axios.post('http://localhost:3000/setmchistory',{
    //         start_date: start_date,
    //         machine_number: machine_number
    //     }).then(() =>{
    //         setMcHistory([
    //             ...mcHistoryList,{
    //                 start_date: start_date,
    //                 machine_number: machine_number
    //             }
    //         ])
    //     })
    // }

    const [coinAmount,setCoinAmount] = useState(0)
    const [start_datetime, setStartDate] = useState("");
    const [machine_number, setMachineNumber] = useState(0);
    const [timeMC1,setTimeMC1] = useState(0)
    const [timeMC2,setTimeMC2] = useState(0)
    const [timeMC3,setTimeMC3] = useState(0)
    const [timeMC4,setTimeMC4] = useState(0)
    const btnCoin = (event) =>{
        setCoinAmount(coinAmount + Number(event.target.value))
    }
    const btnRunMC = (event) =>{
        const newDate = new Date()
        const date = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        const time = newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
        const datetime = year + '/' + month + '/' + date + ':' + time;
        if(coinAmount >= 1){
            setMachineNumber(event.target.value)
            setStartDate(datetime)
            setCoinAmount(coinAmount - 1)
            if(event.target.value == 1){
                setTimeMC1(Number(60))
            }
            else if(event.target.value == 2){
                setTimeMC2(Number(60))
            }
            else if(event.target.value == 3){
                setTimeMC3(Number(60))
            }
            else if(event.target.value == 4){
                setTimeMC4(Number(60))
            }
        }
    }
    useEffect(()=>{
        Axios.post('https://mean-laundromat-be.herokuapp.com/setmchistory',{
            start_datetime: start_datetime,
            machine_number: machine_number
        }).then(() =>{
            setMcHistory([
                ...mcHistoryList,{
                    start_datetime: start_datetime,
                    machine_number: machine_number
                }
            ])
        })
    },[timeMC1,timeMC2,timeMC3,timeMC4])

    return (
        <div className="container">
            <div className="mb-3">
                <p>Start datetime : {start_datetime}</p>
                <p>Machine number : {machine_number}</p>
                <p>Coin Amount : {coinAmount}</p>
                <button className=" btn btn-primary" type="submit" value="1" onClick={btnCoin}>Coin 1</button>
                <button className=" btn btn-primary" type="submit" value="2" onClick={btnCoin}>Coin 2</button>
                <button className=" btn btn-primary" type="submit" value="5" onClick={btnCoin}>Coin 5</button>
                <button className=" btn btn-primary" type="submit" value="10" onClick={btnCoin}>Coin 10</button>
            </div>
            <div className="mb-3">
                <p>Machine</p>
                <div className="mb-3">
                    <button className=" btn btn-primary" type="submit" value="1" onClick={btnRunMC}>MC 1</button>
                    <label>Running time : <Timer maxTime={timeMC1}/></label>
                </div>
                <div className="mb-3">
                    <button className=" btn btn-primary" type="submit" value="2" onClick={btnRunMC}>MC 2</button>
                    <label>Running time : <Timer maxTime={timeMC2}/></label>
                </div>
                <div className="mb-3">
                    <button className=" btn btn-primary" type="submit" value="3" onClick={btnRunMC}>MC 3</button>
                    <label>Running time : <Timer maxTime={timeMC3}/></label>
                </div>
                <div className="mb-3">
                    <button className=" btn btn-primary" type="submit" value="4" onClick={btnRunMC}>MC 4</button>
                    <label>Running time : <Timer maxTime={timeMC4}/></label>
                </div>
            </div>
            <div>
                <button className="btn btn-success" onClick={getMcHistory}>Show Machine history</button>
            </div>
            {mcHistoryList.map((val, key) =>{
                return(
                    <div className="mb-3">
                        <p className="card-text">Start Time : {val.start_datetime}</p>
                        <p className="card-text">Machine Number : {val.machine_number}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default App;