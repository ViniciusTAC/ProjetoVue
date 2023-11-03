<template>
    <div>
        <v-menu top offset-x>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Mudar status
                    <v-icon>
                        mdi-arrow-right-bold
                    </v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="(status) in listStatus" :key="status.idStatus" v-if="status.idStatus != task.idStatus">
                    <v-btn v-bind:color="status.color" variant="text" @click="dialog = true">
                        <span style="font-weight: bold;">
                            {{ status.tipo }}
                        </span>
                    </v-btn>
                </v-list-item>
            </v-list>

            <div class="text-center">
                <v-dialog v-model="dialog" width="500">

                    
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            Privacy Policy
                        </v-card-title>

                        <v-card-text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="dialog = false">
                                I accept
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </v-menu>
    </div>
</template>
  
<script>
export default {
    props: {
        task: {
            type: Object
        }
    },
    components: {
    },
    name: 'MudarStatusAtividade',
    data: () => ({
        listStatus: [],
        dialog: false,
    }),
    methods: {
        async getStatus() {
            const req = await fetch(" http://localhost:3000/status");
            this.listStatus = await req.json();
        },
        changeStatus(idStatus) {
            var dados = {
                idStatus: idStatus,
            }
            console.log(this.dialog)
            this.dialog = true

        },
        async changeStatusUpdate(dados) {
            // const res = await fetch('http://localhost:3000/atividades/' + this.$route.params.id, {
            //     method: 'PATCH',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(dados),
            // })
        },
    },
    created() {
        this.getStatus()
    },
    mounted() {
    },
    watch: {
        open(to, from) {
            if (to == false) {
                this.$router.push('/').catch(() => { })
            }
        }
    }
}
</script>
  
<style scoped></style>
  