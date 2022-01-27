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
    const currentPathName = window.location.pathname;
    const lobbyuuid = currentPathName.slice(9);
    const [polldes, setItems] = useState([]);
    const [lobbydes, setTritems] = useState([]);
    const [check, setBitems] = useState(Boolean);
    const ENDPOINT = ' https://pollapp281907.herokuapp.com/';
    const link="https://pollapp281907.herokuapp.com/"


    
    const suserd = async () => {
        const test=localStorage.getItem("sjwt");
            console.log(test);
		try {
			const res = await fetch(`${link}suserdata`, {
				method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("sjwt"),
                  }
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
		} else {
			const res = await fetch(`${link}slogin`, {
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
			const res = await fetch(`${link}/su`, {
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
        fetch(`${link}bobs`, {method: "POST",
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
        fetch(`${link}ross`,{method:"POST",
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
        fetch(`${link}check`,{method:"POST",
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
        fetch(`${link}select`, {
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
        fetch(`${link}check`,{method:"POST",
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
                    <h1>{lobbydes.lobbyName}</h1>
                    <h2>{lobbydes.lobbyDescription}</h2>
                </div>
                {polldes.map((lob,x)=>(
                <div className='questsp' key={lob}>
                    <div className='questionp'>
                        <h1>{x+1}. {lob.pollQuestion}</h1>
                    </div>
                    {lob.pollOption.map((oop)=>(
                        <>{oop.optionValue == "" &&(
                            <></>
                        )}
                        {!oop.optionValue == "" &&(
                        <div id= "catrina">
                            <div className= "optionsp" >
                                <input type="radio" value={oop.optionValue} name={lob.pollQuestion} id="gywshb" 
                                onClick={()=>nowdigonthis(lob._id,oop._id,lob.pollQuestion,oop.optionValue)}
                                ></input>
                                <h3 id="muda">{oop.optionValue}</h3>
                            </div>
                        </div>
                        )}
                        </>    
                        ))}
                </div>
                ))}
                
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
