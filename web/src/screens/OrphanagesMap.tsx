import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


import mapMarkerImg from '../images/map-marking.svg'
import MapIcon from '../utils/mapIcon'

import '../styles/pages/orphanages-map.css'
import api from '../services/api'
import { LeafletMouseEvent } from 'leaflet'

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  const [actualLocation, setActualLocation] = useState({ latitude: 0, longitude: 0 })
  const [clickPosition, setClickPosition] = useState({ latitude: 0, longitude: 0 })

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })

    navigator.geolocation.getCurrentPosition(function (position) {

      setActualLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    });

  }, [])

  function handleMapRegionClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng

    setClickPosition({
      latitude: lat,
      longitude: lng
    })
  }


  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :</p>
        </header>

        <footer>
          <strong>Urussanga</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>

      <Map
        // center={[-28.5244005, -49.3272206]}
        center={[actualLocation.latitude, actualLocation.longitude]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
        onclick={handleMapRegionClick}
      >
        {/* <TileLayer url="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        {clickPosition.latitude != 0 && (
          <Marker
            interactive={false}
            icon={MapIcon}
            position={[clickPosition.latitude, clickPosition.longitude]}
          />
        )}

        {orphanages.map((orphanage) => {
          return (
            <Marker
              icon={MapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup' >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="fff" />
                </Link>
              </Popup>
            </Marker>
          )
        })}

      </Map>

      <Link to="/orphanages/create" className="create-orphanage" >
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default OrphanagesMap