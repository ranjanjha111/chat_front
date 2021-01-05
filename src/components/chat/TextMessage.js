import React from "react";
import moment from 'moment';

const TextMessage = ({ message, messageClass }) => {
    return (
        <div className={`message-row ${messageClass}`}>
            <div className="message-content">
                <div className="message-text">{ message.message }</div>
                <div className="message-time">{ moment(message.createdAt).format('LT') }</div>
            </div>
        </div>
    );

};

export default TextMessage;


