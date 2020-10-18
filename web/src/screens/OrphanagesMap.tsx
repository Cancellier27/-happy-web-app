import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'

import 'leaflet/dist/leaflet.css'
 
import mapMarkerImg  from '../images/map-marking.svg'

import '../styles/pages/orphanages.css'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

function OrphanagesMap() {
  return(
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Urussanga</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>

      <Map 
        center={[-28.5244005,-49.3272206]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        <Marker  
          icon={mapIcon}
          position={[-28.5244005,-49.3272206]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup' >
            Lar das menins
            <a href="#">
              <FiArrowRight size={20} color="fff" />
            </a>
          </Popup>
        </Marker>
        
      </Map>

      <Link to="" className="create-orphanage" >
          <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default OrphanagesMap