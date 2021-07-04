import React, {useState} from "react";
import {dbService, storageService} from "../myBase";
export default ({userObj}) => {
	const [nweet, setNweet] = useState("");
	const [image, setImage] = useState("");
	const onSubmit = async (e) => {
		e.preventDefault();
		let imageUrl = "";
		if (image)
		{
		const imageRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
		const response = await imageRef.putString(image, "data_url");
		imageUrl = await response.ref.getDownloadURL();
		}
		const nweetObj = {
				text: nweet,
				date: Date.now(),
				author: userObj.uid,
				imageUrl,
		}
		await dbService.collection("nweets").add(nweetObj);
		setNweet("");
		setImage("");
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
	return (
		<form onSubmit={onSubmit}>
		<input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength="120" required />
		<input type="file" accept="image/*" onChange={onFileChange} />
		<input type="submit" value="Nweet" />
		{image && <div><img src={image} width="50px" height="50px" /><button onClick={onClearImageClick}>Clear</button></div>}
	</form>
	)
}
