import LeafLet from 'leaflet'

import mapMarkerImgBlue from '../images/map-marking-blue.svg'


const MapIcon = LeafLet.icon({
  iconUrl: mapMarkerImgBlue,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [178, 2]
})

export default MapIcon