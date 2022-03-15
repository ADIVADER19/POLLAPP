import {useEffect,useState}  from 'react'
import './PollStu.css';
import Popup from './Popup';
import { GoogleLogin } from 'react-google-login';
import {makeStyles} from '@material-ui/core'
import M from "materialize-css";
import io from 'socket.io-client';

let socket;
const useStyles=makeStyles({
    pops:{
        backgroundColor:"whitesmoke"
    },
    log:{
        width:"30%",
        marginLeft:"2%",
    },
    sign:{
        width:"30%",
        marginLeft:"2%",
    },   
});
function PollStu() {
    const [timedPopup, setTimedPopup] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const currentPathName = window.location.href;
    const lobbyuuid = currentPathName.slice(currentPathName.indexOf('pollstu'),-1);;
    console.log(lobbyuuid);
    const subexist=lobbyuuid.includes('s');
    console.log(subexist);
    let subject = '';
    if(subexist){
        subject = lobbyuuid.splice('s',-1);
        console.log(subject);
    }
    const [polldes, setItems] = useState([]);
    const [lobbydes, setTritems] = useState([]);
    const [check, setBitems] = useState(Boolean);
    const ENDPOINT = 'localhost:2000';
    
    


    
    const suserd = async () => {
		try {
			const res = await fetch("/suserdata", {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			const data = await res.json();
		

			if (res.status === 200) {
                setUserInfo(data);
                
                socket.emit('join',{data,lobbyuuid},(error)=>{
                    if(error){alert(error);}
                });
			}
            else if (res.status === 422) {
                setTimeout(()=>{
                    setTimedPopup(true);
                },1000);
            }
            else
            {
                setTimeout(()=>{
                    setTimedPopup(true);
                },1000);
            
            }
		} catch (err) {
		}
	};
    const responseGoogle = async (response) => {
        
        const mail=response.profileObj.email
        const name=response.profileObj.name
        const givenName=response.profileObj.givenName

        if (
			!mail ||
			!name ||
			!givenName 
		) {
		}
        else if(subexist){
            console.log(subject);
        }
        else {
			const res = await fetch("/slogin", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
                    mail,
                    name,
                    givenName,
				}),
			});
            const data= await res.json();
			if (res.status === 400 || !data) {
                window.alert('Something went wrong')
			} else if (res.status === 200 || res.status === 201) {
                window.alert("SUCCESSFULLY LOGGED IN")
                setTimedPopup(false);
                suserd()
			} 
            else if(res.status === 422)
                {
                window.alert("USER DOES NOT EXSIST")
			}
            else
            {
                window.alert("INVALID USER")
            }
		}
	};
    const responseeGoogle = async (response) => {
        
        const mail=response.profileObj.email
        const name=response.profileObj.name
        const givenName=response.profileObj.givenName
    
        if (
			!mail ||
			!name ||
			!givenName 
		) {
		} else {
			const res = await fetch("/su", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
                    mail,
                    name,
                    givenName,
				}),
			});
            const data= await res.json();
			if (res.status === 400 || !data) {
                window.alert('Something went wrong')
			} else if (res.status === 200 || res.status === 201) {
                window.alert("SUCCESSFULLY SIGNED UP")
                document.getElementByclassName("sign").style.display="none";
                
			} 
            else if(res.status === 422)
            {
                window.alert("USER ALREADY EXISTS");
            }
            else {
			}
		}
	};
    var usern = userInfo.name;
    useEffect(()=>
    {
        suserd();
    },[])

    useEffect(()=>{
        socket = io(ENDPOINT)
        return()=>{
            socket.emit('disconnect');
            socket.close();
        }
        
    },[ENDPOINT, lobbyuuid])

const socker=(question,option)=>{
    socket.emit('sendPoll', {lobbyuuid,question,option,usern}, (error) => {
        if(error) {
            alert(error);
        }
    })
}      

    const polls =(() => {
        fetch("/bobs", {method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res) => res.json())
        .then((ret) => {
        setItems(ret.myitem);
        socket.emit('polls',{ret,lobbyuuid},(error)=>{
            if(error){alert(error);}
        });
        })
    });

    const lobby =(()=>{
        fetch("/ross",{method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res)=>res.json())
        .then((rte)=>{
        setTritems(rte.myitem[0]);
        })
    });

    useEffect(()=>{
        fetch("/check",{method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res)=>res.json())
        .then((rat)=>{
            setBitems(rat.myitem[0].close);
            if(rat.myitem[0].close){
                return;
            }
            else{
                lobby()
                polls()
            }
        })
    },[])

    const selectthis=(puid,opuid)=>{
        fetch("/select", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              puid,
              opuid,
              usern,
              data:lobbyuuid
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                M.toast({ html: data.error });
              } else {
                M.toast({
                  html: "Successfully Updated!",
                  classes: "#2e7d32 green darken-3",
                });
              }
            })
            .catch((err) => {
            });
    }

    const classes=useStyles();
    
    const nowdigonthis=(puid,opuid,question,option)=>{
        fetch("/check",{method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res)=>res.json())
        .then((rat)=>{
            if(!rat.myitem[0].close){
                selectthis(puid,opuid);
                socker(question,option);
            }    
            else{
                window.alert("POLL HAS BEEN CLOSED");
            }
            })
    }

    return (
        
        <div className='actuallythepagep'>
            {check == true &&(
                            <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",padding:"1%",marginTop:"20%"}}>
                                <div className='endp'><h1>This room is no longer accepting responses</h1></div>
                            </div>
            )}
            {check == false &&(
            <>                  
            <div className='ice2p'>
                <div className='poltlep'>
                <div className='header' >
                    <h1 className='lobby'>Lobby Title: {lobbydes.lobbyName}
                    <span>Lobby Description: {lobbydes.lobbyDescription}</span></h1>
                    </div>
                </div>
                <div className='styles'></div>
                    <div class="triangle-right"></div>
                    <div className="triangle-left"></div>
                <div className='polldiv'>
                {polldes.map((lob,x)=>(
                <div className='questsp' key={lob}>
                    {/* <div className='questionp'>
                        <h1>{x+1}. {lob.pollQuestion}</h1>
                    </div> */}
                    <div className='shapes'></div>
                    <h2 className='sequence'>{x+1}</h2>
                    <h2 className='question1l'>{lob.pollQuestion}</h2>
                    {lob.pollOption.map((oop)=>(
                        <>{oop.optionValue == "" &&(
                            <></>
                        )}
                        {!oop.optionValue == "" &&(
                        <div id= "catrina" className='viki'>
                            <div className= "optionsp" >
                                <input type="radio" value={oop.optionValue} name={lob.pollQuestion} id="gywshb" 
                                onClick={()=>nowdigonthis(lob._id,oop._id,lob.pollQuestion,oop.optionValue)}
                                ></input>&nbsp;
                                <h3 id="muda">{oop.optionValue}</h3>
                            </div>
                        </div>
                        )}
                        </>    
                        ))}
                </div>
                ))}
                </div>
            </div>
            <Popup className={classes.pops} id="popup" trigger={timedPopup} setTrigger={setTimedPopup}>
                <h3 align="center" className={classes.poptit}>SIGN UP OR LOGIN TO CONTINUE</h3>
                <div style={{display:"flex",width:"100%",alignItems:"center",justifyContent:"center"}}>
                <GoogleLogin id="log" className={classes.log}  
                            clientId="399611436919-fo4n24pr7bpmslat5vamj5u8rc5q0v6f.apps.googleusercontent.com"
                            buttonText="LOGIN IN"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            color="primary"
                        />
                   <GoogleLogin id="sign" className={classes.sign} 
                            clientId="399611436919-fo4n24pr7bpmslat5vamj5u8rc5q0v6f.apps.googleusercontent.com"
                            buttonText="SIGN UP"
                            onSuccess={responseeGoogle}
                            onFailure={responseeGoogle}
                            cookiePolicy={'single_host_origin'}
                            color="primary"
                        />
                </div>
            </Popup></>
            )}
        </div>
    )
}



export default PollStu
