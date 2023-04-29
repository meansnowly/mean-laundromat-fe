import {useState, useEffect} from "react";
function Timer({maxTime}){
    const [counter, setCounter] = useState(maxTime)
    const [statusMC, setStatusMC] = useState("Available")
    useEffect(()=>{
        if (counter > 0){
            setTimeout(()=>setCounter(counter-1), 1000)
        }
        else if(counter == 0){
            setStatusMC("Available")
        }
    },[counter])

    useEffect(()=>{
        setCounter(maxTime)
        if(maxTime > 0){
            setStatusMC("Running")
        }
    },[maxTime])
    return(
        <span>
            {counter} Status : {statusMC}
        </span>
    );
}

export default Timer