<template>
  <grid-layout class="top-30 right10"
    :layout='layout'
    :col-num='12'
    :row-height='30'
    :is-draggable='false'
    :is-resizable='false'
    :is-mirrored='false'
    :vertical-compact='true'
    :margin='[30,30,30,30]'
    :use-css-transforms='true'
>
    <grid-item class="grid-border" v-for='(item, index) in layout'
      :x='item.x'
      :y='item.y'
      :w='item.w'
      :h='item.h'
      :i='item.i'
      :key='index'>
        <!-- <component :is="showView(item.gridType)" :component="item.component"></component> -->
    </grid-item>
</grid-layout>
</template>
<script>
import screenMap from '../components/Map'
// import screenChart from '../components/Chart'
export default {
  layout: 'bigScreen',
  components: {
    screenMap
  },
  data() {
    return {
    }
  },
  computed: {
    layout() {
      return [...this.$store.state.layout]
    }
  },
  methods: {
    showView(type) {
      if (type === 'map') {
        return 'screenMap'
      } else {
        return 'screenChart'
      }
    }
  },
  beforeCreate() {
    // const socket = io('http://127.0.0.1:1337')
    // socket.on('news', data => {
    //   console.log(data)
    //   socket.emit('my other event', { my: 'data' })
    // })
    this.$store.dispatch('fetchLayout')
  }
}
</script>
<style lang='scss' scoped>
  .grid-border{
    border-radius: 0px;
    border-style: solid;
    border-width: 12px 12px 12px;
    border-image-source: url(../assets/img/border.png);
    border-image-slice: 20 20 20 fill;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: repeat;
    background: none;
  }
  .top-30{
    top: -30px;
  }
  .right10{
    right: 10px;
  }
</style>
