import React from 'react'
import { FiArrowLeft } from "react-icons/fi"

import mapMarkerImg from '../images/map-marking.svg';

import '../styles/components/Sidebar.css'

const Sidebar = () => {
  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  )
}

export default Sidebar