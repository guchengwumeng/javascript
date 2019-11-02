<template>
  <div id="app">
    <router-view />
    <router-link to="/home"></router-link>
    <alert ref="alert"></alert>
  </div>
</template>

<script>
import Vue from 'vue'
import alert from "@/components/alert/alerta.vue";
export default {
  data() {
    return {};
  },
  mounted() {
    Vue.prototype.$alert = this.$refs.alert;
  },
  components: { alert }
};
</script>