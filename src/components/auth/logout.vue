<template>
<div id="app">
    <div class="container fluid">
        <h4>您好，請問要登出嗎?</h4>
           <p>{{this.user.displayName}}</p>
           <p>{{this.user.email}}</p>
        
        <button 
        type="submit" 
        class="btn btn-dark btn-lg btn-block"
        @click="logOut()">
            登出
        </button>
    </div>
  </div>
</template>

<script>
import { myDB } from "@/config/localMongodb.js";

export default {
  data() {
    return {
      user:{
        displayName: "",
        email: "",
      }
    };
  },
  created() {
    console.log("email:", sessionStorage.getItem("email"));
    let that = this;
    myDB.findOne({ email: sessionStorage.getItem("email") }, function (err, docs) {
      console.log("docs", docs.name);
      console.log("docs", docs.email);
      that.user.displayName = docs.name;
      that.user.email = docs.email;
    });
  },
  methods: {
    logOut() {
      setTimeout('console.log("logout");', 500);
      this.$router.push({path: "/login"});
    }
  },
};
</script>

<style scoped>
#app {
  padding: 20px;
  height: 500px;
  margin-top: 1em;
}
#app h4 {
  padding: 0.5em;
  /* display: block; */
  width: 80%;
  max-height: 2.2em;
  border-radius: 1em;
  margin-bottom: 1.5em;
}
</style>