<template>
  <div class="dashboard">
    <h1>
      Bienvenido al sistema de
      <b
        >Extracción, Análisis y Procesamiento Automático de Información
        Periodística relacionada al COVID-19 en Chubut</b
      >
    </h1>

    <div class="row">
      <div class="flex xs6 sm4" v-for="(info, idx) in infoTiles" :key="idx">
        <va-card class="mb-4" :color="info.color">
          <p class="display-2 mb-0" style="color: white">
            {{ info.value }}
          </p>
          <p>{{ info.text }}</p>
        </va-card>
      </div>

      <va-card class="xs6 sm4 d-flex dashboard-contributors-list">
        <va-card-title><b>Top 5 palabras más frecuentes</b></va-card-title>
        <br /><br />
        <va-inner-loading :loading="loading">
          <div class="mb-3" v-for="(word, idx) in mostFrecuentWords" :key="idx">
            <va-progress-bar
              :value="getPercent(word.total)"
              :color="getRandomColor()"
            >
              {{ word.word }}
            </va-progress-bar>
            {{ word.total }}
          </div>
        </va-inner-loading>
      </va-card>

      <div class="xs6 xl6 d-flex chart-card">
        <va-card>
          <va-card-title><b>Articulos por sitio</b></va-card-title>
          <br />
          <va-chart
            class="chart chart--donut"
            :data="articlesPerSite"
            type="horizontal-bar"
          />
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "dashboard",
  components: {},
  data() {
    return {
      articlesCount: 0,
      mostFrecuentWords: [],
      articlesPerSite: {},
      progressMax: 100,
      loading: false,
      infoTiles: [
        {
          color: "success",
          value: 0,
          text: "Articulos extraidos",
          icon: "",
        },
        {
          color: "danger",
          value: 0,
          text: "Articulos normalizados",
          icon: "",
        },
        {
          color: "info",
          value: 0,
          text: "Palabras obtenidas",
          icon: "",
        },
      ],
    };
  },
  created() {
    this.getArticlesCount();
    this.getNormalizedArticlesCount();
    this.getWordCount();
    this.getMostFrecuentWords();
    this.getArticlesPerSite();
  },
  methods: {
    async getArticlesCount() {
      try {
        let response = await axios.get("/articles/count");
        this.infoTiles[0].value = response.data.total;
      } catch (error) {
        return this.showToast("No se pudieron obtener el total de articulos", {
          position: "bottom-right",
          icon: "fa-times",
          duration: 5000,
        });
      }
    },
    async getNormalizedArticlesCount() {
      try {
        let response = await axios.get("/normalizedArticles/count");
        this.infoTiles[1].value = response.data.total;
      } catch (error) {
        return this.showToast(
          "No se pudieron obtener el total de articulos normalizados",
          {
            position: "bottom-right",
            icon: "fa-times",
            duration: 5000,
          }
        );
      }
    },
    async getWordCount() {
      try {
        let response = await axios.get("/globalwords/count");
        this.infoTiles[2].value = response.data.total;
      } catch (error) {
        return this.showToast(
          "No se pudieron obtener la cantidad de palabras",
          {
            position: "bottom-right",
            icon: "fa-times",
            duration: 5000,
          }
        );
      }
    },
    async getMostFrecuentWords() {
      try {
        let response = await axios.get("/globalwords/mostfrecuent?limit=5");
        this.mostFrecuentWords = response.data.data;

        this.progressMax = Math.max(
          ...this.mostFrecuentWords.map((word) => word.total)
        );
      } catch (error) {
        return this.showToast(
          "No se pudieron obtener las palabras mas frecuentes",
          {
            position: "bottom-right",
            icon: "fa-times",
            duration: 5000,
          }
        );
      }
    },
    async getArticlesPerSite() {
      try {
        let response = await axios.get("/articles/totalPerSite");

        let labels = response.data.map((site) => {
          return site.displayLink;
        });

        let data = response.data.map((site) => {
          return site.count;
        });

        this.articlesPerSite = {
          labels: labels,
          datasets: [
            {
              label: "Articulos por sitio",
              backgroundColor: [
                this.$themes.danger,
                this.$themes.dark,
                this.$themes.primary,
                this.$themes.info,
                this.$themes.secondary,
                this.$themes.warning,
                this.$themes.success,
                this.$themes.danger,
              ],
              data: data,
            },
          ],
        };
      } catch (error) {
        return this.showToast(
          "No se pudieron obtener la cantidad de articulos por sitio",
          {
            position: "bottom-right",
            icon: "fa-times",
            duration: 5000,
          }
        );
      }
    },
    getPercent(val) {
      return (val / this.progressMax) * 100;
    },
    getRandomColor() {
      const keys = Object.keys(this.$themes);
      return this.$themes[keys[(keys.length * Math.random()) << 0]];
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
.dashboard {
  .va-card {
    margin-bottom: 0 !important;
  }
}

.dashboard-contributors-list {
  flex-direction: column;
  .inner-loading {
    height: 100%;
  }
  height: 100%;
  width: 32%;
}

.chart {
  height: 350px;
}

.chart-card {
  margin-left: 2.5%;
}
</style>
