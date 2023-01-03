<template>
<div id="app">
  <div class="container ">
    <form @submit.prevent="userLogin">
      <h3>登入</h3>

      <div class="form-group">
        <label>郵件地址 ex: abc@fareastone.com.tw</label>
        <input
          type="email"
          class="form-control form-control-lg"
          v-model="user.email"
        />
      </div>

      <div class="form-group">
        <label>密碼 ex: 123</label>
        <input
          type="password"
          class="form-control form-control-lg"
          v-model="user.password"
        />
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block">登入</button>
      <button class="btn btn-dark btn-lg btn-block">
        <router-link to="/register">
          註冊
        </router-link>
      </button>

      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">忘記密碼?</router-link>
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
        email: "",
        password: "",
      },
    };
  },
  created() {
    sessionStorage.clear();
    console.log("check sessionStorage:", sessionStorage.getItem("email"));
    let today  = new Date().toLocaleString("sv-SE");
    let doc = [{ email: 'abc@fareastone.com.tw',
                name: 'vantest',
                pwd: '123',
                today: today,
                period: "早",
                }, 
    ];
    // myDB.remove({}, { multi: true });
    myDB.insert(doc);
  },
  methods: {
    userLogin() {
      var that = this;
      
      myDB.count({ email: that.user.email }, function (err, counts) {
        console.log("count: ", counts);

        if(counts == 0){
          alert("data not found");
        }else {
          sessionStorage.setItem("email", that.user.email);
          that.$router.push({path: "/admin"});
        }
        console.log("=====================================");
      });

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