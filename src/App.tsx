
import {useState, useCallback, memo} from "react"
import { GoogleMap, InfoWindow, Marker, useJsApiLoader} from '@react-google-maps/api';

import "./App.css" 

const MAP_CENTER_POSITION = {
  lat: 16.463713,
  lng: 107.590866
};

const MAP_OPTIONS = {
  zoom: 16,
  // restrict zoom
  minZoom: 14,
  maxZoom: 18,
  // restrict pan
  restriction: {
    latLngBounds: {
      north: MAP_CENTER_POSITION.lat + 0.02,
      south: MAP_CENTER_POSITION.lat - 0.02,
      east: MAP_CENTER_POSITION.lng + 0.02,
      west: MAP_CENTER_POSITION.lng - 0.02,
    },
  },
  // for satellite display
  mapTypeControl: true,
  mapTypeId: "roadmap",
  // others
  controlSize: 30,
  disableDefaultUI: false,
  keyboardShortcuts: false,
  disableDoubleClickZoom: true,
}


function App() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""
  })

  // overlay view

  const [isInfoWindowOpened, setIsInfoWindowOpened] = useState(false)

  const openInfoWindow = useCallback(() => {
    setIsInfoWindowOpened(!isInfoWindowOpened)
  }, [isInfoWindowOpened])
  

  return isLoaded ? (
      <div className='map-container'> 
      <GoogleMap
        mapContainerClassName="map"
        center={MAP_CENTER_POSITION}
        options={MAP_OPTIONS}
      >
        <Marker position={MAP_CENTER_POSITION} onClick={openInfoWindow} >
            {isInfoWindowOpened && (
              <InfoWindow onCloseClick={() => setIsInfoWindowOpened(false)}>
              <div className="window-info-content">
                <p className="title">Tỉnh Thừa Thiên Huế</p>
                <p className="description">Thừa Thiên Huế là một tỉnh ven biển nằm ở cực nam của vùng Bắc Trung Bộ, miền Trung, Việt Nam.</p>
                <img className="image" src="/images/hue.jpg"/>
              </div>
            </InfoWindow>
            )}
          </Marker>
        </GoogleMap>
      </div>
  ) : <></>
}

export default memo(App)
