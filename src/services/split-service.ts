import store from '../store'
import { axiosGet } from '../services/axios-methods'
import type { SplitResponse } from '../core/interfaces/split'

const baseEndpoint = `redirect`

// Access the getter via the store
export const fundLead = async (): Promise<SplitResponse> => {
  const brandUrl = store.getters['brands/getBrand'].url; 
  console.log(brandUrl);
  return await axiosGet(`/${baseEndpoint}/${brandUrl}`);
}