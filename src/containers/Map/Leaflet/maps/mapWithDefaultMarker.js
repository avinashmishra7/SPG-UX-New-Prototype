import React, { Component } from 'react';
import 'leaflet';
import { mapboxConfig } from '../../../../config.js';
import { basicMarkers } from '../config';
class LMap extends Component {
  constructor(props) {
    super(props);
    this.mountMap = this.mountMap.bind(this);
  }
  mountMap(element) {
    if (!element) return;
    const { L } = window;
    const map = L.map(element).setView(
      mapboxConfig.center,
      !isNaN(mapboxConfig.defaultZoom) ? mapboxConfig.defaultZoom : 13
    );
    L.tileLayer(mapboxConfig.tileLayer, {
      maxZoom: !isNaN(mapboxConfig.maxZoom) ? mapboxConfig.maxZoom : 18,
      id: mapboxConfig.id,
      accessToken: mapboxConfig.accessToken,
    }).addTo(map);

    basicMarkers.map(singleMarker => {
      return L.marker(singleMarker.position)
        .addTo(map)
        .bindPopup(singleMarker.popupText);
    });
  }
  render() {
    return (
      <div className="isoLeafletMap">
        <div
          id="basic-map-marker"
          style={{ height: '400px', width: '100%' }}
          ref={this.mountMap}
        />
      </div>
    );
  }
}

export default LMap;
