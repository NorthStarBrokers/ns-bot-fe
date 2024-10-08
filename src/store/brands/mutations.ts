// @ts-nocheck
import type { BrandModel } from "../../core/interfaces/brand-model"

const mutations = {
    SET_BRAND(state, branch: BrandModel) {
      state.brand = branch
    },
    SET_BRAND_STYLE(state, style: string) {
      state.brand.style = style
    }
  }

  export default mutations