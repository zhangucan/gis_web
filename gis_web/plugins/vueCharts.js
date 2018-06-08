import Vue from 'vue'
import VueECharts from 'vue-echarts'
import theme from './blackTheme.json'

VueECharts.registerTheme('black', theme)
Vue.component('chart', VueECharts)
