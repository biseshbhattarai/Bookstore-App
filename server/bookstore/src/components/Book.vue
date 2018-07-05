<template>
<div>
    
    <!-- <button v-on:click="clicked" class="btn btn-success">Click</button> -->
    <br>
    <br>
    <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Pages</th>
                  <!-- <th>Buy Url</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="book in books" v-bind:key="book._id">
                  <router-link v-bind:to="{name: 'details', params:{id:book._id}}"><td>{{book.title}}</td></router-link>
                  <td>{{book.author}}</td>
                  <td>{{book.genre}}</td>
                  <td>{{book.pages}}</td>
                  <!-- <td>{{book.buyurl}}</td> -->
                </tr>
              </tbody>
            </table>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name:'Book',
    data(){
        return {
            books : []
        }
            
          
    },
    created(){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
        axios.get('http://localhost:5000')
        .then((response)=>{
            console.log(response.data);
            this.books  = response.data.books;
            
        })
        .catch(error => {
            
            if(error.response.status === 401){
                this.$router.push('/login')
            }
        })
    }
  
}
</script>

<style>

</style>
