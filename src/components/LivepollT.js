import React from 'react'
import './LivepollT.css';
import { useState,useEffect } from 'react'


function LivepollT() {
    
    const currentPathName = window.location.pathname;
    const lobbyuuid = currentPathName.slice(11);

     const [polldes, setItems] = useState([]);
     const [lobbydes, setTritems] = useState([]);
    


    

    useEffect(() => {
        fetch("/bobs", {method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res) => res.json())
        .then((ret) => {
          console.log(ret);
           setItems(ret.myitem);

          console.log(polldes);
        })
    }, []);

    useEffect(()=>{
        fetch("/ross",{method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res)=>res.json())
        .then((rte)=>{
            console.log(rte);
           setTritems(rte.myitem[0]);

          console.log(lobbydes);
        })
    },[]);

    return (
        <div className='actuallythepage'>
            <div className='ice'>
                <div className='poltle'>
                    <h1>Poll Title: {lobbydes.lobbyName}</h1>
                    <h2>Poll description: {lobbydes.lobbyDescription}</h2>
                </div>
                {polldes.map((lob)=>(
                <div className='quests' key={lob}>
                    <div className='question'>
                        <h3>{lob.pollQuestion}</h3>
                    </div>
                    {lob.pollOption.map((oop)=>(
                    <>{oop.optionValue == "" &&(
                        <></>
                    )}
                    {!oop.optionValue == "" &&(
                    <>
                    <div className='options'>
                        <h3>{oop.optionValue}</h3>
                    </div>
                        <div className='vote'>
                        Votes = ''
                        </div>
                        </>
                        )}
                        </>    
                        ))}
                    
                </div>))}
            </div>
            <div className='fire'>
                <h1>stats?</h1>
            </div>
        </div>
    )
}

export default LivepollT
