<template>
  <v-container>
    <v-text-field
      variant="outlined"
      class="search-bar"
      v-model="search"
      label="Search a Pokemon"
      append-inner-icon="mdi-magnify"
      @keyup.enter="searchPokemons"
      @click:append="searchPokemons"
    ></v-text-field>
    <v-row class="pa-3 mb-5" v-if="search.length && !searchResults.length && !loading && isSearching">
      <v-alert
        type="info"
        title="Not Found"
        class="w-100"
        icon="mdi-alert-circle"
      >
        No results found for "{{ search }}"
      </v-alert>
    </v-row>
    <search-history />
    <v-row>
      <v-col
        v-for="pokemon in results"
        :key="pokemon.name"
        cols="12"
        sm="4"
        md="3"
      >
        <pokemon-card
          :name="pokemon.name"
          :image="pokemon.image"
          :type="pokemon.type"
          :code="pokemon.code"
          @click="viewPokemon(pokemon)"
        />
      </v-col>
    </v-row>
    <div class="loading" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="d-flex justify-center my-4"
      ></v-progress-circular>
    </div>
    <v-pagination
      v-if="results.length && !loading"
      v-model="currentPage"
      :length="pageCount"
      @update:model-value="fetchPokemonsByPage"
    ></v-pagination>
  </v-container>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const search = ref("");
const loading = ref(false);
const currentPage = ref(1);
const isSearching = ref(false);

const results = computed(() => store.state.pokemons);
const totalPokemons = computed(() => store.state.totalPokemons);
const searchResults = computed(() => store.state.searchResults);

const pageCount = computed(() => Math.ceil(totalPokemons.value / 20));

const viewPokemon = (pokemon) => {
  store.commit("addVisitedPokemon", pokemon);
  router.push(`/pokemon/${pokemon.name}`);
};

const fetchPokemonsByPage = async (page) => {
  if (loading.value) return;
  loading.value = true;
  currentPage.value = page;
  await store.dispatch("fetchPokemonsByPage", page);
  loading.value = false;
};

const searchPokemons = async () => {
  if (search.value.trim()) {
    loading.value = true;
    isSearching.value = true;
    await store.dispatch("searchPokemons", search.value);
    loading.value = false;
    if (searchResults.value.length === 1) {
      viewPokemon(searchResults.value[0]);
    }
  } else {
    store.commit("setSearchResults", []);
  }

  setTimeout(() => {
    isSearching.value = false;
  }, 2000);
};

onMounted(() => {
  fetchPokemonsByPage(currentPage.value);
});
</script>


<style scoped>
.loading {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  display: flex;
  padding: 10px;
  width: 50px;
  height: 50px;
  align-items: center;
  border-radius: 25px;
}

</style>
