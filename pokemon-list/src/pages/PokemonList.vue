<template>
  <q-page id="pokemonList">
    <q-scroll-area class="q-pa-md content-style">
      <q-list>
        <q-item v-for="pokemon in pokemons" :key="pokemon.name" clickable @click="navigateToDetails(pokemon)" class="q-pl-xl">
        <q-item-section avatar>
          <q-avatar square>
            <img :src="getImageUrl(pokemon)"/>
          </q-avatar>
        </q-item-section>
        <q-item-section class="text-h6 text-bold">{{ pokemon.name }}</q-item-section>
      </q-item>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      pokemons: []
    }
  },
  methods: {
    fetchPokemons () {
      fetch('https://pokeapi.co/api/v2/pokemon/?limit=1281&offset=0')
        .then((response) => response.json())
        .then((data) => {
          this.pokemons = data.results
          this.loading = false
        })
        .catch((error) => {
          console.error(error)
          this.loading = false
        })
    },
    navigateToDetails (pokemon) {
      const pokemonNumber = this.getPokemonNumber(pokemon.url)
      this.$router.push(`/pokemon-details/${pokemonNumber}`)
    },
    getPokemonNumber (url) {
      return url.split('/')[6]
    },
    getImageUrl (pokemon) {
      const pokemonNumber = this.getPokemonNumber(pokemon.url)
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`
    }
  },
  mounted () {
    this.fetchPokemons()
  }
}
</script>

<style lang="scss">
#pokemonList{
  .content-style{
    margin: 0 auto;
    height: calc(100vh - 150px);
    max-width: 500px;
  }
}
</style>
