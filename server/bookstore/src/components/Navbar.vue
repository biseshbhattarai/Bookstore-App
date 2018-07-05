<template>
<div>
     <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Bookstore</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/"><a class="nav-link">Home</a></router-link>
          </li>
        
          <li class="nav-item">
            <router-link to="/add"><a class="nav-link">Add</a></router-link>
          </li>
           <li class="nav-item">
            <router-link to="/addUser"><a class="nav-link">Register</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login"><a class="nav-link">Login</a></router-link>
          </li>
         
         
        </ul>
        
      </div>
    </nav>

    </div>
    
   
</template>

<script>
import axios from 'axios';
import Details from './Details';
export default {
    name:"Navbar",
}
</script>

<style>

</style>
