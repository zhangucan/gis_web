<template>
  <div style='height:100%;width:100%'>
    <div style="height:100%;width:100%;" ref='basicMapbox'></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
export default {
  data() {
    return {
      map: {}
    }
  },
  methods: {
    init() {
      const url = 'http://127.0.0.1:8090/iserver/services/map-baiguihu/rest/maps/baiguihu'
      const lon = this.lon || 113.24
      const lat = this.lat || 33.73
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
      this.map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: {
          'version': 8,
          'sources': {
            'raster-tiles': {
              'type': 'raster',
              'tiles': [url + '/zxyTileImage.png?prjCoordSys={"epsgCode":3857}&z={z}&x={x}&y={y}'],
              'tileSize': 256
            }
          },
          'layers': [{
            'id': 'simple-tiles',
            'type': 'raster',
            'source': 'raster-tiles'
          }]
        },
        center: [lon, lat],
        maxZoom: 18,
        zoom: 16
      })
    }
  },
  props: {
    component: Object
  },
  mounted() {
    this.init()
  }
}
</script>
<style>
@import url('../node_modules/mapbox-gl/dist/mapbox-gl');
</style>
