import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {
    pokemons: [],
    visitedPokemons: [],
    searchHistory: [],
    searchResults: [],
    totalPokemons: 0,
    nextUrl: "https://pokeapi.co/api/v2/pokemon?limit=20",
  },
  mutations: {
    setPokemons(state, pokemons) {
      state.pokemons = pokemons;
    },
    addPokemons(state, pokemons) {
      state.pokemons = [...state.pokemons, ...pokemons];
    },
    setNextUrl(state, url) {
      state.nextUrl = url;
    },
    addVisitedPokemon(state, pokemon) {
      state.visitedPokemons.push(pokemon);
    },
    setSearchResults(state, results) {
      state.searchResults = results;
      if (results.length) {
        const newArray = [...state.searchHistory, results[0]];
        const uniqueArray = Array.from(new Set(newArray.map(p => p.name))).map(name => {
          return newArray.find(p => p.name === name);
        });
        state.searchHistory = uniqueArray;
      }
    },
    setTotalPokemons(state, total) {
      state.totalPokemons = total;
    },
    clearSearchHistory(state) {
      state.searchHistory = [];
    }
  },
  actions: {
    async fetchPokemons({ commit }) {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await response.json();
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          const details = await detailsResponse.json();
          return {
            name: details.name,
            image: details.sprites.front_default,
            type: details.types.map((typeInfo) => typeInfo.type.name).join(", "),
            code: details.id,
          };
        })
      );
      commit("setPokemons", detailedPokemons);
      commit("setNextUrl", data.next);
    },
    async fetchPokemonsByPage({ commit }, page) {
      console.log("Fetching parsed pokemons...", commit, page);
      const limit = 20;
      const offset = (page - 1) * limit;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          const details = await detailsResponse.json();
          return {
            name: details.name,
            image: details.sprites.front_default,
            type: details.types.map((typeInfo) => typeInfo.type.name).join(", "),
            code: details.id,
          };
        })
      );
      commit("setPokemons", detailedPokemons);
      commit("setTotalPokemons", data.count);
    },
    async searchPokemons({ commit }, query) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      if (response.ok) {
        const details = await response.json();
        const pokemons = [
          {
            name: details.name,
            image: details.sprites.front_default,
            type: details.types.map((typeInfo) => typeInfo.type.name).join(", "),
            code: details.id,
          },
        ];
        commit("setSearchResults", pokemons);
      } else {
        commit("setSearchResults", []); // Clear results if no match found
      }
    },
    async clearSearchHistory({ commit}) {
      commit("clearSearchHistory");
    }
  },
  plugins: [createPersistedState()],
});

export default store;
