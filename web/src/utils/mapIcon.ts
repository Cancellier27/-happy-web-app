import LeafLet from 'leaflet'

import mapMarkerImg from '../images/map-marking.svg'


const MapIcon = LeafLet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [178, 2]
})

export default MapIcon