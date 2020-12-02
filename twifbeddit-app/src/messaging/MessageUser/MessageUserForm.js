import React, { Component, Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import makeNetworkCall from "../../util/makeNetworkCall";
import * as navigationActions from "../../containers/NavigationContainer/actions";
import { Alert } from "rsuite";

export const Form = () => {
	const dispatch = useDispatch();
	const cookie = useSelector((state) => state.global.cookie);
	const [message, setMessage] = useState("");
	const [charsLeft, setCharsLeft] = useState(500);
	const { usernameForAccountPage, userForAccountPage } = useSelector(
		(state) => state.navigation
	);

	const handleMessageChange = (event) => {
		var input = event.target.value;
		setCharsLeft(500 - input.length);
		setMessage(input);
	};

	const changeActiveScreen = (screen) => {
		dispatch(navigationActions.changeCurrentPage(screen));
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (message != null) {
			console.log(message);

			//make message object
			const messageObject = {
				to: usernameForAccountPage,
				message: message,
			};
			console.log(messageObject);
			console.log(cookie);

			//send message
			const resp = await makeNetworkCall({
				HTTPmethod: "post",
				path: "dm",
				data: messageObject,
				cookie,
			});
			if (resp.error) {
				Alert.error("Something went wrong in loading conversations.", 4000);
				Alert.error(resp.error, 4000);
			} else {
				setMessage("");
			}
		}
	};

	useEffect(() => {}, []);

	return (
		<form onSubmit={onSubmit}>
			<div className="form-group">
				<label htmlFor="postText">Message: </label>
				<textarea
					className="form-control"
					id="postText"
					maxLength="500"
					onChange={handleMessageChange}
					value={message}
				></textarea>
				<p>Characters Left: {charsLeft}</p>
			</div>

			<div className="form-group">
				<button className="form-control btn btn-primary" type="submit">
					Submit
				</button>
			</div>
		</form>
	);
};
export default Form;
