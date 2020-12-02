import React, { useState, useEffect } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import makeNetworkCall from "../../../util/makeNetworkCall";
import { useDispatch, useSelector } from "react-redux";
import * as navigationActions from "../../../containers/NavigationContainer/actions";
import axios from "axios";
import { Alert } from "rsuite";
import "./ConversationList.css";

export default function ConversationList(props) {
	const [conversations, setConversations] = useState([]);
	const cookie = useSelector((state) => state.global.cookie);
	const dispatch = useDispatch();

	useEffect(() => {
		async function syncGetConversations() {
			await getConversations();
		}
		syncGetConversations();
	}, []);

	const getConversations = async () => {
		//// TODO: 1. get request of dm's. 2. create parse method that returns a similar structure to that of this
		// 3. create method within parse method that looks up the user they are talking to
		const resp = await makeNetworkCall({
			HTTPmethod: "get",
			path: "dm",
			cookie,
		});
		if (resp.error) {
			Alert.error("Something went wrong in loading conversations.", 4000);
		} else {
			//render conversation objects in terms of { name: __ , text: __ }
			//console.log(resp);
			var conversationsArray = resp.conversations.map((conversation) => {
				var lastMessageOfConversation =
					conversation.conversation[conversation.conversation.length - 1]
						.message; //last message of conversation.conversation
				return {
					name: `${conversation.user}`,
					text: lastMessageOfConversation,
				};
			});
			conversationsArray.reverse();
			dispatch(navigationActions.setDmResponse(resp));
			setConversations([...conversations, ...conversationsArray]);
		}
	};

	return (
		<div className="conversation-list">
			<Toolbar
				title="Messenger"
				leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
				rightItems={[
					<ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
				]}
			/>
			{conversations.map((conversation) => (
				<ConversationListItem key={conversation.name} data={conversation} />
			))}
		</div>
	);
}
