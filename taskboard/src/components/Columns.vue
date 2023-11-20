<template>
    <div class="columns">
        <v-row class="row">
            <v-col no-gutters v-for="(status) in status_list" :key="status.idStatus">
              <column :status="status" />
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
import Column from "./Column.vue"
import axios from 'axios';
export default {
    props: {},
    components: {
        Column,
    },
    name: 'Colunas',
    data: () => ({
        status_list: []
    }),
    methods: {
        getStatus() {
            axios.get('http://localhost:3000/statuses')
                .then(response => {
                    this.status_list = response.data;
                })
                .catch(error => {
                    console.error('Erro ao obter lista de status:', error);
                });
        }
    },
    created() {
    },
    mounted() {
        this.getStatus();
    },
}
</script>
  
<style scoped>
.columns {
    width: 150%;
    margin-top: 15px;
}

.row {
    margin: 0;
}
</style>
  
