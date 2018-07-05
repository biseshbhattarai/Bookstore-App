<template>
<form>
         <div id="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="title"  class="form-control"/>
        </div>
         <div id="form-group">
            <label for="author">Author</label>
            <input type="text" id="author" v-model="author" class="form-control"/>
        </div>
         <div id="form-group">
            <label for="genre">Genre</label>
            <input type="text" id="genre" v-model="genre"  class="form-control"/>
        </div>
         <div id="form-group">
            <label for="pages">Pages</label>
            <input type="text" id="pages" v-model="pages"  class="form-control"/>
        </div>
         <!-- <div id="form-group">
            <label for="buyurl">BuyUrl</label>
            <input type="text" id="buyurl" v-model="buyurl" class="form-control"/>
        </div> -->
        <button type="Submit" value="Submit" v-on:click="ChangeBook" class="btn btn-primary">Submit</button>

    </form>
    
</template>

<script>
import axios from 'axios';
export default {
    name:'Edit',
    data(){
        return {
            title:'',
            genre:'',
            author:'',
            pages:'',
        }
    },
    mounted(){
        this.editBook();
    },
    methods:{
        editBook:function(){
            axios.get('http://localhost:5000/'+this.$route.params.id)
            .then((response)=>{
                
                this.title = response.data.title;
                this.genre = response.data.genre;
                this.author = response.data.author;
                this.pages = response.data.pages;
            })
        },
        ChangeBook:function(){
            axios.put('http://localhost:3000/book/'+this.$route.params.id, {
                title:this.title,
                author: this.author,
                genre : this.genre,
                pages : this.pages
            })
            .then((response)=>{
                console.log(response.data.title);
                console.log(response.data.genre);
            })
            this.$router.push('/');
        }
    }

}
</script>

<style>

</style>
