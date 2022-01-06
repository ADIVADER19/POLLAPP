import React from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
function ViewLobbyPoll() {
    let navigate = useNavigate();
    const currentPathName = window.location.pathname;
    const lobbyuuid = currentPathName.slice(17);
    console.log(lobbyuuid);
    const UploadUrl = async () => {
		try {
			await fetch("/lobs", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({data:lobbyuuid})
            })
		} catch (error) {
			console.log(error);
		}
		getUrl();
	};
	const getUrl = () => {
		axios("/lobs")
			.then((response) => {
				console.log(response.data["uuid"]);
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
			});
	};
    function ViewCurrentLobby(){
        navigate("/view_lobby");
    }
    UploadUrl();
    return (
        <div>
            <h1>Ok</h1>
          <button onClick={ViewCurrentLobby}>Back</button>  
        </div>
    )
}

export default ViewLobbyPoll
