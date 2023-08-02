<template>
  <q-page id="routeSelect">

    <div class="q-pa-md form-style">
      <div class="text-h6 q-pb-md">Which pokemons do you want to compare?</div>

      <div class="content-dropdown">
       <q-btn-dropdown color="primary" :label="selectedPokemon1Name ? selectedPokemon1Name : 'Select one pokemon'">
        <q-list>
          <q-item v-for="pokemon in pokemons" :key="pokemon.name" clickable @click="selectPokemon1(pokemon.url, pokemon.name)"
            class="q-pl-xl">
            <q-item-section avatar>
              <q-avatar square>
                <img :src="getImageUrl(pokemon)" />
              </q-avatar>
            </q-item-section>
            <q-item-section class="text-h6 text-bold">{{ pokemon.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-icon name="compare" class="q-px-md" color="grey" size="32px" />

      <q-btn-dropdown color="primary" :label="selectedPokemon2Name ? selectedPokemon2Name : 'Select one pokemon'">
        <q-list>
          <q-item v-for="pokemon in pokemons" :key="pokemon.name" clickable @click="selectPokemon2(pokemon.url, pokemon.name)"
            class="q-pl-xl">
            <q-item-section avatar>
              <q-avatar square>
                <img :src="getImageUrl(pokemon)" />
              </q-avatar>
            </q-item-section>
            <q-item-section class="text-h6 text-bold">{{ pokemon.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      </div>

      <div class="q-pt-md">
        <q-btn clickable @click="navigateToCompare()" size="lg" class="full-width" color="blue" label="Compare" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      pokemons: [],
      selectedPokemon1Number: null,
      selectedPokemon1Name: null,
      selectedPokemon2Number: null,
      selectedPokemon2Name: null
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
    getPokemonNumber (url) {
      return url.split('/')[6]
    },
    getImageUrl (pokemon) {
      const pokemonNumber = this.getPokemonNumber(pokemon.url)
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`
    },
    selectPokemon1 (pokemonURL, pokemonName) {
      this.selectedPokemon1Name = pokemonName
      const pokemonNumber = this.getPokemonNumber(pokemonURL)
      this.selectedPokemon1Number = pokemonNumber
    },
    selectPokemon2 (pokemonURL, pokemonName) {
      this.selectedPokemon2Name = pokemonName
      const pokemonNumber = this.getPokemonNumber(pokemonURL)
      this.selectedPokemon2Number = pokemonNumber
    },
    navigateToCompare () {
      if (this.selectedPokemon1Number || this.selectedPokemon2Number) {
        this.$router.push(`/pokemon-compare/${this.selectedPokemon1Number}/${this.selectedPokemon2Number}`)
      }
    }
  },
  mounted () {
    this.fetchPokemons()
  }
}
</script>

<style lang="scss">
#routeSelect {
  .form-style {
    margin: 0 auto;
    height: calc(100vh - 200px);
    max-width: 500px;
  }
  .content-dropdown{
    display: flex;
    max-width: 300px;
    margin: 24px 0px;
  }
}
</style>
