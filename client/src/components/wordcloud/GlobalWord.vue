<template>
    <va-card :titleOnImage="title.table">
        <div class="row align--center">
            <div class="flex xs12 md4">
                <va-input
                    :value="toSearch"
                    placeholder="Buscar..."
                    @input="search"
                >
                    <va-icon name="fa fa-search" slot="prepend" />
                </va-input>
            </div>
        </div>
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

export default {
    data() {
        return {
            title: {
                table: "Listado de palabras globales",
                perPage: "Por Páginas",
                search: "Buscar por palabra",
                noData: "No se encontraron palabras."
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
                    name: "word",
                    title: "Palabra"
                },
                {
                    name: "total",
                    title: "Frecuencia Total"
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

            axios.get("/globalwords", { params }).then(response => {
                this.items = response.data.data;
                this.totalPages = response.data.lastPage;
                this.perPage = response.data.perPage;
            });
        },
        search(toSearch) {
            this.toSearch = toSearch;
            this.readItems();
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
