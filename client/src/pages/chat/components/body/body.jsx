import React from 'react';
import styles from './styles.module.css'
import {useNavigate} from "react-router-dom";

const Body = ({messages, status, leave}) => {
    const navigate = useNavigate();
    const handleLeave = () => {
        localStorage.removeItem('user');
        leave()
        navigate('/');
    }

    return (
        <div>
            <header className={styles.header}>
                <button className={'btn btn-danger'} onClick={handleLeave}>Покинуть чат</button>
            </header>

            <div className={styles.container}>
                {
                    messages.map(item =>
                        item.name === localStorage.getItem('user') ? (
                                <div className={styles.chats} key={item.id}>
                                    <p className={styles.senderName}>{item.name}(Вы)</p>
                                    <div className={`${styles.message} ${styles.messageSender}`}>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.chats} key={item.id}>
                                    <p>{item.name}</p>
                                    <div className={`${styles.message} ${styles.messageRecipient}`}>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            )
                    )
                }
                <div className={styles.status}>
                    <p>{status}</p>
                </div>
            </div>
        </div>
    );
};

export default Body;