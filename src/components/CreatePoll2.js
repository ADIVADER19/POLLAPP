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
import { Delete } from '@material-ui/icons';
import './CreatePoll.css';
import './Nav.css';
import { useNavigate } from 'react-router';
import PollIcon from '@material-ui/icons/Poll';
import MenuIcon from '@mui/icons-material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import Modal from 'react-modal';
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
    },stylings:{
        background:"#f4511e",
        position:"absolute",
        top:0,
        left:0,
        width:"50px",
        height:"50px",
        borderRadius:"15% 50% 50% 0%"
    },
    lobbypollsseen:{
        position:"relative",width:"43%",height:"63vh",backgroundColor:"white",display:"flex",flexDirection:"column",alignItems:"flex-start",margin:"1%",borderLeft:"10px solid #f4511e",borderRadius:"1em",zIndex:"2",
        ['@media (max-width:780px)']: {
            width:"100%",
            height:"70vh"
          },
          ['@media (max-width:340px)']: {
            width:"100%",
            height:"88vh"
          }
    },
    lastStuf:{
        display:"flex",fontFamily: "Roboto,Arial,sans-serif", fontSize: 25,width:"100%",position:"relative",top:"13vh",zIndex:"1",background:"#ebebeb",height:"45vh",borderRadius:"0 0 0 2%",
        ['@media (max-width:780px)']: {height:"52vh",
          }
          ,
          ['@media (max-width:340px)']: {
            width:"100%",
            height:"70vh"
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
        fontWeight: 400,
    },
    tired:{
        color:"#333",
        "&:hover":{
            color:"red",
            cursor:"pointer",
        }
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
    delBtn:{
        background:"#992525",
        color:"white",
        border:"1px solid #701a1a",
        "&:hover":{
          background:"#701a1a",
          border:"1px solid #992525",
      },
      ['@media (max-width:752px)']: {
        width:"100%",
        marginTop:"1%",
      }
      },
    main:{
        boxSizing:"border-box",
        fontFamily: "Roboto,Arial,sans-serif",
        textTransform:"capitalize",
        position:"fixed",
        zIndex:"50",
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
    const [repes, setrepes] = useState(true);
    let navigate = useNavigate();
    const currentPathName = window.location.pathname;
    const lobbyuuid = currentPathName.slice(6);
    const [polldes, setItems] = useState([]);
     const [lobbydes, setTritems] = useState([]);
     let f = polldes.length+1;
    const [num,setNum]=useState([{value:f}]);
    let repeatingQues = [];
    const classes = useStyles();
    const [modal, setmodal] = useState(false);
    const[deletepollid,setDeletepollid]=useState('');
    const link="https://pollapp281907.herokuapp.com/"
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
    
    useEffect(() => {
        fetch(`${link}bobs`, {method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res) => res.json())
        .then((ret) => {
           setItems(ret.myitem);
        })
    }, [polldes]);
    useEffect(()=>{
        fetch(`${link}ross`, {method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res) => res.json())
            .then((rte)=>{
                setTritems(rte.myitem[0]);
        })
    },[lobbydes]);
    
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
    }
    function ChangePollOption(option,place){
        var newOption = [...opt];
        newOption[place].optionValue = option;
        setopt(newOption);
    }
    function removeOption(i){
        if(i!=0){    
        var removeOpt = [...opt];
        removeOpt.splice(i,1);
        setopt({optionValue: "",optionArray:[],optionCorrect:false})
        setopt(removeOpt);
        }
    }
    function addOption(i){
        var j = i+1;
        var addOption = [...opt];
        if(opt.length < 5){
            addOption[i] = {optionValue: "",optionArray:[],optionCorrect:false};
        } else{
        }
        setopt(addOption);
      }
    function selectCorrectOption(corOpt,i){
        var selectedOption =[...opt];
        var j = selectedOption.length;
        for(let k = 0;k<j;k++){
            if(k==i){
                selectedOption[i].optionCorrect=true;
            }
            else{
                selectedOption[k].optionCorrect=false; 
            }
        }
    }
    function Livelobby(){
        navigate("/LivepollT/"+lobbyuuid);
    }
    const DeletetingPoll = async()=>{
        let pollId = deletepollid;
        let lobbyId = lobbydes._id;
        const res = await fetch("/deletePoll", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({pollId,lobbyId})
        }); 
        if (res.status === 200 ) { 
            setmodal(false);
      }
    }
    const CreatePoll = async(e)=>{
        var options = [...opt];
        var question = [...poll];
        
        for(let i=0;i<options.length;i++){
            question[0].pollOption[i].optionValue = options[i].optionValue;
            question[0].pollOption[i].optionCorrect = options[i].optionCorrect;
        }
        setPoll(question);
        const pollOption = [{optionValue: "",optionArray:[],optionCorrect:false}]
        for(let j=0;j<5;j++){
            pollOption[j] = poll[0].pollOption[j];
        }
        const lobbyUniqueId = poll[0].lobbyUniqueId;
        var pollQuestion = poll.pollQuestion;
        console.log(poll.pollQuestion);
        console.log(poll);
        console.log("Hey",pollQuestion);
        console.log("Gg",repeatingQues);
        console.log(polldes.length);
        for(let i=0;i<polldes.length;i++){
            repeatingQues.push(polldes[i].pollQuestion);
        }
        console.log("Hello",repeatingQues);
        let rups = false;
        for(let j=0;j<repeatingQues.length;j++){
            if(pollQuestion===repeatingQues[j]){
                console.log("equal");
                rups = true;
                break;
            }
        }
        console.log(rups);
       if(!rups){
        if(options.length<2){
            window.alert("Atleast 2 options required");
            var setPollQuestion = [...poll];
            console.log(setPollQuestion);
            setPoll(setPollQuestion);
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
        }
        else if(pollQuestion==undefined || options[0].optionValue=="" || options[1].optionValue==""){
            window.alert("Please fill all the details");
            var setPollQuestion = [...poll];
            setPollQuestion[0].pollQuestion = "";
            setPoll(setPollQuestion);
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
        }
        else{
            const res = await fetch(`${link}createnewpoll`, {
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
            rups= false;
        }
       }
       else{
           window.alert("Poll Already Exists");
           rups = false;
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
        <div style={{display:"flex",flexDirection:"column-reverse",width:"100%",backgroundColor: "whitesmoke",alignItems:"center",justifyContent:"center",position:"relative",top:"10vh"}}>
        <div className={classes.createpoll} style={{margin:"0",padding:"0",position:"relative",zIndex:"5"}}>
                  
            <div className={classes.add_poll}>
                <div style={{display:"flex", width:"100%"}}>
                <input type="text" className={classes.question} value={poll.pollQuestion}placeholder="Question" maxlength="85" onChange={(e)=>{ChangePollQuestion(e.target.value)}}></input>
            </div>
            <br/>
            <div className={classes.add_question_body}>
                 {opt.map((op,i)=>(
                <div style={{display:"flex", width:"100%",marginBottom:"1%"}} key={i}>
                <input type="radio" id="optionentry" name="contact"  value={opt[i].optionValue} className={classes.radio_input} style={{marginBottom:"10px",marginTop:"2%", color: "green",marginLeft:"2%", marginRight:"3%"}} onClick={(e)=>{selectCorrectOption(e.target.value,i)}}/>
                 <label for="optionentry" style={{display:"flex",width:"100%",}}>
                     <input type="text" className={classes.text_input} value={opt[i].optionValue} placeholder="option" maxlength="75" onChange={(e)=>{ChangePollOption(e.target.value,i)}}></input>
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
                <br/>
                <Button className={classes.delBtn}  onClick={Livelobby} size="large" variant="contained" endIcon={<SaveIcon/>} style={{fontFamily: "Roboto,Arial,sans-serif"}}>SAVE LOBBY</Button>
                </div>
            </div>
            <div style={{width:"100%",backgroundColor:"whitesmoke"}}>
            <div style={{width:"100%",display:"flex",flexWrap:"wrap",alignItems:"center",position:"relative",zIndex:"2"}}>
                {polldes.map((lob,x)=>(
                <div className={classes.lobbypollsseen} key={lob}>
                   <div style={{position:"absolute",right:"1vw",top:"2vh",zIndex:"4"}}><Delete  className={classes.tired} onClick={()=>{setmodal(true);setDeletepollid(lob._id)}}/></div>
                   <div className={classes.stylings}></div>
                    <div style={{display:"flex", fontFamily: "Roboto,Arial,sans-serif",color:"#333",width:"93%",position:"absolute",top:"3%",height:"10vh",zIndex:"1",left:"3%",overflow:"hidden"}}>
                        <h2 className={classes.quest} style={{color:"white"}} variant="h5">{x+1}</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <h2 className={classes.quest} variant="h5">{lob.pollQuestion}</h2>
                    </div>
                    <br/>
                    <div className={classes.lastStuf}>
                    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
                       {lob.pollOption.map((oop,y)=>(
                    <>{oop.optionValue == "" &&(
                        <></>
                    )}
                    {!oop.optionValue == "" &&(
                    <div style={{color:"rgb(73 73 73 / 87%)",width:"100%",margin:"1%",position:"relative",zIndex:"3"}}>
                    <h5 style={{fontWeight: 400,}}>{y+1}. {oop.optionValue}</h5>
                    </div>
                    )}
                    </>    
                    ))}
                    </div>
                    </div> 
                    <br/>
                    <div style={{position:"absolute",width:"100%",bottom:"0",
                    background:"#f4511e",height:"10%",borderRadius:"50% 50% 0.5em 0.5em"}}></div>
                </div>))}               
                </div>
            </div>
            <div className='poltlel'>
            <div className='header' >
                    <h1 className='lobby'>Lobby Title: {lobbydes.lobbyName}
                    <span>Lobby Description: {lobbydes.lobbyDescription}</span></h1>
                    </div>
                    </div>
                    <div className='styles'></div>
                 </div>
                 <Modal style={{overlay: {zIndex:10,width:"100%",height:"100%",backgroundColor:'rgba(255, 255, 255, 0.1)'},content:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"50vw",height:"25vh",top:"25vh",left:"25vw"}}} isOpen={modal} onRequestClose={()=>setmodal(false)}>
                    <div className="modaltitle">
                      <h2>Are You Sure You Want to Delete The Poll ?</h2>
                    </div>
                    <div className="modalfooter">
                      <button onClick={()=>setmodal(false)} id="modalcancelBtn">Cancel</button>
                      <button onClick={()=>{DeletetingPoll()}}>Continue</button>
                    </div>
                    </Modal>
            </>
    )
}

export default CreatePoll2

