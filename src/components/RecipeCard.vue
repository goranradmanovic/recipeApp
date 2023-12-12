<template>
  <div v-if="!loading" class="card">
    <img :src="getMeal.image || placehoderImg" :alt="getMeal.title" class="card__img">

    <div class="card__info">
      <div class="card__info__header">
        <h1 class="card__info__title">{{ getMeal.title }}</h1>

        <ul class="card__info__ingrediens">
          <li v-for="(value, index) in getMeal.ingredients" :key="index">{{ value }}</li>
        </ul>
      </div>
      <div class="card__info__body">
        <h2 class="card__info__subtitle">Directions</h2>

        <ul class="card__info__instructions">
          <li v-for="(value, index) in getMeal.instructions" :key="index">{{ value }}</li>
        </ul>

        <div class="card__info__btns">
          <div>
            <button @click="refreshMeal" title="Refresh">
              <RefreshIcon class="rotate" />
            </button>
            <button @click="addFavMeal(getMeal)" title="Favorite">
              <FavoriteIcon class="fav" />
            </button>
            <button @click="showPreviouseMeal" title="Previouse">
              <PreviouseIcon class="prev" />
            </button>
          </div>

          <div class="card__info__btns__links">
            <a :href="getMeal.source" target="_blank" title="Source" class="source"><SourceIcon /></a>
            <a :href="getMeal.youtube" target="_blank" title="YouTube" class="youtube"><YoutubeIcon /></a>
            <!--<span title="Tags"><TagsIcon /> {{ getMeal.tags }}</span>-->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <LoaderIcon />
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useMealStore } from '@/stores/MealStore'
  import { useFavoriteStore } from '@/stores/FavoriteStore'
  import LoaderIcon from '@/components/icons/LoaderIcon.vue'
  import SourceIcon from '@/components/icons/SourceIcon.vue'
  import YoutubeIcon from '@/components/icons/YoutubeIcon.vue'
  import TagsIcon from '@/components/icons/TagsIcon.vue'
  import RefreshIcon from '@/components/icons/RefreshIcon.vue'
  import FavoriteIcon from '@/components/icons/FavoriteIcon.vue'
  import PreviouseIcon from '@/components/icons/PreviouseIcon.vue'
  import placehoderImg from '../assets/images/no-image-placeholder.svg'

  const mealStore = useMealStore(),
        favoriteStore = useFavoriteStore()

  mealStore.getRandomMeal()

  const { loading, getMeal, getPreviouseMeal } = storeToRefs(mealStore)
  const showPreviouseMeal = () => mealStore.showPreviouseMeal()
  const addFavMeal = (meal) => favoriteStore.addFavoriteMeal(meal)
  const refreshMeal = () => mealStore.getRandomMeal()
</script>