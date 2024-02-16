import React, {useEffect, useState} from 'react';
import Sidebar from "./components/sidebar/sidebar.jsx";
import Body from "./components/body/body.jsx";
import MessageBlock from "./components/message-block/message-block.jsx";
import styles from './static/css/styles.module.css'

const ChatPage = ({socket}) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('')

    const leave = () => {
        socket.emit('leave', {socketID: socket.id})
    }

    useEffect(() => {
        socket.on('response', (data) => {
            setMessages([...messages, data])
        })
    }, [socket, messages]);

    useEffect(() => {
        socket.on('responseTyping', (data) => {
            setStatus(data)
            setTimeout(() => setStatus(''), 1000)
        })
    }, [socket]);

    return (
        <div className={styles.chat}>
            <Sidebar socket={socket}/>
            <main className={styles.main}>
                <Body messages={messages} leave={leave} status={status}/>
                <MessageBlock socket={socket}/>
            </main>
        </div>
    );
};

export default ChatPage;