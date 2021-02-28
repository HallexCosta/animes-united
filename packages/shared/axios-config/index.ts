import axios from 'axios'

const api = axios.create({
  baseURL: 'http://animes-united.ddns.net:3333'
})

export { api }
