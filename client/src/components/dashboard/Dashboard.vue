<template>
    <div class="dashboard">
        <h1>
            Bienvenido al sistema de
            <b
                >Extracción, Análisis y Procesamiento Automático de Información
                Periodística relacionada al COVID-19 en Chubut</b
            >
        </h1>

        <p>Max:{{max}}</p>
        <p>Min:{{min}}</p>
        <br>
        <cloud :data="words" :fontSizeMapper="fontSizeMapper" :onWordClick="onClick" />
    </div>
</template>

<script>
const axios = require("axios");
import Cloud from "vue-d3-cloud";

export default {
    name: "dashboard",
    components: { Cloud },
    data() {
        return {
            words: [],
            max: { text: '', value: 0},
            min: { text: '', value: 0 },
            fontSizeMapper: word => word.value * 0.4,
        };
    },
    created() {
        this.findArticles();
    },
    methods: {
        onClick(word) {
            alert(`Click en: ${word.text} - frecuencia: ${word.value}`)
        },
        async findArticles() {
            try {
                let response = await axios.post(
                    "/articles/findByExpectedDate",
                    { date: "01/03/2020" }
                );

                if (!response.data) {
                    return this.showToast(
                        "No se pudieron obtener los articulos",
                        { position: "bottom-right", icon: "fa-times" }
                    );
                }

                let ids = response.data.map(e => {
                    return e.id;
                });

                response = await axios.post(
                    "/normalizedArticles/getWordCloud",
                    { ids: ids }
                );

                if (!response.data) {
                    return this.showToast(
                        "No se pudieron obtener las palabras de los articulos",
                        { position: "bottom-right", icon: "fa-times" }
                    );
                }

                this.words = response.data;
                this.max = this.words[0];
                this.min = this.words[this.words.length - 1];
            } catch (error) {
                if (!error.response) {
                    return this.showToast("Error al obtener los articulos", {
                        position: "bottom-right",
                        icon: "fa-times"
                    });
                }
            }
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
.dashboard {
    .va-card {
        margin-bottom: 0 !important;
    }
}
</style>
