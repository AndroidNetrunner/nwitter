import React, { useState } from "react";
import { dbService, storageService } from "../myBase";

export default ({nweet, isOwner}) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState("");
	const onDelete = async () => {
		const confirmed = window.confirm("Are you sure?");
		if (confirmed) {
			await dbService.doc(`nweets/${nweet.id}`).delete();
			await storageService.refFromURL(nweet.imageUrl).delete();
		}
	};
	const toggleEditing = () => {
		setEditing(prev => !prev);
	}
	const onSubmit = async (e) => {
		e.preventDefault();
		await dbService.doc(`nweets/${nweet.id}`).update({
			text: newNweet
		});
		setEditing(false);
	}
	const onChange = (e) => {
		setNewNweet(e.target.value);
	}
	if (isOwner)
	{
		if (!editing)
		return (
	<>
	<div>{nweet.text} {nweet.imageUrl && <img src={nweet.imageUrl} width="50px" height="50px" />}<button onClick={toggleEditing}>Edit nweet!</button>
	<button onClick={onDelete}>Delete nweet!</button></div>
	</>
	);
		else
		return (
			<>
			<div>{nweet.text} {nweet.imageUrl && <img src={nweet.imageUrl} width="50px" height="50px" />}<form onSubmit={onSubmit}><input value={newNweet} onChange={onChange} /><input type="submit" value="Update Nweet" /><button onClick={toggleEditing}>Cancel</button></form></div>
			</>
		)
		}
	else
		return (<div>{nweet.text}</div>);
}