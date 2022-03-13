import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router';
import "./Profile.css";
import {Typography,TextField,Button,Box,Avatar,Dialog,DialogTitle,DialogActions,DialogContent,DialogContentText,FormHelperText} from "@material-ui/core";
import {Stack,Divider,styled,Snackbar,Table,TableBody,IconButton,Tooltip,Paper,TableRow,TableHead,TableContainer,TableCell} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MuiAlert from '@mui/material/Alert';
import * as XLSX from 'xlsx';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import PreviewIcon from '@mui/icons-material/Preview';
import CloseIcon from '@mui/icons-material/Close';
/*Select component Styling*/
const blue = {
	100: '#DAECFF',
	200: '#99CCF3',
	400: '#3399FF',
	500: '#007FFF',
	600: '#0072E5',
	900: '#003A75',
  };
  
  const grey = {
	100: '#E7EBF0',
	200: '#E0E3E7',
	300: '#CDD2D7',
	400: '#B2BAC2',
	500: '#A0AAB4',
	600: '#6F7E8C',
	700: '#3E5060',
	800: '#2D3843',
	900: '#1A2027',
  };
  
  const StyledButton = styled('button')(
	({ theme }) => `
	font-family: IBM Plex Sans, sans-serif;
	font-size: 0.875rem;
	box-sizing: border-box;
	min-height: calc(1.5em + 22px);
	min-width: 70%;
	background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
	border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
	border-radius: 0.75em;
	margin: 0.5em;
	padding: 10px;
	text-align: left;
	line-height: 1.5;
	color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  
	&:hover {
	  background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
	  border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
	}
  
	&.${selectUnstyledClasses.focusVisible} {
	  outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
	}
  
	&.${selectUnstyledClasses.expanded} {
	  &::after {
		content: '▴';
	  }
	}
  
	&::after {
	  content: '▾';
	  float: right;
	}
	`,
  );
  
  const StyledListbox = styled('ul')(
	({ theme }) => `
	font-family: IBM Plex Sans, sans-serif;
	font-size: 0.875rem;
	box-sizing: border-box;
	padding: 5px;
	margin: 10px 0;
	min-width: 70vw;
	background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
	border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
	border-radius: 0.75em;
	color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
	overflow: auto;
	outline: 0px;
	`,
  );
  
  const StyledOption = styled(OptionUnstyled)(
	({ theme }) => `
	list-style: none;
	padding: 8px;
	border-radius: 0.45em;
	cursor: default;
  
	&:last-of-type {
	  border-bottom: none;
	}
  
	&.${optionUnstyledClasses.selected} {
	  background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
	  color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
	}
  
	&.${optionUnstyledClasses.highlighted} {
	  background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
	  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
	}
  
	&.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
	  background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
	  color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
	}
  
	&.${optionUnstyledClasses.disabled} {
	  color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
	}
  
	&:hover:not(.${optionUnstyledClasses.disabled}) {
	  background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
	  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
	}
	`,
  );
  
  const StyledPopper = styled(PopperUnstyled)`
	z-index: 1;
  `;
  
  const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
	const components = {
	  Root: StyledButton,
	  Listbox: StyledListbox,
	  Popper: StyledPopper,
	  ...props.components,
	};
  
	return <SelectUnstyled {...props} ref={ref} components={components} />;
  });
  function createData(Name,RollNo,Email) {
	return { Name,RollNo,Email };
  }
  const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
export default function Profile() {
	const navigate = useNavigate();
	const [data, setData] = useState("");
	const [paa, setPaa] = useState("");
	const [colorr, setColorr] = useState();
	const [userInfo, setUserInfo] = useState({});
	const colorarr=["red","blue","yellow","orange","purple","cyan","lightblue","lightgreen","lightyellow","darkblue","crimson","lightorange","darkorange","darkyellow","darkcyan","darkgreen","whitesmoke","white","black","pink"]
	const Input = styled('input')({
		display: 'none',
	  });
	const callProfilePage = async () => {
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
			setUserInfo(data);
			console.log(data)
			if (!res.status === 200) {
				window.alert("login first");
				navigate('/');
			}
		} catch (err) {
			navigate("/");
		}
	}
    function goBack() {
        navigate("/");
    }
	useEffect(() => {
       callProfilePage();
        }, []);


	setTimeout(() => {
		avatarr();
	},1000);

	/*To comment*/
	// const PostData = async (e) => {
	// 	console.log("submitted");
	// 	// e.preventDefault();

	// 	const { firstname, lastname, username, email, password } = userInfo;
	// 	const res = await fetch("/profile", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			firstname,
	// 			lastname,
	// 			username,
	// 			email,
	// 			password,
	// 		}),
	// 	});
	// 	const data = await res.json();
	// 	if (res.status === 422 || !data) {
	// 		alert("User Update Failed");
	// 		console.log("User Update Failed");
	// 	}
	// 	if (data.status === 200 || data.status === 201) {
	// 		toast.success("Uesr updated", {
	// 			position: "top-center",
	// 			autoClose: 3000,
	// 		});

	// 		console.log("ZA WARUDOO!!!!");
	// 	} else {
	// 		window.alert("User updation failed");
	// 	}
	// };
	/*To comment*/
	/*Remove update button, remove onChange attr, make value as placeholder and/or textfield disabled*/
	function avatarr()
	{
		
		fname=userInfo.givenName[0];
		firstchar=fname;
		console.log(firstchar);
		console.log(userInfo.name)
		console.log(userInfo.name.length)
		for (var a=0;a<userInfo.name.length;a++)
		{
			if (userInfo.name[a]==" ")
			{
				setColorr(a)
				lastchar=userInfo.name[a+1];
				console.log(lastchar);
			}
		}
		
		console.log(firstchar+lastchar);
		setPaa(firstchar+lastchar);
	}
 
	var firstchar;
	var fname;
	var lastchar;
	/*All Alerts UseState*/
	const [excelAlert, setexcelAlert] = useState(false);	
	  const handleCloseexcAlr = () => {
		setexcelAlert(false);
	  };
	  const [excelSucc, setexcelSucc] = useState(false);	
	  const handleCloseexcSucc = () => {
		setexcelSucc(false);
	  };
	  const [excelFail, setexcelFail] = useState(false);	
	  const handleCloseexcFail = () => {
		setexcelFail(false);
	  };
	  const [excelSub, setexcelSub] = useState(false);	
	  const handleCloseSub = () => {
		setexcelSub(false);
	  };
	  const [excelSubEnt, setexcelSubEnt] = useState(false);	
	  const handleCloseSubEnt = () => {
		setexcelSubEnt(false);
	  };
	  const [excelUpload, setexcelUpload] = useState(false);	
	  const handleCloseexcUpload = () => {
		setexcelUpload(false);
	  };
	const [openps, setOpenps] = React.useState(false);
    const handleClickOpenps = () => {
		console.log("Hi");
		setOpenps(true);
    };
    const handleCloseps = () => {
        setOpenps(false);
    };
	const [opentb, setOpentb] = React.useState(false);
    const handleClickOpentb = () => {
		console.log("Hi");
		setOpentb(true);
		const workbook = XLSX.read(excelFile,{type:'buffer'});
		console.log(workbook)
		const worksheetName = workbook.SheetNames[0];
		const worksheet=workbook.Sheets[worksheetName];
		const data = XLSX.utils.sheet_to_json(worksheet);
		setExcelData(data);
		console.log(data);
		console.log("Ok",excelData);
    };
    const handleClosetb = () => {
        setOpentb(false);
    };
	const subjectSelected = (index)=>{
		console.log(index);
	}
	/*Excel sheet submission*/
	const [filename, setfilename] = useState("No File Chosen");
	const [subjectName, setsubjectName] = useState(null);
	const retrivedSubject=["Subject1","Subject2","Subject3"];
	let value;
    const handlingSubject = (e) => {
		value = e.target.value;
		setsubjectName(e.target.value);
		console.log(subjectName);
	};
	const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);  
 
  // submit
  const [excelData, setExcelData]=useState();
 
   const[emailArray,setEmailArray]=useState([]);
	// it will contain array of objects
	const fileType=['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
	const UploadFile = (e)=>{
		let selectedFile = e.target.files[0];
		setfilename(e.target.files[0].name);
		console.log(selectedFile);
		if(selectedFile){
		    console.log(selectedFile.type);
			if(selectedFile&&fileType.includes(selectedFile.type)){
			let reader = new FileReader();
			reader.readAsArrayBuffer(selectedFile);
			reader.onload=(e)=>{
				console.log("Hi",e.target.result);
			  setExcelFileError(null);
			  setExcelFile(e.target.result); 
			}
		    }
			else{
				setexcelAlert(true);
				setExcelFile(null);
				setsubjectName(null);
				setfilename(null);
				setExcelData(null);
				setEmailArray([]);
				setfilename("No File Chosen");
			}
			console.log(excelFile);
		}
		else{
			console.log("Please Select The File")
		}
		}
	const SubmitHandler=async()=>{
		let subValArr=[]
		let subVal=userInfo.Subject;
		let len = userInfo.Subject.length;
		if(len==0||len==undefined||len==null){
			if(subjectName==null||subjectName==''){
				setexcelSubEnt(true);
			}
			else if(excelFile){
			const workbook = XLSX.read(excelFile,{type:'buffer'});
			console.log(workbook)
			const worksheetName = workbook.SheetNames[0];
			const worksheet=workbook.Sheets[worksheetName];
			const data = XLSX.utils.sheet_to_json(worksheet);
			setExcelData(data);
			for (let i = 0; i < data.length; i++) { 
				emailArray.push(data[i].Email);
			}
			let mailid = userInfo.mail;
			const res = await fetch("/createNewSubject", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({subjectName,emailArray,mailid})
			});
			const dt= await res.json();
			if (res.status === 400 || !dt) {
				setexcelFail(true);
				setfilename("No File Chosen");
				setExcelFile(null);
				setsubjectName(null);
				setfilename(null);
				setExcelData(null);
				setEmailArray([]);
			} else if (res.status === 200 || res.status === 201) {
				setexcelSucc(true);
				setOpenps(false);
			} 
			}
			else{
				setexcelUpload(true);
			}
		}
		else{
			for(let i =0;i<len;i++){
				console.log(i);
				subValArr.push(userInfo.Subject[i].SubjectValue);
			}
			if(subValArr.includes(subjectName)){
				setexcelSub(true);
				setfilename("No File Chosen");
				setExcelFile(null);
				setsubjectName(null);
				setfilename(null);
				setExcelData(null);
				setEmailArray([]);
			}
			else if(subjectName==null||subjectName==''){
				setexcelSubEnt(true);
			}
			else if(excelFile){
			const workbook = XLSX.read(excelFile,{type:'buffer'});
			console.log(workbook)
			const worksheetName = workbook.SheetNames[0];
			const worksheet=workbook.Sheets[worksheetName];
			const data = XLSX.utils.sheet_to_json(worksheet);
			setExcelData(data);
			console.log(data.length);
			console.log(data);
			for (let i = 0; i < data.length; i++) { 
				console.log(data[i].Email);
				emailArray.push(data[i].Email);
			}
			console.log("Hello",emailArray);
			console.log("Ok",excelData);
			let mailid = userInfo.mail;
			console.log(mailid);
			console.log(subjectName);
			console.log(emailArray);
			const res = await fetch("/createNewSubject", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({subjectName,emailArray,mailid})
			});
			const dt= await res.json();
			if (res.status === 400 || !dt) {
				setexcelFail(true);
				setfilename("No File Chosen");
				setExcelFile(null);
				setsubjectName(null);
				setfilename(null);
				setExcelData(null);
				setEmailArray([]);
			} else if (res.status === 200 || res.status === 201) {
				setexcelSucc(true);
				setOpenps(false);
			} 
			}
			else{
				setexcelUpload(true);
			}
		}
		
	}
	return (
		
		<div style={{display:"block",width:"100vw",overflow: "hidden" }}>
			<div class="triangle-right1"></div>
            <div className="triangle-left1"></div>
			<Box className="form">
				<div className="title">
					{/* <AccountCircleIcon
						style={{ fontSize: 55, marginRight: 10, marginTop: -3}}
						className="icon"
					/> */}
					<Avatar style={{backgroundColor:`${colorarr[colorr]}`}} className="iconn" >{paa}</Avatar>
					<Typography style={{fontSize:40}} className="text" variant="h2">
						{" "}
						Welcome Back, {userInfo.givenName}!
					</Typography>
				</div>

				<div className="detail">
					<Typography
						style={{ marginRight: 80, marginTop: 10}}
						className="label"
						variant="h5"
					>
						First Name:
					</Typography>
					<TextField
						value={userInfo.givenName}
						// onChange={(e) =>
						// 	setUserInfo({ ...userInfo, firstname: e.target.value })
						// }
						disabled
						style={{ width: 750, backgroundColor: "white" }}
						variant="outlined"
					></TextField>
				</div>
				<div className="detail">
					<Typography
						style={{ marginRight: 140 , marginTop: 10}}
						className="label"
						variant="h5"
					>
						Email:
					</Typography>
					<TextField
						value={userInfo.mail}
						// onChange={(e) =>
						// 	setUserInfo({ ...userInfo, email: e.target.value })
						// }
						disabled
						style={{ width: 750, backgroundColor: "white" }}
						variant="outlined"
					></TextField>
				</div>
                <div className="detail">
					<Typography
						style={{ marginRight: 140, marginTop: 10 }}
						className="label"
						variant="h5"
					>
						Name:
					</Typography>
					<TextField
						value={userInfo.name}
						// onChange={(e) =>
						// 	setUserInfo({ ...userInfo, email: e.target.value })
						// }
						disabled
						style={{ width: 750, backgroundColor: "white" }}
						variant="outlined"
					></TextField>
				</div>
								
			</Box>
			<hr align="center" style={{marginLeft:"10%",width:"80%",align:"center"}}/>
			<div style={{width:"100vw",display:"flex",alignItems:"center",justifyContent:"center"}}>
			<CustomSelect defaultValue={1000} onChange={(index)=>{subjectSelected(index)}}>
				{userInfo.Subject==undefined?
					<>---No Subject Created---</>:<>
				{
					userInfo.Subject.map((value, index) => 
					<StyledOption value={value} key={index} >{value.SubjectValue}</StyledOption>
					)
				}
				</>}			
				
				<StyledOption value={handleClickOpenps} >Add Subject</StyledOption>
			</CustomSelect>
			<Dialog open={openps}>
                  <DialogTitle>Add New Subject</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
					<Stack style={{width:"40vw"}}  divider={<Divider orientation="vertical" flexItem />} direction={{ xs: 'column'}} spacing={{ xs: 1, sm: 4, md: 8 }}>
					<TextField style={{width:"100%"}} sx={{ input: { color: 'red' } }} id="outlined-basic" label="Subject Name" variant="outlined" onChange={handlingSubject} required />
					<br/>
					<div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
					<label htmlFor="contained-button-file">
					<Input accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" id="contained-button-file" type="file"  aria-describedby="my-helper-text"  onChange={UploadFile} required/>
					<Button variant="contained" component="span">Upload</Button>
					<FormHelperText id="my-helper-text">{filename}</FormHelperText>
					</label>
					<Tooltip title="Preview" >
						<IconButton >
							<PreviewIcon fontSize='large'onClick={handleClickOpentb}/>
						</IconButton>
					</Tooltip>
					</div>
					<br/>
					<div>
					</div>
				</Stack>	
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
				  <Button variant="contained" onClick={handleCloseps} >Cancel</Button>
                    <Button variant="contained" endIcon={<AddCircleOutlineIcon/>} onClick={SubmitHandler}>Add</Button>
                  </DialogActions>
                </Dialog>
				<Dialog open={opentb}>
					<DialogTitle style={{display:"flex",justifyContent:"space-between",flexWrap:"no-wrap",backgroundColor:"red"}}>Uploaded Xlsx File 
					<Tooltip title="Close" float="right">
						<IconButton >
							<CloseIcon fontSize='medium'onClick={handleClosetb}/>
						</IconButton>
					</Tooltip>
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							<h3 style={{fontWeight:"normal"}}><u>Subject Name</u>: {subjectName}</h3>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell align="right">Roll No</TableCell>
											<TableCell align="right">Email</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
									{excelData==undefined?<>No enteries filled</>:<>
									{excelData.map((row,i) => (
									<TableRow key={excelData.Name}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component="th" scope="row">{excelData[i].Name}
										</TableCell>
										<TableCell align="right">{excelData[i].RollNo}</TableCell>
										<TableCell align="right">{excelData[i].Email}</TableCell></TableRow>
									))}
									</>}
									</TableBody>
								</Table>
							</TableContainer>
						</DialogContentText>
					</DialogContent>
					<DialogActions></DialogActions>
				</Dialog>
			</div>
            <button onClick={goBack} className="butt">BACK</button>
			<Snackbar open={excelAlert} autoHideDuration={6000} onClose={handleCloseexcAlr}>
        <Alert onClose={handleCloseexcAlr} severity="error" sx={{ width: '100%' }}>
          Kindly Upload Excel File Only
        </Alert>
      </Snackbar>
	  <Snackbar open={excelSucc} autoHideDuration={6000} onClose={handleCloseexcSucc}>
        <Alert onClose={handleCloseexcSucc} severity="success" sx={{ width: '100%' }}>
          Subject Created successfully
        </Alert>
      </Snackbar>
	  <Snackbar open={excelFail} autoHideDuration={6000} onClose={handleCloseexcFail}>
        <Alert onClose={handleCloseexcFail} severity="error" sx={{ width: '100%' }}>
          Subject Created Failed
        </Alert>
      </Snackbar>
	  <Snackbar open={excelSub} autoHideDuration={6000} onClose={handleCloseSub}>
        <Alert onClose={handleCloseSub} severity="warning" sx={{ width: '100%' }}>
          Subject Already Exists
        </Alert>
      </Snackbar>
	  <Snackbar open={excelSubEnt} autoHideDuration={6000} onClose={handleCloseSubEnt}>
        <Alert onClose={handleCloseSubEnt} severity="error" sx={{ width: '100%' }}>
          Please Fill All The Details
        </Alert>
      </Snackbar>
	  <Snackbar open={excelUpload} autoHideDuration={6000} onClose={handleCloseexcUpload}>
        <Alert onClose={handleCloseexcUpload} severity="error" sx={{ width: '100%' }}>
          Upload Excel File
        </Alert>
      </Snackbar>
		</div>
	);
}