<template>
  <v-container class="pokemon-details">
    <v-row>
      <v-col cols="12" class="text-center">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          class="my-5"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="pokemon && !loading">
      <v-col cols="12" md="6" class="text-center">
        <v-img :src="image" class="pokemon-image"></v-img>
        <h1 class="pokemon-name">#{{ pokemon.id }} {{ pokemon.name }}</h1>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12">
            <div>
          <v-chip
            v-for="(type, index) in pokemon.types"
            :key="index"
            :style="{ backgroundColor: getTypeColor(type.type.name).background, color: getTypeColor(type.type.name).text }"
            class="type-chip"
          >
            {{ type.type.name }}
          </v-chip>
        </div>
            <h2 class="section-title">Abilities</h2>
            <ul class="abilities-list">
              <li v-for="(ability, index) in pokemon.abilities" :key="index">
                {{ ability.ability.name }}
              </li>
            </ul>
          </v-col>
          <v-col cols="12">
            <h2 class="section-title">Stats</h2>
            <v-row>
              <v-col v-for="(stat, index) in pokemon.stats" :key="index" cols="12" md="6">
                <div class="stat-container">
                  <span>{{ stat.stat.name }}</span>
                  <span>{{ stat.base_stat }}</span>
                </div>
                <v-progress-linear :value="stat.base_stat" :max="150" color="primary"></v-progress-linear>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <h2 class="section-title">Moves</h2>
            <div>
              <v-chip
                v-for="(move, index) in pokemon.moves"
                :key="index"
                class="move-chip"
              >
                {{ move.move.name }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { pokemonTypeColors } from '@/constants/pokemonTypes';

export default {
  data() {
    return {
      pokemon: null,
      image: null,
      loading: true
    };
  },
  async created() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.name}`);
      this.pokemon = await response.json();
      this.image = this.pokemon?.sprites?.other?.['official-artwork']?.front_default
    } catch (error) {
      console.error('Failed to fetch Pokémon data:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    getTypeColor(type) {
      const typeKey = type.toLowerCase();
      return pokemonTypeColors[typeKey] || { background: '#FFFFFF', text: '#000000' }; // Fallback
    }
  }
};
</script>

<style scoped>
.pokemon-details {
  background-color: #111;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
}
.pokemon-image {
  max-height: 600px;
  margin: 0 auto;
}
.pokemon-name {
  color: #00ff00;
  font-size: 2em;
  font-weight: bold;
  margin: 20px 0;
}
.type-chip {
  margin: 5px;
}
.section-title {
  color: #00ff00;
  font-size: 1.5em;
  margin-top: 20px;
  margin-bottom: 10px;
}
.stat-container {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  text-transform: uppercase;
}
.move-chip {
  margin: 5px;
}
.abilities-list {
  list-style: none;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  gap: 1em;
  text-transform: uppercase;
}
</style>
