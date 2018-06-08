
import axios from 'axios'
class Services {
  async fetchLayout(title) {
    return await axios.get(`/gridlayout?title=${title}`)
  }
}
export default new Services()
