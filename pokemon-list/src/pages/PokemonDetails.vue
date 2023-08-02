<template>
  <q-page id="pokemonDetails">
    <q-scroll-area class="content-style q-pa-md">
      <q-spinner v-if="loading" color="primary" />
      <div v-else class="bigContainer">
        <div class="q-mb-md">
          <div v-for="type in pokemon.types" :key="type.type.name" class="badge bg-light-blue-10">
            {{ type.type.name }}
          </div>
        </div>
        <div class="text-h4 text-bold text-center">{{pokemon.name}}</div>
        <img :src="getPokemonImageUrl(pokemonNumber)" class="pokemon-image" />
        <div class="q-mb-md">
          <div class="info-container">
            <div class="display-text">{{ pokemon.height }} m</div>
            <div class="label-text">HEIGHT</div>
          </div>
          <q-separator inset class="q-my-md"/>
          <div>
            <div class="info-container">
              <div class="display-text">{{ pokemon.weight }} kg</div>
              <div class="label-text">WEIGHT</div>
            </div>
          </div>
          <div class="h2">Base stats</div>
          <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="stat-info-container">
            <div class="statName">{{ stat.stat.name }}</div>
            <SkillBar :skillValue="stat.base_stat" />
            <div class="skill-value">{{ stat.base_stat }}</div>
          </div>
          <button-press titulo="Compartilhar" />
        </div>
      </div>
      <div class="q-pt-xl">
        <q-btn clickable @click="favorite()" size="lg" class="full-width" color="red-5" label="Favorite" icon="favorite"/>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import SkillBar from '../components/SkillBar.vue'

export default {
  data () {
    return {
      loading: true,
      pokemon: null
    }
  },
  methods: {
    async fetchData () {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${this.$route.params.pokemonNumber}`
      )
      const data = await response.json()
      this.pokemon = data
      this.loading = false
    },
    getPokemonImageUrl (pokemonNumber) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.$route.params.pokemonNumber}.png`
    },
    dividePokemonStat (statNumber) {
      return statNumber / 100
    },
    favorite () {
      console.log('Has been favorited')
    }
  },
  async mounted () {
    await this.fetchData()
  },
  components: {
    SkillBar
  }
}
</script>

<style>
#pokemonDetails {
  .content-style {
    margin: 0 auto;
    height: calc(100vh - 150px);
    max-width: 500px;
  }
  .statName{
    width: 50px
  }
  .bigContainer{
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
}

.pokemon-image {
  width: 200px;
  height: 200px;
  margin-left: 150px;
}

.badge {
  display: inline-block;
  color: white;
  padding: 8px;
  border-radius: 8px;
  margin-right: 8px;
}

.info-container {
  text-align: center;
}

.display-text {
  font-size: 32px;
  font-weight: 600;
}

.label-text {
  font-size: 12px;
  font-weight: 400;
}

.separator {
  background-color: #e5e5e5;
  height: 1px;
  margin: 0 36px;
}

.h2 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.stat-info-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.skill-value {
  width: 30px;
  text-align: right;
  direction: rtl;
}

.button-style {
  color: red;
  align-items: center;
  margin-top: 20px;
  padding: 16px;
  background-color: #478070;
  border-radius: 8px;
}

.button-text {
  font-size: 16px;
  font-weight: 600;
  color: white;
}
</style>
