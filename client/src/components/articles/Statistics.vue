<template>
  <va-card>
    <div class="row">
      <div class="flex">
        <h3>Articulos por sitio y fecha</h3>
        <div class="inputs flex">
          <!-- site -->
          <va-select
            label="Sitio web"
            v-model="selectedSite"
            :options="sites"
          />

          <va-button
            slot="append"
            @click="countByDate"
            style="margin-right: 0"
            small
          >
            Buscar
          </va-button>
        </div>
        <va-chart
          class="chart"
          ref="lineChart"
          :data="articlesByDateChart"
          type="line"
        />
      </div>
    </div>
  </va-card>
</template>

<script>
import axios from "axios";
const moment = require("moment");

export default {
  data() {
    return {
      sites: [],
      selectedSite: "",
      articlesByDateChart: {},
    };
  },
  computed: {},
  created() {
    this.findArticleSites();
  },
  methods: {
    async findArticleSites() {
      try {
        let response = await axios.get(`/articles/sites`);

        if (!response.data) {
          return this.showToast(
            "No se pudo obtener los sitios de los articulos",
            {
              position: "bottom-right",
              icon: "fa-times",
            }
          );
        }

        this.sites = JSON.parse(JSON.stringify(response.data));
      } catch (error) {
        if (error.response && error.response.data) {
          return this.showToast(error.response.data.error, {
            position: "bottom-right",
            icon: "fa-times",
            duration: 5000,
          });
        }
      }
    },
    async countByDate() {
      try {
        let response = await axios.get(
          `/articles/countByDate?site=${this.selectedSite}`
        );

        if (!response.data) {
          return this.showToast("No se pudo obtener los articulos", {
            position: "bottom-right",
            icon: "fa-times",
          });
        }

        let labels = response.data.map((site) => {
          return site.month;
        });

        let data = response.data.map((site) => {
          return site.count;
        });

        this.articlesByDateChart = {
          labels: labels,
          datasets: [
            {
              label: "Cantidad de articulos",
              backgroundColor: [this.$themes.primary],
              data: data,
            },
          ],
        };
      } catch (error) {
        if (error.response && error.response.data) {
          return this.showToast(error.response.data.error, {
            position: "bottom-right",
            icon: "fa-times",
            duration: 5000,
          });
        }
      }
    },
  },
};
</script>

<style lang="scss">
.row-equal .flex {
  .va-card {
    height: 100%;
    max-height: 100%;
  }
}

.input {
  width: 100%;
}

.inputs {
  width: 300px;
}

</style>
