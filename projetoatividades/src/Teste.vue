<template>
    <div class="container" name="franquias">
      <h3>Faça parte você também da <span>nossa rede de franquias</span></span></h3>
      <div class="row">
          <div v-for="franquia in franquias" :key="franquia.id_franquia" class="col-md-2">
              <router-link  :to="{ name: 'interna-franquia', params: { id: franquia.id_franquia }}">
              <div class="blocks"><img :src="franquia.imagem" alt=""></div>
              <h4>{{ franquia.titulo }}</h4>
              </router-link>
          </div>
      </div>
      <router-link to="franqueado"><div class="bt">seja um franqueado</div></router-link>
      <!--<a href="/franqueado"><div class="bt">seja um franqueado</div></a>-->
    </div>
  </template>
  
  <script>
  export default {
      data() {
          return {
              franquias: []
          }
      },
      created() {
        this.$http.get('franquia_site')
            .then(res => res.json())
            .then(franquias => this.franquias = franquias, err => console.log(err));
      }
  }
  </script>