<template>
  <div class="mb-10" v-if="searchHistory?.length">
    <v-card class="pa-10">
      <v-row align="center" justify="space-between">
        <v-card-title> Search history </v-card-title>
        <v-btn
          @click="handleCleanHistory"
          size="large"
          icon="mdi-delete-circle"
        ></v-btn>
      </v-row>
      <v-row>
        <v-col
          v-for="pokemon in searchHistory"
          :key="pokemon.name"
          cols="12"
          sm="4"
          md="3"
        >
          <PokemonCard
            :name="pokemon.name"
            :image="pokemon.image"
            :type="pokemon.type"
            :code="pokemon.code"
            @click="viewPokemon(pokemon)"
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const searchHistory = computed(() => store.state.searchHistory);

const handleCleanHistory = () => {
  store.dispatch("clearSearchHistory");
};
</script>
