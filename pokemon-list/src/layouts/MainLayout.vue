<template>
  <q-layout>
    <q-header class="text-center bg-light-blue-6">
      <q-toolbar>
        <q-toolbar-title class="text-bold">
          Pokemon list
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-tabs class="text-light bg-light-blue-6">
        <q-route-tab to="/" name="/list" icon="list" label="List"/>
        <q-tab name="/favorites" icon="favorite" label="Favorites"/>
        <q-route-tab to="/choose-pokemons" name="/compare" icon="compare" label="Compare"/>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
</script>
