import Services from './services'
export default {
  async fetchLayout({ state }) {
    const res = await Services.fetchLayout('白龟山湿地公园')
    state.layout = res.data.gridItems
  }
}
