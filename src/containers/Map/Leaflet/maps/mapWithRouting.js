import React, { Component } from 'react';
import 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet.routing.icons.png';
import { mapboxConfig } from '../../../../config.js';
// import { markerRouting } from '../config';

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
    try
    {
      L.Routing
        .control({
          waypoints: [
            L.latLng(40.72143, -74.05729),
            L.latLng(40.6943, -74.074201),
          ],
          routeWhileDragging: true,
        })
        .addTo(map);
    }
    catch(e) {}
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
