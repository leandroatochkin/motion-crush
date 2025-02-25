import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import ToggleableInput from '../../components/inputs/ToggleableInput'
import { users } from '../../utils/data'
import style from './Login.module.css'
import { userStore } from '../../utils/userStore'

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

 

    const navigate = useNavigate()

    const setLoggedIn = userStore((state)=>state.setLoginStatus)
    const setUsername = userStore((state)=>state.setUsername)

    const login = (inputUsername, inputPassword) => {

        for (const key in users) {
          if (users[key].username !== inputUsername || users[key].password !== inputPassword){
            alert('Usuario o contraseña incorrectos.')
            return
          }
          if (users[key].username === inputUsername && users[key].password === inputPassword) {
            setLoggedIn(true)
            setUsername(users[key].name)
            navigate('/main')
          }
        }
        return { success: false, message: "Invalid username or password." };
      };

 

    const handleLoginData = (value, field) => {
        if (field === 'username') {
            setLoginData(prevState => ({...prevState, username: value}))
        }

        if (field === 'password') {
            setLoginData(prevState => ({...prevState, password: value}))
        }
    }


  return (
    <div className={style.container}>
        <div className={style.overlay}>
        <div className={style.loginDialogue}>
        <div className={style.innerContent}>
        <h1>LOGIN</h1>
        <input type='text' onChange={(e)=>handleLoginData(e.target.value, 'username')} className={style.input}/>
        <ToggleableInput handleChange={(e)=>handleLoginData(e.target.value, 'password')} />
        <button onClick={()=>login(loginData.username, loginData.password)}>Login</button>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Login