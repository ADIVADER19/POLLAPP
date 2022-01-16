import React from 'react'
import './Closepoll.css';
import { useState,useEffect } from 'react'

function Closepoll() {

    const currentPathName = window.location.pathname;
    const lobbyuuid = currentPathName.slice(11);

    const [polldes, setItems] = useState([]);
    const [lobbydes, setTritems] = useState([]);

    const downloadd=()=> 
    {
        
        console.log('clicked')
        excel();
    
    }
    
    useEffect(() => {
        fetch("/bobs", {method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res) => res.json())
        .then((ret) => {
          console.log(ret.myitem[0].pollOption);
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
    const giorno=polldes
    const dio= lobbydes
    console.log('giorno',giorno)
    console.log('dio',dio)
    const lname=dio.lobbyName
    const lid=dio.lobbyId
    console.log(lname)
    console.log(lid)
    const excel = async () =>{
        console.log(dio)
        const res = await fetch("/excel", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                 lname:lobbydes.lobbyName,
                 lid:lobbydes.lobbyId,
                 giorno:polldes,
                 dio:lobbydes,
            }),
            
        });
        const data= await res.json();
        if (res.status===200||res.status===201)
        {
            console.log('success');
            fetch("/download",{
                method:"GET",
                headers: {},            
            })
            window.open('/download?foo=bar&xxx=yyy');
        }

    }

    return (
        <div className='actuallythepage'>
            <div className='ice'>
                <div className='poltle'>
                <h1>Poll Title: {lobbydes.lobbyName}</h1>
                    <h2>Poll description: {lobbydes.lobbyDescription}</h2>
                </div>
                {polldes.map((lob, x)=>(
                <div className='quests' key={lob}>
                    <div className='question'>
                        <h3>{x+1}. {lob.pollQuestion}</h3>
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
                                Votes = '{oop.optionArray.length}'
                            </div>
                        </>
                        )}
                        </>    
                        ))}
                </div>
                ))}
                
            </div>
            <div className='fire'>
                <h1>stats?</h1>
                <button onClick={downloadd}>CLICK ME</button>
            </div>
        </div>
    )
}

export default Closepoll
