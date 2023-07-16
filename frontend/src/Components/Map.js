import React, { useRef, useEffect } from 'react';
import H from "@here/maps-api-for-javascript";
import onResize from 'simple-element-resize-detector';
import './Map.css'

const Map = ({ mapVal }) => {
  const mapRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) {
      const platform = new H.service.Platform({
        apikey: "SlFiE8x2kEqNkE4px36wU2QRDL8Sfaghmz99QRDP1kg"
      });
      const layers = platform.createDefaultLayers();
      const newMap = new H.Map(
        mapRef.current,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: { lat: 0, lng: 0 },
          zoom: 2,
        },
      );
      onResize(mapRef.current, () => {
        newMap.getViewPort().resize();
      });
      map.current = newMap;
    //   newMap.addEventListener('mapviewchange', handleMapViewChange);
      // add the interactive behaviour to the map
      new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));
      
    }
  }, [mapVal]);

  useEffect(() => { // this is to set the zoom on the map 
    if (map.current) {
      clearTimeout(map.current.timeout);
      map.current.timeout = setTimeout(() => {
        if(mapVal[0]){
        map.current.setZoom(mapVal[0].zoom);
        map.current.setCenter({ lat: mapVal[0].lat, lng: mapVal[0].lng });
    }
      }, 50);

      const createNumberedIcon = (number) => {
        const icon = document.createElement('div');
        icon.className = 'numbered-marker';
        icon.innerHTML = number;
        return new H.map.DomIcon(icon);
      };

      const markers = mapVal

      markers.forEach((pos, index) => { // this is to set markers for each location on the map
        const marker = new window.H.map.DomMarker(pos, {
            icon: createNumberedIcon(index +1, 45)
        });
    
        map.current.addObject(marker);
      });

        //  const marker = new window.H.map.Marker({
        //   lat: lat,
        //   lng: lng,
        // });
        
        // map.current.addObject(marker);
        // map.current.setCenter({
        //     lat: lat,
        //     lng: lng,
        //   })
    }
  }, [mapVal]);

//   const handleMapViewChange = (ev) => {
//     console.log(ev, "EVVVVV")
//     if (ev.newValue && ev.newValue.lookAt) {
//       const lookAt = ev.newValue.lookAt;
//       const lat = Math.trunc(lookAt.position.lat * 1E7) / 1E7;
//       const lng = Math.trunc(lookAt.position.lng * 1E7) / 1E7;
//       const zoom = Math.trunc(lookAt.zoom * 1E2) / 1E2;
//       setMapVals({zoom: zoom, lat:lat, lng:lng});
//     }
//   };
//   useEffect(() => {
//     return () => {
//       if (map.current) {
//         map.current.removeEventListener('mapviewchange', handleMapViewChange);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const map = // get reference to map
//     map.addEventListener('mapviewchangeend', handleMapViewChange);

//     return () => {
//       map.removeEventListener('mapviewchangeend', handleMapViewChange);
//     };
//   }, []);
  

  return (
    <div
      id="mapResult"
      ref={mapRef}
    //   onClick={handleMapViewChange}
    ></div>
  );
};

export default Map;

