import { getAxiosIns } from '../core/config/axios-config'
import store from '@/store'
import { AxiosHeaders } from 'axios'
import { host } from '@/core/config/environment/host'

const url = `${host.backend}/api`

export const axiosPost = async (data: any, endpoint: string, customHeaders?: AxiosHeaders, alternativeHost?: string) => {
  const axiosIns = getAxiosIns()
  const response = await axiosIns.post(alternativeHost ?? url + endpoint, data, { headers: getHeaders(customHeaders) })
  return response.data
}

export const axiosGet = async (endpoint: string, params?: any, alternativeHost?: string, customHeaders?: AxiosHeaders) => {
  const axiosIns = getAxiosIns()
  const response = await axiosIns.get(alternativeHost ?? url + endpoint, { params, headers: getHeaders(customHeaders)  })
  return response.data
}

export const axiosPut = async (endpoint: string, data?: any, alternativeHost?: string, customHeaders?: AxiosHeaders) => {
  const axiosIns = getAxiosIns()
  const response = await axiosIns.put(alternativeHost ?? url + endpoint, data, { headers: getHeaders(customHeaders)  })
  return response.data
}

const getHeaders = (customHeaders?: AxiosHeaders): AxiosHeaders => {
  if (customHeaders) return customHeaders
  const brandStore = store.getters['brand'];
  return new AxiosHeaders({
    'api-key': host.backendAPIKey,
    authorizationToken: brandStore.getBrand.token,
  }) 
}
