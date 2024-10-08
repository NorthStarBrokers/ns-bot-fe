// @ts-nocheck
import type { BrandModel } from "../../core/interfaces/brand-model"

const actions = {
    setBrand({ commit, dispatch }, branch: BrandModel) {
      commit('SET_BRAND', branch)
      dispatch('loadBrandStyles', branch.style)
    },
    async loadBrandStyles({ commit }, style: string) {
      try {
        await import(`../../assets/sass/brands/${style}.scss`)
        commit('SET_BRAND_STYLE', style)
      } catch (error) {
        console.error(`No se pudo cargar los estilos para la marca: ${style}`, error)
      }
    }
  }

export default actions;
