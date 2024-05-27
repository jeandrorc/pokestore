<template>
  <v-card class="d-flex flex-column align-center pb-4 bg-grey-darken-4" :style="{ border: `solid 1px ${backgroundColor}`}">
    <div class="image-section">
      <div class="avatar-container">
        <v-img :src="image" aspect-ratio="1" class="white--text align-end" max-width="200px" max-height="200px"/>
      </div>
    </div>
    <div class="body">
      <v-card-title :style="{ color: backgroundColor }" class="text-uppercase font-weight-bold">{{ name }}</v-card-title>
      <v-card-subtitle class="d-flex flex-row align-center justify-space-between">
        <div class="d-flex flex-wrap">
          <v-chip
            class="text-uppercase font-weight-bold ma-1"
            v-for="(type, index) in types"
            :key="index"
            :style="{ color: textColor, backgroundColor: getTypeColor(type) }"
          >
            {{ type }}
          </v-chip>
        </div>
      </v-card-subtitle>
      <div class="text-h2 font-weight-black code" :style="{ color: backgroundColor}">{{ code }}</div>
    </div>
  </v-card>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { pokemonTypeColors } from "@/constants/pokemonTypes";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
});

const types = computed(() => props.type.split(",").map(type => type.trim()));

const backgroundColor = computed(() => {
  const primaryType = types.value[0].toLowerCase();
  return pokemonTypeColors[primaryType]?.background || "#FFFFFF"; // Branco como fallback
});

const textColor = computed(() => {
  const primaryType = types.value[0].toLowerCase();
  return pokemonTypeColors[primaryType]?.text || "#FFFFFF"; // Branco como fallback
});

const getTypeColor = (type) => {
  const typeKey = type.toLowerCase();
  return pokemonTypeColors[typeKey]?.background || "#FFFFFF"; // Branco como fallback
};

</script>

<style scoped>
.v-img {
  max-height: 200px;
}
.code {
  position: absolute;
  display: flex;
  top: 10px;
  left: 10px;
  opacity: 0.3;
  z-index: -1;
}
.avatar-container {
  background-color: rgba(0,0,0,0.3);
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin: 1em;
}
.image-section {
  flex: 1;
  display: flex;
}
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
