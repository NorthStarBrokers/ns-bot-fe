import axios, { type AxiosInstance } from 'axios'

export const getAxiosIns = (): AxiosInstance => {  
  return axios.create({
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: '/api'
  })
}
