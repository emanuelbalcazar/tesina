<template>
    <div class="dashboard">
        <h1>
            Bienvenido al sistema de
            <b
                >Extracción, Análisis y Procesamiento Automático de Información
                Periodística relacionada al COVID-19 en Chubut</b
            >
        </h1>
        <br>
        <cloud :data="words" :fontSizeMapper="fontSizeMapper" />
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
            fontSizeMapper: word => Math.log2(word.value) * 5,
        };
    },
    created() {
        this.findArticles();
    },
    methods: {
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
