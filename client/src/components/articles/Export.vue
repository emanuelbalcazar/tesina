<template>
    <va-card title="Exportar articulos">
        <div class="filters">
            <h3>Seleccione el rango de fechas</h3>
            <br />
            <div class="pickers">
                Desde:&nbsp;
                <VueDatePicker
                    v-model="from"
                    format="DD/MM/YYYY"
                    minDate="2020-03"
                />
                Hasta:&nbsp;
                <VueDatePicker
                    v-model="to"
                    format="DD/MM/YYYY"
                    minDate="2020-03"
                />
            </div>
            <br />
            <va-select
                label="Sitios web"
                v-model="selectedSites"
                multiple
                :options="sites"
            />

            <br />
            <va-button @click="getData" style="margin-right: 0;">
                Buscar
            </va-button>

            <hr />
            <p>Cantidad de articulos obtenidos: {{ this.info.total }}</p>
            <br />
            <va-button color="info">
                <download-csv :data="data" :name="filename">
                    Descargar CSV
                </download-csv>
            </va-button>
        </div>
    </va-card>
</template>

<script>
import axios from "axios";
const moment = require("moment");

export default {
    data() {
        return {
            from: new Date(),
            to: new Date(),
            data: [],
            info: { total: 0 },
            sites: [],
            selectedSites: [],
            filename: 'articulos.csv'
        };
    },
    computed: {},
    created() {
        this.findSites();
    },
    methods: {
        async findSites() {
            try {
                axios.get("/articles/sites").then(response => {
                    this.sites = response.data;
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
        async getData() {
            try {
                let dateFrom = moment(this.from).format("DD/MM/YYYY");
                let dateTo = moment(this.to).format("DD/MM/YYYY");
                let sites = JSON.parse(JSON.stringify(this.selectedSites));

                const params = {
                    from: dateFrom,
                    to: dateTo,
                    sites: sites
                };

                let response = await axios.get("/articles/export", { params });
                this.data = response.data.data;
                this.info = response.data;

                this.filename = `articulos-${this.info.total}.csv`;

                this.showToast(`${this.info.total} articulos obtenidos`, {
                    position: "bottom-right",
                    icon: "fa-check"
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
        }
    }
};
</script>

<style lang="scss">
.pickers {
    display: flex; /* or inline-flex */
    flex-direction: row;
}

.filters {
    width: 40%;
}
</style>
