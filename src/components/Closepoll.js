import React from 'react'
import './Closepoll.css';
import { useState,useEffect } from 'react'
import { Button,makeStyles,Dialog,DialogTitle,DialogActions,TextField,DialogContent,DialogContentText, rgbToHex } from '@material-ui/core';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import './Nav.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import zIndex from '@material-ui/core/styles/zIndex';
import { maxWidth } from '@mui/system';
import { VictoryBar, VictoryChart, VictoryAxis,VictoryTheme,VictoryScatter,VictoryLabel } from 'victory';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const  useStyles = makeStyles({
    main:{
        boxSizing:"border-box",
        fontFamily: "Roboto,Arial,sans-serif",
        textTransform:"capitalize",
        position:"fixed",
        zIndex:"10",
        top:"0",
        left:"0",
        right:"0",
        backgroundColor:"whitesmoke",
        boxShadow:"0 5px 10px rgba(0,0,0,.1)",
        padding:"0px 2%",
        display:"flex",
        alignItems:"center",
        height:"10vh",
        width:"100vw",
        justifyContent:"space-between",
        '& a':{
            textDecoration:"none",
        },
        '& #toggle':{
            display:"none",
        },
        '& label':{
            display:"none",
        },
        '& nav':{
            '& ul':{
                listStyle:"none",
                '& li':{
                    position:"relative",
                    float:"left",
                    
                    '& ul':{
                        position:"absolute",
                        boxShadow:"0 5px 10px rgba(0,0,0,.1)",
                        left:"0",
                        width:"200px",
                        backgroundColor:"whitesmoke",
                        display:"none",
                        '& li':{
                            width:"100%",
                            borderTop: "1px solid rgba(0,0,0,.1)",
                        },
                        
                    },
                    '&:hover':{
                        '& ul':{
                            display:"initial",
                        }
                    },
                    '&:focus-within':{
                        '& ul':{
                            display:"initial",
                        }
                    },
                    '& a':{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        padding:"3vh",
                        color:"#333",
                        '&:hover':{
                            color:"#f4511e",
                        }
                    }
                }
            }
        },
        ["@media(max-width: 650px)"]: {
            '& label':{
                display:"initial",
                zIndex:"100",
            },
            
            '& nav':{
                position:"absolute",
                top:"100%",
                left:"0",
                right:"0",
                backgroundColor:"whitesmoke",
                borderTop:"1px solid rgba(0,0,0,.1)",
                display:"none",
                '& ul':{
                    '& li':{
                        width:"100%",
                        borderBottom:"1px solid rgba(0,0,0,.1)",
                        '& ul':{
                            position:"relative !important",
                            width:"100vw !important",
                        },
                        
                    },
                    '&.div':{
                        height:"2px",
                        color:"green",
                    },
                }
            },
             
    },
    },
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
        ["@media(max-width: 700px)"]: {
            width:"100%"
        }
    },
    head:{
        width:"40%",marginLeft:"2%",display:"flex",alignItems:"center",justifyContent:"flex-end",
        position:"absolute",right:"0",top:"7vh",
        ["@media(max-width: 700px)"]: {
            position:"relative",
            top:"0",
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
    let navigate = useNavigate();
    const createid=uuidv4();
    const [userInfo, setUserInfo] = useState({});
    const [polldes, setItems] = useState([]);
    const [lobbydes, setTritems] = useState([]);
    const [checked, setChecked] = useState(false);
    const [sum,setSum] = useState([]);
    const[datas,setDatas]=useState([
       { x:"",y:"",label:""}
    ]);
    var anotherVar;
    const userd = async () => {
        try {
              const res = await fetch("/userdata", {
                  method: "GET",
                  headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                  },
                  credentials: "include",
              });
              const data = await res.json();      
              if (res.status === 200 || res.status===201) {

                  setUserInfo(data);
          }
          else if (res.status === 422) {
        
          }
                else
                {
                   
                }
        } catch (err) {
         
        }
      };
      
      useEffect(()=>{
        userd();
      },[])
      var usern = userInfo;
    
      var userIds = usern._id;

      function toggle(value){
        return !value;
      }
      function navicon() {
        navigate('/vpoll/');
    }
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (e) => {
      e.preventDefault();
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [Lobby, setLobby] = useState({
        lobbyId:createid,
        lobbyName:"",
        lobbyDescription:"",
        studentformId:[],
        pollId:[],
        userId:"",
    });
    let name, value;
    const handleInputs = (e) => {
		name = e.target.name;
		value = e.target.value;
		setLobby({ ...Lobby, [name]: value });
	};
    const Lob = async(e)=>{
        var lobs = {...Lobby};
        lobs.userId = userIds;
        setLobby(lobs);
        Lobby.userId = userIds;
        if(Lobby.lobbyName=="" || Lobby.lobbyDescription==""){
            window.alert("Please enter all the details");
        }
        else{
            
            const{lobbyId,lobbyName,lobbyDescription,studentformId,pollId,userId} = Lobby;
            const res = await fetch("/createnewlobby", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({lobbyId,lobbyName,lobbyDescription,studentformId,pollId,userId})
            })
            const data= await res.json();
			if (res.status === 400 || !data) {
                window.alert("Lobby Creation Failed");
			} else if (res.status === 200 || res.status === 201) {
                window.alert("Lobby Created Successfully");
			} 
            navigate("/poll/"+Lobby.lobbyId);
        }
    } 

    const downloadd=()=> 
    {
        
        
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
           setItems(ret.myitem);
           console.log(polldes);
            let vederichi=[] 
            for(var r=0;r<ret.myitem.length;r++){
                let arri=0
                for(var s=0;s<ret.myitem[r].pollOption.length;s++){
                   if(ret.myitem[r].pollOption[s].optionValue!==""){
                    arri+=ret.myitem[r].pollOption[s].optionArray.length;
                    }
                }
                vederichi.push(arri);
            }
           console.log("arri",vederichi);
           setSum(vederichi); 
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
           
           setTritems(rte.myitem[0]);
        
        })
    },[]);

    const excel = async () =>{
        const res = await fetch("/excel", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                 giorno:polldes,
                 dio:lobbydes,
            }),
            
        });
        const data= await res.json();
        if (res.status===200||res.status===201)
        {
            
            fetch("/download/"+lobbyuuid+"/"+lobbydes.lobbyName,{
                method:"GET",
                headers: {},            
            })
            window.open('/download/'+lobbyuuid+"/"+lobbydes.lobbyName);
        }

    }
    function viewpoll(e){
        e.preventDefault();
        navigate("/vpoll/");
    }
    return (
        <div className='actuallythepage'>
             <header className={classes.main}>
             <a href="#" style={{display:"flex",color:"#f4511e"}}><ArrowBackIosIcon style={{cursor:"pointer"}} fontSize='medium' onClick={navicon}/><h2 onClick={navicon}>BACK</h2></a>
               <input type="checkbox" name="toggle" id="toggle" checked={checked}onChange={e => setChecked(toggle)}/>
               <label for="toggle">{!checked?<MenuIcon/>:<CloseIcon/>}</label>
               <nav className="checks">
                   <ul>
                       <li><a href="#" onClick={(e)=>{viewpoll(e)}}>Dashboard</a></li>
                       <li><a href="#" onClick={(e)=>{handleClickOpen(e)}}>Create New Lobby <AddCircleOutlineIcon/></a></li>
                   </ul>
                </nav>
            </header>
            <Dialog open={open} TransitionComponent={Transition}
        keepMounted onClose={handleClose}>
                  <DialogTitle>Create New LOBBY</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                    <TextField sx={{width:"30em"}} name="lobbyName" value={Lobby.lobbyName} autoFocus margin="dense" id="name" label="Enter Lobby Name" type="text" fullWidth variant="standard" onChange={handleInputs}/>
                    <TextField 	name="lobbyDescription"	value={Lobby.lobbyDescription}margin="dense" id="outlined-multiline-static" label="Lobby Description" type="text" fullWidth  multiline rows={2} onChange={handleInputs}/>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button className={classes.cpoll} onClick={handleClose} >Cancel</Button>
                    <Button className={classes.cpoll} onClick={Lob}>Create</Button>
                  </DialogActions>
                </Dialog>
            <div className='ice'>
                <div className={classes.poltle}>
                <div className='header' >
                    <h1 className='lobby'>Lobby Title: {lobbydes.lobbyName}
                    <span>Lobby Description: {lobbydes.lobbyDescription}</span></h1>
                    </div>
                <div className={classes.head}>
                <Button className={classes.download} startIcon={<DownloadIcon/>} onClick={downloadd}>DOWNLOAD RESPONSES</Button>
            </div>
                    </div>
                <div style={{display:"flex",width:"100%",flexWrap:"wrap",alignItems:"center",justifyContent:"space-around"}}>
           {polldes.map((lob, x)=>(
                    <div className='quests' key={lob}>
                         <h2 className='question1l'>{x+1}. {lob.pollQuestion}</h2>
                         <VictoryChart height={200} domainPadding={{ x: 20 }} theme={VictoryTheme.material}>
                         {lob.pollOption.map((oop,y)=>(
                             <VictoryAxis
                             fixLabelOverlap={true}
                             label="Options"
                             style={{
                                axis: { stroke: "#f4511e" }, 
                                axisLabel: {
                                fontFamily: "inherit",
                                fontWeight: 100,
                                letterSpacing: "1px",
                                fill: "#f4511e",
                                fontSize: 12
                            },
                              grid: { stroke: "rgb(244, 80, 30,0.2)"},
                              tickLabels: {
                                fontFamily: "inherit",
                                fontWeight: 100,
                                fill:"#333",
                                fontSize: 10
                              }
                            }}
                             tickValues={[y+1]}
                             tickFormat={[lob.pollOption[y].optionValue.substring(0, 8)]}
                             axisLabelComponent={<VictoryLabel dy={18} />}
                           />
                            ))} 
                            <VictoryAxis
                            dependentAxis
                            label="No. Of Votes"
                            style={{
                                axis: { stroke: "#f4511e" }, 
                                axisLabel: {
                                  fontFamily: "inherit",
                                  fill: "#f4511e"
                                },
                                grid: { stroke: "rgb(244, 80, 30,0.5)"},
                                tickLabels: {
                                  fontFamily: "inherit",
                                  fill: "#333",
                                  fontSize:10
                                }
                             }}
                            tickFormat={(x) => (`${x*1}`)}
                            axisLabelComponent={<VictoryLabel dy={-28} />}
                            />       
                         {lob.pollOption.map((oop,y)=>( 
                                       
                                 <VictoryBar 
                                 style={{ labels: { fill: "white" } }}
                                 barRatio={2}
                                 data={[{x:parseInt(y+1),y:parseInt(oop.optionArray.length)}]}
                                 style={{
                                    parent: {border: '1px solid black',fontSize:'2px'},
                                   
                                    data: {
                                        fill: ({ datum }) => datum.x === 1 ? "#328fa5" : datum.x === 2 ? "#f54967" : datum.x === 3 ? "#af7c4c" : datum.x === 4 ? "#534caf" : "#4caf50",
                                       
                                      },
                                  }}
                                 />                               
                         ))}
                       
                     </VictoryChart> 
                     </div>
                 ))}   
            </div> 
            </div>
           
        </div>
    )
}

export default Closepoll
