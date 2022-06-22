<template>
  <div class="row">
    <div class="chart-card">
      <va-input v-model="word" placeholder="Buscar...">
        <va-icon name="fa fa-search" slot="prepend" />
      </va-input>
      <va-button v-on:click="getCountWordOrderedBySite">Buscar</va-button>
      <br />
      <br />
      <b>Cantidad de veces que aparece por sitio la palabra: {{ this.word }}</b>
      <br>
      <va-card titleOnImage="Cantidad de articulos por mes">
        <va-chart class="chart" :data="articlesPerMonth" type="vertical-bar" />
      </va-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      articlesPerMonth: {},
      word: "provincia",
      backgroundColor: [
        this.$themes.danger,
        this.$themes.dark,
        this.$themes.primary,
        this.$themes.info,
        this.$themes.secondary,
        this.$themes.success,
        this.$themes.warning,
        this.$themes.danger,
      ],
    };
  },
  created() {
    this.getCountWordOrderedBySite();
  },
  methods: {
    changeInput(e) {
        console.log(e);
    },
    async getCountWordOrderedBySite(word) {
      try {
        console.log(word)

        let response = await axios.get(
          `/wordcloud/getCountWordOrderedBySite?word=${this.word}`
        );

        let labels = response.data.map((data) => {
          return data.site;
        });

        let data = response.data.map((data) => {
          return data.count;
        });

        let colors = response.data.map((data) => {
          let random = Math.floor(Math.random() * this.backgroundColor.length);
          return this.backgroundColor[random];
        });

        this.articlesPerMonth = {
          labels: labels,
          datasets: [
            {
              label: `Cantidad de apariciones de ${this.word}`,
              backgroundColor: colors,
              data: data,
            },
          ],
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.row-equal .flex {
  .va-card {
    height: 100%;
  }
}

.chart {
  height: 400px;
}

.chart-card {
  margin-left: 2.5%;
}
</style>
