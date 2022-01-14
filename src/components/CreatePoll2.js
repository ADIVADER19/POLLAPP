import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useState,useEffect  } from 'react';
import {Typography,Dialog,AppBar,Toolbar} from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import Slide from '@mui/material/Slide';
import './CreatePoll.css';
import './Nav.css';
import { useNavigate } from 'react-router';
import PollIcon from '@material-ui/icons/Poll';
import MenuIcon from '@mui/icons-material/Menu';
const  useStyles = makeStyles({
    root:{
        margin:"0",
        padding:"0",
    },
    add_poll:{
        width:"55vw",
        height:"80vh",
        display: "flex",
        flexDirection: "column",
        paddingTop:"5%",
        padddingBottom:"5%",
        borderRadius:"3%",
        ['@media (max-width:780px)']: {
            width:"100vw",
          }
    },
    lobbypollsseen:{
        width:"45%",height:"40vh",backgroundColor:"whitesmoke",display:"flex",padding:"2%",flexDirection:"column",alignItems:"flex-start",borderRadius:"1em",
        ['@media (max-width:780px)']: {
            width:"100%",
          }
    },
    question:{
        boxSizing: "border-box",
        fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
        fontSize: 30,
        fontweight: 400,
        lineHeight: "40%",
        border:"2px solid #323232",
        outline:"none",
        color:"#f4511e",
        padding:"1%",
        borderRadius:"7px",
        width:"93%",
        marginLeft:"1%",
        background:"#323232 !important",
        "&:focus":{
            borderBottom:"2px solid #f4511e",
            backgroundColor: "white",
        },
    },
    quest:{
        fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
        fontSize: 30,
        fontweight: 400,
    },
    add_question_body:{
        display:"flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom:"2%",
    },
    text_input:{
        outline:"none",
        border:"1px solid #121212",
        borderRadius:"7px",
        width: "100%",
        fontFamily: "Roboto,Arial,sans-serif",
        fontSize: 25,
        fontWeight: 400,
        letterSpacing: ".2px",
        color:"white",
        background:"#323232 !important",
        padding:"1%",
        "&:focus":{
            borderBottom: "1.5px solid #f4511e",
            backgroundColor: "white",
        }
    },
    opt_input:{
    outline:"none",
        border:"none",
        fontFamily: "Roboto,Arial,sans-serif",
        fontSize: 25,
        fontWeight: 400,
        letterSpacing: ".2px",
        color: "#202124",
        width:"20em",
        background:"transparent !important",
        "&:focus":{
            borderBottom: "1.5px solid #f4511e",
            backgroundColor: "white",
        }
    },
    add_border:{
        borderLeft: "6px solid red green blue yellow",
        width: "50%",
        marginLeft: "25% !important"
    },
    blankDiv:{
        backgroundColor: "white",
    },
    radio_input:{
            '&:checked':{
                backgroundColor: "green !important",
            }   
    },
    crtBtn:{
        background:"#678e23",
        color:"white",
        border:"1px solid #51701a",
        '&:hover':{
          background:"#51701a",
          border:"1px solid #678e23",
          color:"white",
        },
        ['@media (max-width:752px)']: {
          width:"100%",
        }
      },
      optBtn:{
          background:"#13708a",
          color:"white",
          border:"1px solid #0c586e",
          "&:hover":{
            background:"#0c586e",
            border:"1px solid #13708a",
        },
        ['@media (max-width:752px)']: {
          width:"100%",
        }
      },
    add_footer:{
        display: "flex",
        alignItems:"cener",
        width:"100%",
        justifyContent:"center",
    },
    add_question_bottom_left:{
        width: "100%",
    },
    main:{
        boxSizing:"border-box",
        fontFamily: "Roboto,Arial,sans-serif",
        textTransform:"capitalize",
        position:"fixed",
        zIndex:"2",
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
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreatePoll2() {
    const [checked, setChecked] = useState(false);
    let navigate = useNavigate();
    function toggle(value){
        return !value;
      }
      function navicon() {
          navigate('/')
      }
      function viewpoll(e){
        e.preventDefault();
        navigate("/vpoll/");
    }
    const currentPathName = window.location.pathname;
    const lobbyuuid = currentPathName.slice(6);
    console.log(lobbyuuid);
    const [polldes, setItems] = useState([]);
     const [lobbydes, setTritems] = useState([]);
     let f = polldes.length+1;
    const [num,setNum]=useState([{value:f}]);
    const classes = useStyles();
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
        fetch("/ross", {method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res) => res.json())
            .then((rte)=>{
                console.log("Hi",rte);
                setTritems(rte.myitem[0]);
                console.log("Hello",lobbydes);
        })
    },[]);
    
    const [opt, setopt] = useState([{
        optionValue:"",
        optionArray:[],
        optionCorrect:false,
    }]);
    const [poll, setPoll] = useState(
        [{
            lobbyUniqueId:lobbyuuid,
            pollQuestion: "",
            pollOption: [
                {optionValue: "",optionArray:[],optionCorrect:false},
                {optionValue: "",optionArray:[],optionCorrect:false},
                {optionValue: "",optionArray:[],optionCorrect:false},
                {optionValue: "",optionArray:[],optionCorrect:false},
                {optionValue: "",optionArray:[],optionCorrect:false},
            ],
        }]
    );
    function ChangePollQuestion(question){
        var newPollQuestion = [...poll];
        newPollQuestion.pollQuestion = question;
        setPoll(newPollQuestion);
        console.log(newPollQuestion);
    }
    function ChangePollOption(option,place){
        var newOption = [...opt];
        newOption[place].optionValue = option;
        setopt(newOption);
        console.log(opt);
    }
    function removeOption(i){
        console.log(i);
        if(i!=0){
        var removeOpt = [...opt];
        removeOpt.splice(i,1);
        setopt(removeOpt);
        console.log(opt);
        }
    }
    function addOption(i){
        console.log(i);
        var j = i+1;
        var addOption = [...opt];
        if(opt.length < 5){
            addOption[i] = [{optionValue: "",optionArray:[],optionCorrect:false}];
        } else{
          console.log("Max  5 options ");  
        }
        setopt(addOption);
        console.log(opt);
      }
    function selectCorrectOption(corOpt,i){
        var selectedOption =[...opt];
        var j = selectedOption.length;
        console.log(j);
        for(let k = 0;k<j;k++){
            if(k==i){
                selectedOption[i].optionCorrect=true;
            }
            else{
                selectedOption[k].optionCorrect=false; 
            }
        }
        console.log(opt);
    }
    const CreatePoll = async(e)=>{
        var options = [...opt];
        var question = [...poll];
        console.log(question);
        for(let i=0;i<options.length;i++){
            question[0].pollOption[i].optionValue = options[i].optionValue;
            question[0].pollOption[i].optionCorrect = options[i].optionCorrect;
        }
        console.log(question);
        setPoll(question);
        const pollOption = [{optionValue: "",optionArray:[],optionCorrect:false}]
        for(let j=0;j<5;j++){
            pollOption[j] = poll[0].pollOption[j];
        }
        console.log(pollOption);
        const lobbyUniqueId = poll[0].lobbyUniqueId;
        var pollQuestion = poll.pollQuestion;
        console.log(poll);
        console.log(pollQuestion);
        
        if(options.length<2){
            window.alert("Atleast 2 options required");
        }
        else if(pollQuestion==undefined || options[0].optionValue=="" || options[1].optionValue==""){
            console.log(pollQuestion);
            console.log(options.length);
            window.alert("Please fill all the details");
        }
        else{
            const res = await fetch("/createnewpoll", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({lobbyUniqueId,pollQuestion,pollOption})
            });
            const data= await res.json();
			if (res.status === 400 || !data) {
                window.alert('Poll Creation Failed')
			} else if (res.status === 200 || res.status === 201) {
                window.alert("Poll Created Successfully")
			} 
            var setPollQuestion = [...poll];
            setPollQuestion.pollQuestion = "";
            setPoll(setPollQuestion);
            console.log(poll);
            setopt([{
                optionValue:"",
                optionArray:[],
                optionCorrect:false,
            }]);
            for(let i=0;i<options.length;i++){
                question[0].pollOption[i].optionValue = "";
                question[0].pollOption[i].optionCorrect = false;
            }
            setPoll(question);
            window.location.reload();
        }
    }
    return (
        <>
        <header className={classes.main}>
               <a href="#" style={{display:"flex",color:"#f4511e"}}><PollIcon style={{cursor:"pointer"}} fontSize='medium' onClick={navicon}/><h2 onClick={navicon}>POLLAPP</h2></a>
               <input type="checkbox" name="toggle" id="toggle" checked={checked}onChange={e => setChecked(toggle)}/>
               <label for="toggle">{!checked?<MenuIcon/>:<CloseIcon/>}</label>
               <nav className="checks">
                   <ul>
                       <li><a href="#" onClick={(e)=>{viewpoll(e)}}>Dashboard</a></li>
                   </ul>
                </nav>
            </header> 
        <div style={{display:"flex",flexDirection:"column-reverse",width:"100%",backgroundColor: "white",alignItems:"center",justifyContent:"center",position:"relative",top:"10vh"}}>
        <div className={classes.createpoll} style={{margin:"0",padding:"0"}}>
                  
            <div className={classes.add_poll}>
                <div style={{display:"flex", width:"100%"}}>
                <input type="text" className={classes.question} value={poll.pollQuestion}placeholder="Question" onChange={(e)=>{ChangePollQuestion(e.target.value)}}></input>
            </div>
            <br/>
            <div className={classes.add_question_body}>
                 {opt.map((op,i)=>(
                <div style={{display:"flex", width:"100%",marginBottom:"1%"}} key={i}>
                <input type="radio" id="optionentry" name="contact"  value={opt[i].optionValue} className={classes.radio_input} style={{marginBottom:"10px",marginTop:"2%", color: "green",marginLeft:"2%", marginRight:"3%"}} onClick={(e)=>{selectCorrectOption(e.target.value,i)}}/>
                 <label for="optionentry" style={{display:"flex",width:"100%",}}>
                     <input type="text" className={classes.text_input} value={opt[i].optionValue} placeholder="option" onChange={(e)=>{ChangePollOption(e.target.value,i)}}></input>
                         <IconButton aria-label="delete" style={{color:"red"}}>
                             <CloseIcon onClick={()=>{removeOption(i)}}/>
                         </IconButton>
                 </label>
                </div>
                ))}
            </div>
                <div className="add_question_body">
                {opt.length < 5 ? (
                <Button variant="contained" className={classes.optBtn} endIcon={<AddIcon/>} onClick={()=>addOption(opt.length)}>Add Option</Button>):"" }
                </div>
                <br/>
                <div className={classes.add_footer}>
                    <Button className={classes.crtBtn} endIcon={<AddCircleOutlineIcon/>} onClick={CreatePoll}>Create Poll</Button>
                </div>
                </div>
            </div>
            <div style={{width:"100%",backgroundColor:"white"}}>
            <div style={{width:"100%",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-around"}}>
                {polldes.map((lob,x)=>(
                <div className={classes.lobbypollsseen} key={lob}>
                    <div style={{display:"flex", fontFamily: "Roboto,Arial,sans-serif",color:"#333",padding:"1%",}}>
                        <h1 className={classes.quest} style={{color:"#f4511e"}} variant="h5">{x+1}.</h1>&nbsp;&nbsp;
                        <h1 className={classes.quest} variant="h5">{lob.pollQuestion}</h1>
                    </div>
                    <br/>
                    <div style={{display:"flex",fontFamily: "Roboto,Arial,sans-serif", fontSize: 25,fontWeight: 400,letterSpacing: ".2px"}}> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <h5 style={{color:"#f4511e",fontSize: 25,fontWeight: 400,}}>Options:</h5>&nbsp;&nbsp;
                    <div style={{color:"#323232",width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-around",}}>
                       {lob.pollOption.map((oop)=>(
                    <>{oop.optionValue == "" &&(
                        <></>
                    )}
                    {!oop.optionValue == "" &&(
                    <div style={{color:"black",width:"100%",margin:"1%"}}>
                    <p style={{marginTop:"1%",fontSize: 25,fontWeight: 400,}}>{oop.optionValue}</p>
                    </div>
                    )}
                    </>    
                    ))}
                    </div>
                    </div> 
                    <br/>   
                </div>))}               
                </div>
            </div>
                <Typography variant="h4" style={{color:"#f4511e",marginLeft:"2%",marginTop:"1%",marginBottom:"1%"}}>{lobbydes.lobbyDescription}</Typography>
                <Typography variant="h3" style={{color:"#f4511e",marginLeft:"2%",marginTop:"1%"}}>{lobbydes.lobbyName}</Typography>
            </div>
            </>
    )
}

export default CreatePoll2

