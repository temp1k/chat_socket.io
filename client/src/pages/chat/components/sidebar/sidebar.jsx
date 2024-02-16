import React, {useEffect, useState} from 'react';
import styles from './styles.module.css'

const Sidebar = ({socket}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on('responseNewUser', (data) => {
            setUsers(data)
        })
    }, [socket, users]);

    return (
        <div className={styles.sidebar}>
            <h4 className={styles.header}>Пользователи</h4>
            <ul className={styles.users}>
                {users.map((user) =>
                    user.user === localStorage.getItem('user') ?
                        (
                            <li key={user.socketID}>{user.user}(Вы)</li>
                        ) : (
                            <li key={user.socketID}>{user.user}</li>
                        )
                )}
            </ul>
        </div>
    );
};

export default Sidebar;