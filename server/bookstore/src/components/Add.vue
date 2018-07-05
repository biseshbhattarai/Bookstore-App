<template>
    <form>
        <div id="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="title" class="form-control"/>
        </div>
         <div id="form-group">
            <label for="author">Author</label>
            <input type="text" id="author" v-model="author" class="form-control"/>
        </div>
         <div id="form-group">
            <label for="genre">Genre</label>
            <input type="text" id="genre" v-model="genre" class="form-control"/>
        </div>
         <div id="form-group">
            <label for="pages">Pages</label>
            <input type="text" id="pages" v-model="pages" class="form-control"/>
        </div>
        
        <button type="Submit" value="Submit" v-on:click="AddBooks" class="btn btn-primary">Submit</button>

    </form>
</template>

<script>
import axios from 'axios';
export default {
    name:"add",
    data(){
        return{
            title:'',
            author:'',
            pages:'',
            genre:'',
            
            
        }
    },
 
    methods: {
        AddBooks:function(){
            axios.post('http://localhost:5000/add',{
                title:this.title,
                author:this.author,
                pages:this.pages,
                genre:this.genre,
            })
            .then((response)=>{
                console.log(response.data);
            })
            .catch((error)=>{
                console.log(error);
            })
            // this.$router.push('/');
        }
    }
}
</script>

<style>

</style>
