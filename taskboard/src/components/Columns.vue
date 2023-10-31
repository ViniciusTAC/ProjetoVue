<template>
    <div class="columns">
        <v-row>
            <v-col v-for="n in 6">
                <column />
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
    }),
}
</script>
  
<style scoped>
.columns {
    margin-top: 15px;
}
</style>
  
