<template>
    <div class="text-center">
        <ul class="list-group">
            <li class="list-group-item"><strong>Title:  </strong> {{book.title}}</li>
            <li class="list-group-item"><strong>Author:  </strong> {{book.author}}</li>
            <li class="list-group-item"><strong>Genre:  </strong> {{book.genre}}</li>
            <li class="list-group-item"><strong>Pages:  </strong> {{book.pages}}</li>
        </ul>
        <br>
        <br>
        <router-link v-bind:to="{name: 'edit', params:{id:book._id}}"><a class="btn btn-primary">Edit</a></router-link> 
        <br>
        <br>

        <button class="btn btn-danger" v-on:click="DeleteBook">Delete</button> 

    </div>
  
</template>

<script>
import axios from 'axios';
export default {
    name:"details",
    data(){
        return{
            book : []
        }
    },
    mounted(){
        this.oneBook();
    },
    methods:{
        oneBook:function(){
            console.log(this.$route.params.id);
            console.log('http://localhost:5000/'+this.$route.params.id)
            axios.get('http://localhost:5000/' + this.$route.params.id)
            .then((response)=>{
                console.log(response.data.author);
                this.book = response.data
            })
            .catch((error)=>{
                console.log(error);
            })
           
        },
        DeleteBook:function(){
            alert("Deleting Book");
            axios.delete('http://localhost:3000/book/delete/'+this.$route.params.id ,{
                title:this.book.title,
                genre:this.book.title,
                author:this.book.author,
                pages:this.book.pages
            })
            .then((response)=>{
                console.log(response)
            })
            .catch((error)=>{
                console.log(error);
            })
            this.$router.push('/');
        }
        
         
        
    }

}
</script>

<style>

</style>
