<template>
    <va-card>
        <div class="row">
            <div class="flex">
                <h3>Nube de palabras por sitio</h3>
                <div class="inputs flex">
                    <!-- site -->
                    <va-select
                        label="Sitio web"
                        v-model="selectedSite"
                        :options="sites"
                    />

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
                            style="margin-right: 0;"
                            small
                        >
                            Buscar
                        </va-button>
                    </va-input>
                </div>

                <va-slider
                    class="slider"
                    label="Tamaño de fuente"
                    :invert-label="true"
                    color="info"
                    value-visible
                    v-model="fontSize"
                    :step="step"
                    :min="min"
                    :max="max"
                />
            </div>

            <cloud
                :data="words"
                :fontSizeMapper="fontSizeMapper"
                :onWordClick="onClick"
            />
        </div>
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
            sites: [],
            step: 0.5,
            min: 0,
            max: 10,
            fontSize: 0.65,
            selectedSite: "",
            fontSizeMapper: word => this.getFontSize(word.value)
        };
    },
    mounted() {
        this.findSites();
    },
    watch: {
        fontSize(newVal, oldVal) {
            this.fontSize = newVal;
        }
    },
    methods: {
        onClick(word) {
            alert(`Click en: ${word.text} - frecuencia: ${word.value}`);
        },
        async findArticles() {
            try {
                let dateToSearch = moment(this.date).format("DD/MM/YYYY");
                let response = await axios.get(
                    `/wordcloud/bySite?site=${this.selectedSite}&minPercentage=${this.minPercentage}`
                );

                if (!response.data) {
                    return this.showToast(
                        "No se pudo obtener la nube de palabras",
                        { position: "bottom-right", icon: "fa-times" }
                    );
                }

                this.words = response.data;
            } catch (error) {
                if (error.response && error.response.data) {
                    return this.showToast(error.response.data.error, {
                        position: "bottom-right",
                        icon: "fa-times",
                        duration: 5000
                    });
                }
            }
        },
        async findSites() {
            try {
                axios.get("/wordcloud/sites").then(response => {
                    this.sites = JSON.parse(JSON.stringify(response.data));
                });
            } catch (error) {
                if (error.response && error.response.data) {
                    return this.showToast(error.response.data.error, {
                        position: "bottom-right",
                        icon: "fa-times",
                        duration: 5000
                    });
                }
            }
        },
        getFontSize(value) {
            return value * this.fontSize;
        }
    }
};
</script>

<style lang="scss">
.row-equal .flex {
    .va-card {
        height: 100%;
    }
}

.input {
    width: 100%;
}

.inputs {
    width: 300px;
}

.slider {
    width: 70%;
}
</style>
