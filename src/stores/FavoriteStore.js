import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', {
	state: () => {
		return {
			favoriteMeal: []
		}
	},
	getters: {
		getFavorite() {
			return this.favoriteMeal
		}
	},
	actions: {
		addFavoriteMeal(meal) {
			this.favoriteMeal.push(meal)
		}
	},
	persist: true
})