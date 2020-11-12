import React from 'react'
import { Link } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi'

import loginImg from '../images/happyLogin.svg'

import '../styles/pages/loginPage.css'

function LoginPage() {
  return (
    <div className="page-login" >
      <div className="login-icons-container">
        <img src={loginImg} alt="Happy" />
        <p>Urussanga</p>
      </div>

      <div className="login-form-container">
        <form className="loginForm">
          <h2>Fazer Login</h2>
          <span className="FormSpan">E-mail</span>
          <input className="inputText" type="text" name="e-mail" />
          <span className="FormSpan">Senha</span>
          <input className="inputText" type="password" name="password" />
          <div className="checkboxContainerDiv">
            <div>
              <input type="checkbox" />
              <span>Lembrar-me</span>
            </div>
            <Link to="#">Esqueci a senha</Link>
          </div>
          <button className="loginSubmitBtn">
            Entrar
          </button>
        </form>
      <Link className="loginPageBackBtn" to="/">
        <FiArrowLeft color="#29B6D1" size={24} />
      </Link>
      </div>
    </div>
  )
}

export default LoginPage