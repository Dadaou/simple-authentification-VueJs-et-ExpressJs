<template>
    <div class="container"><br><br><br><br><br><br><br><br><br><br><br>
            <div class="card cardClass">
                <div class="card-body">
                    <div class="row">
                                <div class="col-4"></div>
                                <div class="col-">
                                    <h2>Créer votre compte</h2>
                                </div>
                    </div>
                    <div class="row">
                                <div class="col-4"></div>
                                <div class="col-">
                                    <p>{{ serverResponse }}</p>
                                </div>
                    </div>
                    <form id="createUserForm">
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
                                            <i @click="showPassword = !showPassword" :class=" showPassword ? 'bi bi-eye' : 'bi bi-eye-slash' "></i>
                                        </span>
                                    </div> 
                                </div>
                            </div><br>
                            <div class="row">
                                <div class="col-4"></div>
                                <div class="col-">
                                    <input type="password" class="form-control" id="cPassword" placeholder="Confirmer le mot de passe" v-model="confirmPassword">
                                </div>
                            </div><br>
                            <div class="row">
                                <div class="col-4"></div>
                                <div class="col-">
                                    <button type="button" class="btn" id="btnConnexion" :disabled="!user || !password || !confirmPassword" @click="signUp()"><span id="wordConnexion">Créer un compte</span></button>
                                </div>
                            </div><br>
                            <div class="row">
                                <div class="col-2"></div>
                                <div class="col-8">
                                <a href="/">Vous avez déjà un compte?</a>
                                </div>
                            </div><br>
                          
                        </form>
                    </div>
                </div>  
        </div>     
</template>
<script>
    import axios from 'axios';
    export default({
        name : 'createAccount',
        data(){
            return {
                user : '',
                password : '',
                confirmPassword : '',
                showPassword : false,
                serverResponse : ''
            }
        },
        methods: {

            signUp(){
                if(this.user == '' || this.password == '' || this.confirmPassword == '') 
                    this.serverResponse = 'Veuillez compléter les champs du formulaire'
                else if(this.password !== this.confirmPassword)
                    this.serverResponse = 'Les mots de passe sont différents'

                else {
                    axios.post('http://localhost:3000/createUser',{
                        user : this.user,
                        password : this.confirmPassword

                    })
                    .then(response=>{
                        if(response.data === 'Compte créee') this.$router.push('/afterSignUpPage')
                        else this.serverResponse = response.data
                    })
                    .catch(error=>{
                        alert(error)
                    })
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
        height:  380px;
    }
    p{
        color: red;
    }
    h2{
        color: #8d33ff;
    }
</style>