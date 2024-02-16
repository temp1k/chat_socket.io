import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './static/css/home.css';

const Home = ({socket}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('user', user)
        socket.emit('newUser', {user, socketID: socket.id})
        navigate('/chat')
    }

    return (
        <div className='d-flex' style={{minHeight: "80vh"}}>
            <form onSubmit={handleSubmit} className="form form-auth w-33 form-white">
                <h3 className='form-title'>Вход в чат</h3>
                <div className='form-group'>
                    <label htmlFor='user' className='form-label'>Имя пользователя</label>
                    <input className='form-input' type="text" id='user' value={user} onChange={(e) => setUser(e.target.value)}/>
                </div>
                <div className="form-group d-flex justify-center no-margin">
                    <button type="submit" className='btn btn-outline-success form-button'>Войти</button>
                </div>
            </form>
        </div>
    );
};

export default Home;