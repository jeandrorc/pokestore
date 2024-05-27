<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">Last visited pokemons</h1>
      </v-col>
    </v-row>
    <v-row v-if="visitedPokemons.length">
      <v-col
        v-for="pokemon in visitedPokemons"
        :key="pokemon.name"
        cols="12"
        sm="6"
        md="4"
      >
        <PokemonCard
          :name="pokemon.name"
          :image="pokemon.image"
          :type="pokemon.type"
          :code="pokemon.id"
          @click.native="goToPokemonDetail(pokemon)"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <p class="text-center">Nenhum Pokémon visualizado ainda.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import PokemonCard from '@/components/PokemonCard.vue';

const store = useStore();
const router = useRouter();

const visitedPokemons = computed(() => store.state.visitedPokemons);

const goToPokemonDetail = (pokemon) => {
  router.push(`/pokemon/${pokemon.name}`);
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
