import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as navigationActions from "../../../containers/NavigationContainer/actions";
import shave from 'shave';

import './ConversationListItem.css';

export default function ConversationListItem(props) {
    useEffect(() => {
      shave('.conversation-snippet', 20);
    })

    const dispatch = useDispatch();
    const { photo, name, text } = props.data;

    const handleConversationSelection = () => {
      dispatch(navigationActions.setSelectedConversation(name));
    }

    return (
      <div
        className="conversation-list-item"
        onClick={handleConversationSelection}
      >
        <div className="conversation-info">
          <h1 className="conversation-title">{ name }</h1>
          <p className="conversation-snippet">{ text }</p>
        </div>
      </div>
    );
}
