import React from 'react'
import { Link } from 'react-router-dom'

import successImage from '../images/successImage.svg'

import '../styles/components/successfulRegistrationPage.css'


export default function SuccessfulRegistrationPage() {
  return (
    <div className="successContent">
      <div className="successWrapper">
        <div>
          <h1>Ótimo!</h1>
          <p>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :D</p>
          <Link to="/app">Voltar para o Mapa</Link>
        </div>
        <img src={successImage} alt="successImage" />
      </div>
    </div>

  )
}