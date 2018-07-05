<template>
    <form v-on:submit.prevent="Submit">
        <div id="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" class="form-control"/>
        </div>
         <div id="form-group">
            <label for="email">Email</label>
            <input type="text" id="email" v-model="email" class="form-control"/>
        </div>
         <div id="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" class="form-control"/>
        </div>
         
        <button type="Submit" value="Submit"  class="btn btn-primary">Submit</button>
    </form>
</template>

<script>
import axios from 'axios';
export default {
    name:'addUser',
    data(){
        return {
            username:'',
            email:'',
            password:''
        }
    },
    methods:{
        Submit(){
            axios.post('http://localhost:5000/register', {
                username:this.username,
                email:this.email,
                password:this.password
            })
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
            
        }
    }
}
</script>

<style>

</style>
