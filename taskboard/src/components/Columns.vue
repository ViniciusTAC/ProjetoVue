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
        async getStatus() {
            const req = await fetch("http://localhost:3000/status");
            this.status_list = await req.json();
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
.row{
    margin: 0;
}
</style>
  
