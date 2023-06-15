<template>
  <div id="app" class="container is-max-desktop">
  <div class="columns is-centered">
  <div class="column">
    <router-link
      :to="{ path: '/customers', name: 'CustomerList' }"
      
      >Customers</router-link
    > |
    <router-link
      :to="{ path: '/items', name: 'ItemList' }"
      
      >Items</router-link
    > |
    <router-link
      :to="{ path: '/sales', name: 'SalesList' }"
      
      >Sales</router-link
    > 
    <router-view />
  </div>
  </div>
  </div>
</template>
  
<script>
export default {
  name: "App",
};
</script>
  
<style>
@import "~bulma/css/bulma.css";
</style>