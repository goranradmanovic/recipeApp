import { defineStore } from 'pinia'

export const useMealStore = defineStore('meal', {
	state: () => {
		return {
			meal: {
				title: '',
				image: '',
				ingredients: [],
				instructions: [],
				tags: '',
				source: '',
				youtube: ''
			},
			previouseMeal: [],
			favoriteMeal: [],
			loading: false
		}
	},
	getters: {
		getMeal() {
			return this.meal
		}
	},
	actions: {
		async getRandomMeal() {
			this.loading = true

			// Lookup a single random meal
			const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
				data = await res.json()

			this.formatMealData(data.meals[0])
			this.loading = false
		},
		emptyMealMesIng(data, index) {
			return data[`strMeasure${index}`] !== null && 
				data[`strMeasure${index}`].trim() !== '' && 
				data[`strIngredient${index}`] !== null && 
				data[`strIngredient${index}`].trim() !== ''
		},
		formatMealData(data) {
			this.resetMealIngIns()
			this.meal.title = data.strMeal
			this.meal.tags = data.strTags
			this.meal.source = data.strSource
			this.meal.youtube = data.strYoutube
			this.meal.image = `${data.strMealThumb}/preview`
			this.meal.instructions = data.strInstructions.split('. ')

			for (let i = 1; i <= 20; i++) {
				if (this.emptyMealMesIng(data, i)) {
					this.meal.ingredients.push(`${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}`)
				}
			}

			this.addPreviouseMeal(this.meal)
		},
		addPreviouseMeal(meal) {
			this.previouseMeal.push(meal)
		},
		showPreviouseMeal() {
			if (this.previouseMeal.length >= 2) this.meal = this.previouseMeal.at(-2)
		},
		resetMealIngIns() {
			this.meal.ingredients = []
			this.meal.ingredients = []
		}
	},
	persist: true
})