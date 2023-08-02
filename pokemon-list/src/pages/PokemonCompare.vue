<template>
  <div class="q-pa-md">
    <div v-if="loading" class="text-h6 text-primary q-pb-md">Loading...</div>
    <div v-else>
      <div class="q-mb-md">
        <div class="text-h6 text-primary q-pb-md text-center text-bold">
          Comparing {{ getPokemonName(pokemon1) }} and {{ getPokemonName(pokemon2) }}
        </div>
        <div class="q-flex row justify-evenly">
          <div class="pokemon-details q-mr-md">
            <img :src="getImageUrl(pokemon1)" class="pokemon-image" />
            <div class="text-h6">{{ getPokemonName(pokemon1) }}</div>
            <div class="text-subtitle">{{ '#' + getPokemonNumber(pokemon1) }}</div>
            <div class="details">
              <div v-for="stat in pokemon1.stats" :key="stat.stat.name" class="stat-info-container">
                <div
                  :class="['statName', { 'max-value': stat.base_stat === getMaxStatValues[stat.stat.name] }]"
                >
                  {{ stat.stat.name }}: {{ stat.base_stat }}
                </div>
              </div>
            </div>
          </div>
          <div class="pokemon-details">
            <img :src="getImageUrl(pokemon2)" class="pokemon-image" />
            <div class="text-h6">{{ getPokemonName(pokemon2) }}</div>
            <div class="text-subtitle">{{ '#' + getPokemonNumber(pokemon2) }}</div>
            <div class="details">
              <div v-for="stat in pokemon2.stats" :key="stat.stat.name" class="stat-info-container">
                <div
                  :class="['statName', { 'max-value': stat.base_stat === getMaxStatValues[stat.stat.name] }]"
                >
                  {{ stat.stat.name }}: {{ stat.base_stat }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pt-md">
        <q-btn clickable @click="navigateToChoose()" size="lg" class="full-width" color="blue" label="Make a new comparison" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      pokemon1: null,
      pokemon2: null
    }
  },
  methods: {
    fetchData () {
      const url1 = `https://pokeapi.co/api/v2/pokemon/${this.$route.params.pokemon1}/`
      const url2 = `https://pokeapi.co/api/v2/pokemon/${this.$route.params.pokemon2}/`

      Promise.all([fetch(url1), fetch(url2)])
        .then((responses) => Promise.all(responses.map((response) => response.json())))
        .then((data) => {
          this.pokemon1 = data[0]
          this.pokemon2 = data[1]
          this.loading = false
        })
        .catch((error) => {
          console.error(error)
          this.loading = false
        })
    },
    getPokemonName (pokemon) {
      return pokemon ? pokemon.name : ''
    },
    getImageUrl (pokemon) {
      const pokemonNumber = this.getPokemonNumber(pokemon)
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`
    },
    getPokemonNumber (pokemon) {
      return pokemon ? pokemon.id.toString() : ''
    },
    navigateToChoose () {
      this.$router.push('/choose-pokemons')
    }
  },
  computed: {
    getMaxStatValues () {
      if (!this.pokemon1 || !this.pokemon2) {
        return {}
      }

      const maxStatValues = {}
      for (const stat of this.pokemon1.stats) {
        const statName = stat.stat.name
        const maxStatValue = Math.max(
          stat.base_stat,
          this.pokemon2.stats.find((s) => s.stat.name === statName)?.base_stat || 0
        )
        maxStatValues[statName] = maxStatValue
      }

      return maxStatValues
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style>
.pokemon-image {
  width: 100px;
  height: 100px;
}

.pokemon-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-right: 24px;
}

.details {
  margin-top: 8px;
}

.detail-item {
  margin-bottom: 4px;
}

.max-value {
  font-weight: bold;
  color: white;
  background-color: green;
  padding: 2px 8px;
  border-radius: 16px;
}
</style>
