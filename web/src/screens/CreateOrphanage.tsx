import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import { useHistory } from "react-router-dom";
import { FiPlus, FiX } from "react-icons/fi";

import MapIcon from '../utils/mapIcon'
import Sidebar from '../components/Sidebar'
import api from "../services/api";


import '../styles/pages/create-orphanage.css';


export default function CreateOrphanage() {
  const history = useHistory()

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [actualLocation, setActualLocation] = useState({ latitude: 0, longitude: 0 })
  const [errorCheck, setErrorCheck] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {

      setActualLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    });
  }, [])

  function informationCheck() {
    let answer = 'Os seguintes campos faltam serem preenchidos:'
    let check = false
    if (position.latitude === 0) {
      answer += ' Local no Mapa,'
      check = true
    }
    if (name === '') {
      check = true
      answer += ' Nome,'
    }
    if (about === '') {
      check = true
      answer += ' Sobre,'
    }
    if (instructions === '') {
      check = true
      answer += ' Instruções,'
    }
    if (opening_hours === '') {
      check = true
      answer += ' Horário de Funcionamento,'
    }
    setErrorCheck(check)
    setErrorMessage(answer)
  }

  async function postFinalInformationToDataBase() {
    const { latitude, longitude } = position

    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))

    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('orphanages', data)

    history.push('/orphanages/create/success')

  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    informationCheck()

    if (errorCheck) {
      return
    } else {
      postFinalInformationToDataBase()
    }
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) { return }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview)
  }

  function handleDeleteImage(INDEX: number) {
    const filteredPreviewImages = previewImages.filter((item, index) => index !== INDEX)
    const filteredImages = images.filter((item, index) => index !== INDEX)

    setPreviewImages(filteredPreviewImages)
    setImages(filteredImages)
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>
            {errorCheck === true && <div className="errorCheck">{errorMessage}</div>}

            <Map
              center={[actualLocation.latitude, actualLocation.longitude]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude != 0 && (
                <Marker
                  interactive={false}
                  icon={MapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <div className="posted-image-container" key={image} >
                      <img src={image} alt={name} />

                      <button className="delete-image" onClick={() => handleDeleteImage(index)} >
                        <FiX size={24} color="#FF669D" />
                      </button>
                    </div>
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input id='image[]' multiple type="file" onChange={handleSelectImages} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
                placeholder="ex: 8:00h até as 13:00h"
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button
                  type="button"
                  className={open_on_weekends ? '' : 'active'}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>

              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
