import React, { useEffect, useState } from "react";
import { dbService, storageService } from "../myBase";
import Nweet from "../components/Nweet"
import NweetFactory from "../components/NweetFactory";
import {v4 as uuidv4} from "uuid";
export default ({ userObj }) => {
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);
	const [image, setImage] = useState("");
	useEffect(() => {
		dbService.collection("nweets").orderBy("date","asc").onSnapshot( snapshot => {
				const nweetArray = snapshot.docs.map(doc => ({
						id: doc.id,
						...doc.data(),
				}));
				setNweets(nweetArray);
			}); 
			return 
		}, [])
	return (<div>
		<NweetFactory userObj={userObj} />
		{nweets.map(nweet => <Nweet key={Nweet.id} nweet={nweet} isOwner={userObj.uid === nweet.author} />)}
	</div>
	);
}