<template>
    <div class="container"><br><br><br><br><br><br><br><br><br><br><br>
            <div class="card cardClass">
                <div class="card-body">
                    <div class="row">
                                <div class="col-4"></div>
                                <div class="col-">
                                    <h2>Connectez-vous</h2>
                                </div>
                    </div>
                    <div class="row">
                                <div class="col-4"></div>
                                <div class="col-">
                                    <p>{{ serverResponse }}</p>
                                </div>
                    </div>
                    <form>
                            <div class="row">
                                <div class="col-4"></div>
                                <div class="col-">
                                    <input type="text" class="form-control" id="user" placeholder="Nom d'utilisateur" v-model="user">
                                </div>
                            </div><br>
                            <div class="row">
                                <div class="col-4"></div>
                                <div class="col-">
                                    <div class="input-group mb-3">
                                        <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" placeholder="Mot de passe" v-model="password">
                                        <span class="input-group-text" id="basic-addon2">
                                            <i v-on:click="showPassword = !showPassword" :class=" showPassword ? 'bi bi-eye-slash' : 'bi bi-eye' "></i>
                                        </span>
                                    </div>                      
                                </div>
                            </div><br>
                            <div class="row">
                                <div class="col-4"></div>
                                <div class="col-4">
                                    <button type="button" class="btn" id="btnConnexion" :disabled="!user || !password" @click="Login()"><span id="wordConnexion">Connexion</span></button>
                                </div>
                            </div><br>
                            <div class="row">
                                <div class="col-2"></div>
                                <div class="col-8">
                                <a :href="redirection">Créer un compte?</a>
                                </div>
                            </div><br>
                       
                          
                        </form>
                    </div>
                </div>  
        </div>     
</template>

<script>
    import axios from 'axios';
    export default ({
        name : 'loginPage',
        data(){
            return {

                user : '',
                password : '',
                serverResponse: '',
                showPassword: false,
                redirection : '#/createAccount'
            }
            
        },

        methods:{

            Login(){
                if(this.user == '' || this.password == ''){

                    this.serverResponse = 'Compléter le champ!'

                }
                else {

                    axios.post('http://localhost:3000/login', {

                        user : this.user,
                        password : this.password

                    })
                    .then(response => {

                       if (response.data == "L'utilisateur n'existe pas!" || response.data == "Mot de passe incorrecte!") this.serverResponse = response.data 

                       else {

                            let token = response.data
                            window.localStorage.setItem('token', token)
                            this.$router.push('/welcomePage')
                       }
                       
                    })
                    .catch(error => {
                        alert(error)
                    });
                }
           
            }
          
        }
    })
    
</script>

<style>
    #btnConnexion {
        background-color: #8d33ff;
    }
    #wordConnexion{
        color: azure;
    }
    .card {
        margin-left: 450px;
        margin-right: 450px;
        height:  330px;
    }
    p{
        color: red;
    }
    h2{
        color: #8d33ff;
    }
 
</style>