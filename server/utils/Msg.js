class Msg {
  constructor(code = 20000, data = {}, message = '') {
    this.code = code
    this.data = data
    this.message = message
  }
  setCode(code) {
    this.code = code
  }
  setData(data) {
    this.data = data
  }
  setMessage(message) {
    this.message = message
  }
  getCode() {
    return this.code
  }
  getData() {
    return this.data
  }
  getMessage() {
    return this.message
  }
}
export { Msg }
