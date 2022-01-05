import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import {Typography} from '@mui/material';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import './CreatePoll.css';
const  useStyles = makeStyles({
    createpoll:{
        width:"100vw",
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "#323232",
    },
    add_poll:{
        width:"55vw",
        height:"80vh",
        display: "flex",
        flexDirection: "column",
        borderTop: "6px solid rgb(103, 58, 183)",
        backgroundColor: "#121212",
        paddingTop:"5%",
        padddingBottom:"5%",
        borderRadius:"3%",
    },
    question:{
        boxSizing: "border-box",
        fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
        fontSize: 30,
        fontweight: 400,
        lineHeight: "40%",
        border:"1px solid #121212",
        outline:"none",
        color:"white",
        padding:"1%",
        borderRadius:"7px",
        width:"93%",
        marginLeft:"1%",
        background:"#323232 !important",
        "&:focus":{
            borderBottom:"1px solid rgb(103, 58, 183)",
            backgroundColor: "white",
        },
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
            borderBottom: "1.5px solid rgb(103, 58, 183)",
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
            borderBottom: "1.5px solid rgb(103, 58, 183)",
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
    add_footer:{
        display: "flex",
        alignItems:"cener",
        width:"100%",
        justifyContent:"center",
    },
    add_question_bottom_left:{
        width: "100%",
    },
});

function CreatePoll2() {
    const currentPathName = window.location.pathname;
    const lobbyuuid = currentPathName.slice(6);
    console.log(lobbyuuid);
    const classes = useStyles();
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
        var removeOpt = [...opt];
        removeOpt.splice(i,1);
        setopt(removeOpt);
        console.log(opt);
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
        const pollQuestion = poll.pollQuestion;
        console.log(poll);
            const res = await fetch("/createnewpoll", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({lobbyUniqueId,pollQuestion,pollOption})
            })
    }
    return (
        <div className={classes.createpoll}>
            <div className={classes.add_poll}>
                <Typography style={{color:"white"}} variant="h3" align="center">Create A Poll</Typography>
                <div style={{display:"flex", width:"100%"}}>
                <h1 style={{color:"white", marginLeft:"1%", marginTop:"1%"}}>1.</h1>
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
                <Button variant="contained" sx={{color: "white", backgroundColor:"rgb(103, 58, 183)", '&:hover':{backgroundColor:"#4e1ba8"}}}  endIcon={<AddIcon/>} onClick={()=>addOption(opt.length)}>Add Option</Button>):"" }
                </div>
                <br/>
                <div className={classes.add_footer}>
                    <Button sx={{color: "white", width:"70%",backgroundColor:"#93291e",'&:hover':{ backgroundColor:"#ed213a"}}} endIcon={<AddCircleOutlineIcon/>} onClick={CreatePoll}>Create Poll</Button>
                </div>
                </div>
            </div>
    )
}

export default CreatePoll2
