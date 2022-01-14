import React from 'react'
import './LivepollT.css';
import { useState,useEffect } from 'react';
import io from 'socket.io-client';

let socket;

function LivepollT() {
    
    const currentPathName = window.location.pathname;
    const lobbyuuid = currentPathName.slice(11);

    const [polldes, setItems] = useState([]);
    const [lobbydes, setTritems] = useState([]);
    const [users, setUsers] = useState([]);
    const [polls, setPolls] = useState([]);
    const [pain, setpain] = useState(0)
    const [spain, setspain] = useState(0)
    const data = {name:'teacher'};
    const ENDPOINT = 'localhost:5000';
    
    
      
    

    useEffect(()=>{
        socket = io(ENDPOINT)
        socket.emit('join',{data,lobbyuuid},(error)=>{
            if(error){alert(error);}
        });    
        return()=>{
            socket.emit('disconnect');
            socket.off();
        }
        
    },[ENDPOINT, lobbyuuid])
    
    useEffect(() => {
        socket.on("LobbyData", ({ users }) => {
          console.log(users)  
          setUsers(users);
          
        });
        socket.on("PollData", ({ poll }) => {
            console.log(poll[0].option[0].votes)
            setPolls(poll);
            
          });
    }, []);



    useEffect(() => {
        fetch("/bobs", {method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res) => res.json())
        .then((ret) => {
          console.log(ret);
          socket.emit('polls',{ret,lobbyuuid},(error)=>{
            if(error){alert(error);}
          });
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
   // console.log(users[0])
    console.log(pain);
    return (
        <div className='actuallythepage'>
            <div className='ice'>
                <div className='poltle'>
                    <h1>Poll Title: {lobbydes.lobbyName}</h1>
                    <h2>Poll description: {lobbydes.lobbyDescription}</h2>
                </div>
                {polls.map((lob, x)=>(
                <div className='quests' key={lob}>
                    <div className='question1'>
                        <h3>{x+1}. {lob.question}</h3>
                    </div>
                    {lob.option.map((oop, y)=>(
                    <>{oop.value == "" &&(
                        <></>
                      )}
                      {!oop.value == "" &&(
                      <>
                      <div className='opt'>
                          <h3>{y+1}. {oop.value}</h3>
                      </div>
                          
                            <div className='vote'>
                            <h1>{oop.votes}</h1>
                            </div>
                          
                      </>
                    )}
                    </>    
                    ))}
                    
                </div>))}
            </div>
            <div className='fire'>
                <h1>stats?</h1>
                {
                users
                    ? (
                    <div>
                        <h1>People currently votting:</h1>
                        <div className="activeContainer">
                        <h2>
                            {users.map((usa) => (
                                <div key={usa}>
                                    <div className="activeItem">
                                            {usa.name=='teacher'?<div></div>:
                                            <div>
                                                <h1>{usa.name}</h1>
                                                {usa.poll.map((texas)=>(
                                                    <div key={texas}>
                                                        <h2>{texas.question}</h2>
                                                        <h3>{texas.option}</h3>
                                                    </div>
                                                ))}
                                            </div>}
                                    </div>
                                </div>
                            ))}
                        </h2>
                        </div>
                    </div>
                    )
                    : null
                }
            </div>
        </div>
    )
}

export default LivepollT
