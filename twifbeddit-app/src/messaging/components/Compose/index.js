import React from "react";
import "./Compose.css";
import { useState } from "react";
import { Alert, Icon } from "rsuite";
import { MyInputGroup } from "../../../styles/navigationStyle";
import makeNetworkCall from "../../../util/makeNetworkCall";
import { useDispatch, useSelector } from "react-redux";
import * as navigationActions from "../../../containers/NavigationContainer/actions";

export default function Compose(props) {
	const [message, setMessage] = useState("");
	const messageRecipient = useSelector(
		(state) => state.navigation.selectedConversation
	);
	const cookie = useSelector((state) => state.global.cookie);
	const dispatch = useDispatch();

	const sendMessage = async () => {
		console.log(message);

		//make message object
		const messageObject = {
			to: messageRecipient,
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
			//alert("Something went wrong in loading conversations.");
			if (resp.error.toString().indexOf("status code 401") !== -1) {
				Alert.error(
					"This user only accepts DMs from people they follow.",
					4000
				);
			}
			//alert(resp.error);
		} else {
			//make messaging panel rerender
			const resp2 = await makeNetworkCall({
				HTTPmethod: "get",
				path: "dm",
				cookie,
			});
			if (resp2.error) {
				Alert.error("Something went wrong in loading conversations.", 4000);
			} else {
				dispatch(navigationActions.setDmResponse(resp2));
			}
		}

		setMessage("");
	};

	const handleMessageChange = (event) => {
		var input = event.target.value;
		setMessage(input);
	};

	return (
		<div className="compose">
			<MyInputGroup.Button onClick={sendMessage}>
				<Icon icon="search" />
			</MyInputGroup.Button>
			<input
				type="text"
				className="compose-input"
				placeholder="Type a message"
				onChange={handleMessageChange}
				value={message}
			/>

			{props.rightItems}
		</div>
	);
}
