<template>
     <form v-on:submit.prevent="Login">
        <div id="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" class="form-control"/>
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
    name:'Login',
    data(){
        return {
            username:'',
            password:''
        }
    },
    methods:{
        Login(){
            axios.post('http://localhost:5000/login',{
                username:this.username,
                password:this.password
            })
            .then(response => {
                localStorage.setItem('jwtToken', response.data.token)
                this.$router.push('/')
            })
            .catch(err => console.log(err));
        }
    }
}
</script>

<style>

</style>
