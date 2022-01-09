import {useEffect,useState}  from 'react'
import './PollStu.css';
import Popup from './Popup'
import { GoogleLogin } from 'react-google-login';
import M from "materialize-css";


function PollStu() {
    const [timedPopup, setTimedPopup] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const currentPathName = window.location.pathname;
    const lobbyuuid = currentPathName.slice(9);
    const [polldes, setItems] = useState([]);
    const [lobbydes, setTritems] = useState([]);
    const [check, setBitems] = useState([]);    
    
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
				console.log("DATA retrieved from token")
                console.log(data);
                setUserInfo(data);
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
			console.log(err);
		}
	};
    const responseGoogle = async (response) => {
        
        console.log(response);
        const mail=response.profileObj.email
        const name=response.profileObj.name
        const givenName=response.profileObj.givenName
        console.log(mail);
        console.log(name);
        console.log(givenName);
        if (
			!mail ||
			!name ||
			!givenName 
		) {
			console.log("Please fill all the credentials");
		} else {
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
				console.log("USER REGISTRATION FAILED");
			} else if (res.status === 200 || res.status === 201) {
                window.alert("SUCCESSFULLY LOGGED IN")
                setTimedPopup(false);
                suserd()
				console.log("ZA WARUDOO!!!!");
			} 
            else if(res.status === 422)
                {
                window.alert("USER DOES NOT EXSIST")
				console.log("Invalid User Creation");
			}
            else
            {
                window.alert("INVALID USER")
            }
		}
	};
    const responseeGoogle = async (response) => {
        
        console.log(response);
        const mail=response.profileObj.email
        const name=response.profileObj.name
        const givenName=response.profileObj.givenName
        console.log(mail);
        console.log(name);
        console.log(givenName);
        if (
			!mail ||
			!name ||
			!givenName 
		) {
			console.log("Please fill all the credentials");
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
				console.log("USER REGISTRATION FAILED");
			} else if (res.status === 200 || res.status === 201) {
                window.alert("SUCCESSFULLY SIGNED UP")
                document.getElementByclassName("sign").style.display="none";
				console.log("ZA WARUDOO!!!!");
                
			} 
            else if(res.status === 422)
            {
                window.alert("USER ALREADY EXISTS");
            }
            else {
				console.log("Invalid User Creation");
			}
		}
	};
    var usern = userInfo.name;
	console.log('variable',usern);
    console.log('data',userInfo.mail);
    useEffect(()=>
    {
        suserd();
    },[])

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

    useEffect(()=>{
        fetch("/check",{method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res)=>res.json())
        .then((rat)=>{
            console.log(rat.myitem[0].close);
        setBitems(rat.myitem[0].close);

        console.log(check);
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
              usern
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                M.toast({ html: data.error });
              } else {
                console.log("value")
                M.toast({
                  html: "Successfully Updated!",
                  classes: "#2e7d32 green darken-3",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
    }

    return (
        <div className='actuallythepage'>
            {check == true &&(
                            <h3>this room is no longer accepting responses</h3>
            )}
            {check == false &&(
            <>                  
            <div className='ice2'>
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
                        <div id= "catrina">
                            <div className= "options" >
                                <input type="radio" value={oop.optionValue} name={lob.pollQuestion} id="gywshb" 
                                onClick={()=>selectthis(lob._id,oop._id)}
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
            <Popup id="popup" trigger={timedPopup} setTrigger={setTimedPopup}>
                <h3>SIGN UP OR LOGIN TO CONTINUE</h3>
                <GoogleLogin id="log" className="log"  
                            clientId="399611436919-fo4n24pr7bpmslat5vamj5u8rc5q0v6f.apps.googleusercontent.com"
                            buttonText="LOGIN IN"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            color="primary"
                        />
                <GoogleLogin id="sign" className="sign"  
                            clientId="399611436919-fo4n24pr7bpmslat5vamj5u8rc5q0v6f.apps.googleusercontent.com"
                            buttonText="SIGN UP"
                            onSuccess={responseeGoogle}
                            onFailure={responseeGoogle}
                            cookiePolicy={'single_host_origin'}
                            color="primary"
                        />
            </Popup></>
            )}
        </div>
    )
}



export default PollStu
