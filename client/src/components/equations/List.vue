<template>
    <va-card :titleOnImage="title.table">
        <va-data-table
            :fields="fields"
            :data="items"
            :no-data-label="title.noData"
            :loading="loading"
            :per-page="parseInt(perPage)"
            :totalPages="totalPages"
            @page-selected="readItems"
            api-mode
        >
        </va-data-table>
    </va-card>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
    data() {
        return {
            title: {
                table: "Listado de ecuaciones",
                perPage: "Por Páginas",
                noData: "No se encontraron ecuaciones."
            },
            toSearch: "",
            perPage: 10,
            totalPages: 0,
            items: [],
            loading: false,
            toSearch: null
        };
    },
    computed: {
        fields() {
            return [
                {
                    name: "id",
                    title: "ID"
                },
                {
                    name: "dateToFind",
                    title: "Fecha de búsqueda",
                    callback: this.formatDate
                },
                {
                    name: "site.site",
                    title: "Sitio"
                },
                {
                    name: "start",
                    title: "Indice"
                },
                {
                    name: "lastExecution",
                    title: "Ultima ejecución",
                    callback: this.formatDate
                }
            ];
        }
    },
    created() {
        this.readItems();
    },
    methods: {
        search(toSearch) {
            this.toSearch = toSearch;
            this.readItems();
        },
        readItems(page = 1) {
            const params = {
                perPage: this.perPage,
                page: page,
                criteria: this.toSearch
            };

            axios.get("/equations", { params }).then(response => {
                this.items = response.data.data;
                this.totalPages = response.data.lastPage;
                this.perPage = response.data.perPage;
            });
        },
        formatDate(value) {
            return moment(value).format('DD/MM/YYYY');
        }
    }
};
</script>

<style lang="scss">
.data-table-server-pagination---avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>
