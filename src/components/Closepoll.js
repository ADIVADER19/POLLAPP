import React from 'react'
import './Closepoll.css';
import { useState,useEffect } from 'react'
import { Button,makeStyles } from '@material-ui/core';
import DownloadIcon from '@mui/icons-material/Download';
const  useStyles = makeStyles({
    poltle:{
        display:"flex",
        width:"100%",
        marginBottom:"2%",
        flexWrap:"wrap",
        '& h1':{
            fontWeight:"normal",
            fontStyle:"3em"
        },
        '& h2':{
            fontWeight:"normal",
            fontStyle:"2em"
        }
    },
    hea:{
        width:"50%",marginLeft:"2%",
        ["@media(max-width: 500px)"]: {
            width:"100%"
        }
    },
    head:{
        width:"40%",marginLeft:"2%",display:"flex",alignItems:"center",justifyContent:"flex-end",
        ["@media(max-width: 500px)"]: {
            width:"100%",
            alignItems:"center",justifyContent:"center",
        }
    },
    download:{
        background:"DodgerBlue",
        color:"white",
        fontFamily: "Roboto,Arial,sans-serif",
        marginRight:"1%",
        border:"1px solid RoyalBlue",
        "&:hover":{
          background:"RoyalBlue",
          border:"1px solid DodgerBlue",
      },
      ['@media (max-width:400px)']: {
        fomtSize:"1em",
      }
    },
})
function Closepoll() {
    const classes=useStyles();
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
                <div className={classes.poltle}>
                <div className={classes.hea}>
                    <h1 style={{marginBottom:"1%"}}>{lobbydes.lobbyName}</h1>
                    <h2 style={{marginBottom:"1%"}}>{lobbydes.lobbyDescription}</h2>
                </div>
                <div className={classes.head}>
                <Button className={classes.download} startIcon={<DownloadIcon/>} onClick={downloadd}>DOWNLOAD RESPONSES</Button>
            </div>
                    </div>
                <div style={{display:"flex",width:"100%",flexWrap:"wrap",alignItems:"center",justifyContent:"space-around"}}>
                {polldes.map((lob, x)=>(
                <div className='quests' key={lob}>
                    <div className='question'>
                        <h1>{x+1}. {lob.pollQuestion}</h1>
                    </div>
                    {lob.pollOption.map((oop,y)=>(
                        <>{oop.optionValue == "" &&(
                            <></>
                        )}
                        {!oop.optionValue == "" &&(
                        <>
                            <div className='opt'>
                          <h2>{y+1}. {oop.optionValue}</h2>
                          <h3>{oop.optionArray.length} votes</h3>
                      </div> 
                        </>
                        )}
                        </>    
                        ))}
                </div>
                ))}
               </div> 
            </div>
            
        </div>
    )
}

export default Closepoll
