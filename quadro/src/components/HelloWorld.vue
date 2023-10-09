<template>
  <div class="hello" data-app>
    <div class="add">
      <Atividades />
    </div>
    <br>      <br>      <br>      <br>      <br>
  </div>
</template>

<script>
import Atividades from './Atividades.vue';
export default {
  components: {
    Atividades,
  },
  name: 'HelloWorld',
  props: {
  }
}
</script>


<style scoped>
.add {
  margin-right: 15px;
  float: right;
}

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
