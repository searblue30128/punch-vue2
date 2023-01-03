<template>
<div id="app">
  <div class="container fluid">
    <form @submit.prevent="userRegistration">
      <h3>註冊</h3>

      <div class="form-group">
        <label>名字</label>
        <input
          type="text"
          class="form-control form-control-lg"
          v-model="user.name"
        />
      </div>

      <div class="form-group">
        <label>信箱</label>
        <input
          type="email"
          class="form-control form-control-lg"
          v-model="user.email"
        />
      </div>

      <div class="form-group">
        <label>密碼</label>
        <input
          type="password"
          class="form-control form-control-lg"
          v-model="user.password"
        />
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block">
        註冊
      </button>

      <p class="forgot-password text-right">
        已經註冊過了?
        <router-link to="/login">登入</router-link>
      </p>
    </form>
  </div>
</div>
</template>

<script>

import { myDB } from "@/config/localMongodb.js";





export default { 
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
      isVistor: true,
    };
  },
  methods: {
    userRegistration() {
      myDB.count({ email: this.user.email }, function (err, counts) {
        console.log("count: ", counts);
        if(counts > 0){
          this.isVistor = false;
          alert("you have already registered, please login directly!");
        }
      });
      if(this.isVistor){
        let today  = new Date().toLocaleString("sv-SE");
        let nowHour = new Date().getHours();
        let periodStr = "";
        if(nowHour >= 0 && nowHour < 8) {
            periodStr = "早"
        }else if(nowHour >= 8 && nowHour < 16){
            periodStr = "午"
        }else{
          periodStr = "晚"
        }
        let doc = [{ email: this.user.email,
                    name: this.user.name,
                    pwd: this.user.pwd,
                    today: today,
                    period: periodStr,
                    }, 
        ];
        myDB.insert(doc);
        alert("恭喜註冊成功, 即將跳轉到登入頁面");
        this.$router.push({path: "/login"});
      }
    },
  },
};
</script>

<style scoped>
#app {
  padding: 20px;
  height: 500px;
  margin-top: 3em;
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