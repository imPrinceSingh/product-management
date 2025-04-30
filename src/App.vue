<script setup>
import HelloWorld from './components/ProductForm.vue'
</script>

<template>
  <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
     <div class="container">
       <a class="navbar-brand" href="#">
         <img src="./assets/vue.svg" alt="" width="30" height="24"> Product Management System
       </a>
     </div>
   </nav>
   <section class="bg-light bg-gradient">
     <HelloWorld />
   </section>
</template>

<style scoped>
nav{
  height: 100px;
  background-color: green;
  width: 1350px;
}
section{
  margin: 0 2rem;
  padding: 2rem;
  width: 1290px;
}
/* @media (min-width: 992px) {
  nav, section {
    max-width: 1290px;
    margin: auto;
  }
} */

/* Smaller screen adjustments */
@media (max-width: 768px) {
  nav {
    height: 80px;
    width: 768px;
  }

  section {
    margin: 1rem;
    padding: 1rem;
    width: 568px;
  }
}
</style>
