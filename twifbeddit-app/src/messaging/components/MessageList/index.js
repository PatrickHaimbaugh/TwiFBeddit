import React, {useEffect, useState} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';

import { useDispatch, useSelector } from "react-redux";
import * as navigationActions from "../../../containers/NavigationContainer/actions";
import makeNetworkCall from "../../../util/makeNetworkCall";

import './MessageList.css';

export default function MessageList(props) {
  //const [messages, setMessages] = useState([])
  const MY_USER_ID = 'apple';
  const OTHER_USER_ID = useSelector((state) => state.navigation.selectedConversation);
  var response = useSelector((state) => state.navigation.dmResponse);;
  const cookie = useSelector((state) => state.global.cookie);

  useEffect(() => {

	}, []);

  const renderMessages = (username) => {
    console.log(username);

    var messages = [];
    if (response && response.conversations){
      for (var j = 0; j < response.conversations.length; j++){
        console.log("index " + j + ": " + response.conversations[j].user);
        if (response.conversations[j].user === username){

          var indexOfConversation = j;
          break;
        }
      }
      var selectedConversation = response.conversations[indexOfConversation];

      //get messages of conversation
      //var messages = [];
      if (selectedConversation && selectedConversation.conversation){
        for (var j = 1; j < selectedConversation.conversation.length; j++){
          var author = null;
          if (selectedConversation.conversation[j].from === username){
            author = OTHER_USER_ID;
          }else{
            author = MY_USER_ID;
          }
          messages.push({
            id: j,
            author: author,
            message: `${selectedConversation.conversation[j].message}`,
            timestamp: new Date().getTime(),
          })
        }
      }
    }

    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

    return(
      <div className="message-list">
        <Toolbar
          title={OTHER_USER_ID}
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />

        <div className="message-list-container">{renderMessages(OTHER_USER_ID)}</div>

        <Compose />
      </div>
    );
}
