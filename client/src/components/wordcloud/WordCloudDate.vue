<template>
  <va-card>
    <div class="row">
      <div class="flex">
        <h3>Nube de palabras por rango de fechas</h3>
        <div class="flex">
          <div class="pickers">
            Desde:&nbsp;
            <VueDatePicker v-model="from" format="DD/MM/YYYY" minDate="2015" />
            Hasta:&nbsp;
            <VueDatePicker v-model="to" format="DD/MM/YYYY" minDate="2015" />
          </div>

          <br />
          <va-input
            label="Frecuencia minima (%)"
            v-model="minPercentage"
            v-on:keyup.enter="findArticles"
            type="number"
            min="1"
            max="100"
            class="input"
          >
            <va-button
              slot="append"
              @click="findArticles"
              style="margin-right: 0"
              small
            >
              Buscar
            </va-button>
          </va-input>
        </div>
      </div>

      <cloud
        :data="words"
        :fontSizeMapper="fontSizeMapper"
        :onWordClick="onClick"
      />
    </div>

    <va-modal v-model="showSmallModal" size="small" title="Palabra seleccionada"
    :message="this.selectedWord" okText="Aceptar" cancelText="Cerrar" />
  </va-card>
</template>

<script>
const axios = require("axios");
const moment = require("moment");
import Cloud from "vue-d3-cloud";

export default {
  name: "wordcloud",
  components: { Cloud },
  data() {
    return {
      minPercentage: 30,
      words: [],
      from: new Date(),
      to: new Date(),
      maxValue: 0,
      fontSize: 1,
      fontSizeMapper: (word) => this.getFontSize(word.value),
      showSmallModal: false,
      selectedWord: '',
    };
  },
  watch: {
    fontSize(newVal, oldVal) {
      this.fontSize = newVal;
    },
  },
  created() {
    this.findArticles();
  },
  methods: {
    onClick(word) {
      this.showSmallModal = true;
      this.selectedWord = `Palabra: ${word.text} - frecuencia: ${word.value}`;
    },
    async findArticles() {
      try {
        let dateFrom = moment(this.from).format("DD/MM/YYYY");
        let dateTo = moment(this.to).format("DD/MM/YYYY");

        let response = await axios.get(
          `/wordcloud/byDateRange?from=${dateFrom}&to=${dateTo}&minPercentage=${this.minPercentage}`
        );

        if (!response.data) {
          return this.showToast("No se pudo obtener la nube de palabras", {
            position: "bottom-right",
            icon: "fa-times",
          });
        }

        this.words = response.data;
        this.maxValue = this.words[0].value;
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
    getFontSize(value) {
      return (value * 70) / this.maxValue;
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

.input {
  width: 45% !important;
  min-width: 245px !important;
}

.pickers {
  min-width: 275px;
  display: flex; /* or inline-flex */
  flex-direction: row;
}

.slider {
  width: 70%;
}
</style>
