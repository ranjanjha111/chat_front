import React from "react";
import moment from 'moment';
import Linkify from 'react-linkify';

const TextMessage = ({ message, messageClass }) => {
    return (
        <div className={`message-row ${messageClass}`}>
            <div className="message-content">
                <div className="message-text">
                    <Linkify>{message.message}</Linkify>
                </div>
                <div className="message-time">{ moment(message.createdAt).format('LT') }</div>
            </div>
        </div>
    );

};

export default TextMessage;


