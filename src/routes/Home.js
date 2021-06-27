import React, { useEffect, useState } from "react";
import { dbService } from "../myBase";
import Nweet from "../components/Nweet";
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
	const onSubmit = async (e) => {
		e.preventDefault();
		await dbService.collection("nweets").add({
			text: nweet,
			date: Date.now(),
			author: userObj.uid,
		});
		setNweet("");
	};
	const onChange = (e) => {
		setNweet(e.target.value);
	};
	const onFileChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = e => {
			setImage(e.currentTarget.result);
		}
	}
	const onClearImageClick = () => setImage("");
	return (<div>
		<form onSubmit={onSubmit}>
			<input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength="120" required />
			<input type="file" accept="image/*" onChange={onFileChange} />
			<input type="submit" value="Nweet" />
			{image && <div><img src={image} width="50px" height="50px" /><button onClick={onClearImageClick}>Clear</button></div>}
		</form>
		{nweets.map(nweet => <Nweet key={Nweet.id} nweet={nweet} isOwner={userObj.uid === nweet.author}/>)}
	</div>
	);
}