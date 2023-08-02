const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/RoutePage.vue'),
        children: [
          { path: '', component: () => import('pages/PokemonList.vue') },
          { path: '/pokemon-details/:pokemonNumber', component: () => import('pages/PokemonDetails.vue') },
          { path: '/choose-pokemons', component: () => import('pages/ChoosePokemons.vue') },
          { path: '/pokemon-compare/:pokemon1/:pokemon2', component: () => import('pages/PokemonCompare.vue') }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
