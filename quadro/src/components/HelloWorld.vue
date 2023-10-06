<template>
  <div class="hello" data-app>
    <div >
      <Atividades/>
    </div>

  </div>
</template>

<script>
import Atividades from './Atividades.vue';
export default {
  components:{
    Atividades,
  },
  name: 'HelloWorld',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
Atividades {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
