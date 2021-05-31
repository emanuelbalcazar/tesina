<template>
  <div class="row">
    <div class=" chart-card">
      <va-card title="Cantidad de articulos por mes">
        <va-chart
          class="chart chart--donut"
          :data="articlesPerMonth"
          type="horizontal-bar"
        />
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
    //this.getArticlesPerMonth();
  },
  methods: {
    async getArticlesPerMonth() {
      try {
        let response = await axios.get("/articles/perMonth");

        let labels = response.data.map((data) => {
          return data.month;
        });

        let data = response.data.map((data) => {
          return data.total;
        });

        let colors = response.data.map((data) => {
          let random = Math.floor(Math.random() * this.backgroundColor.length);
          return this.backgroundColor[random];
        });

        this.articlesPerMonth = {
          labels: labels,
          datasets: [
            {
              label: "Cantidad de articulos por mes",
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
  height: 450px;
}

.chart-card {
  margin-left: 2.5%;
}
</style>
