<template>
    <p id="msg">Votre compte a été crée avec succès</p><br>
    <h5>Vous pouvez désormais <a :href="redirection">vous connectez</a></h5>


</template>
<script>
    export default({
        name : 'afterSignUpPage',
        data(){
            return{
                redirection : "/"
            }
        }
    })
</script>
<style>
    #msg{
        font-size: 100px;
        color: green;
        margin-top : 300px
    }

</style>