<template>
  <div id="app">
    <h5>{{ this.user }} - {{ new Date() }}</h5>
    <h4>打卡統計頁面</h4>
    <div class="justify-content-centermy-1 row">
      <b-form-fieldset horizontal label="單頁顯示行數" class="col-6">
        <b-form-select
          :options="[
            { text: 5, value: 5 },
            { text: 10, value: 10 },
            { text: 15, value: 15 },
          ]"
          v-model="perPage"
        >
        </b-form-select>
      </b-form-fieldset>

      <b-form-fieldset horizontal label="請篩選時間" class="col-6">
        <b-form-input
          v-model="filter"
          placeholder="Type to Search"
        ></b-form-input>
      </b-form-fieldset>
    </div>

    <!-- Main table element -->
    <b-table
      striped
      hover
      :items="items"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
    >
    </b-table>
    <hr/>
    <div>總筆數: {{this.totalCount}}</div>
    <div class="justify-content-center row my-1">
      <b-pagination
        size="md"
        :total-rows="this.items.length"
        :per-page="perPage"
        v-model="currentPage"
      />
    </div>    
  </div>
  
</template>

<script>
import { myDB } from "@/config/localMongodb.js";

export default {
  data() {
    return {
      user: null,
      currentPage: 1,
      perPage: 5,
      filter: null,
      items: [],
      fields: {
        員工Email: {
          label: "員工Email",
          sortable: true,
        },
        登錄時間: {
          label: "登錄時間",
          sortable: true,
        },
      },
      totalCount: 0,
    };
  },
  created() {
    let emailKey = sessionStorage.getItem("email");
    console.log("this is admin.vue created lifecycle", emailKey);
    myDB.find({ email: emailKey }).sort({ today: -1 }).exec(function (err, docs) {
        console.log("docs", docs);
        console.log("=====================================");
        sessionStorage.setItem("userProfile", JSON.stringify(docs))
    });
    console.log("admin created", sessionStorage.getItem("userProfile"))
    if(sessionStorage.getItem("userProfile") == null){
      setTimeout('console.log("test123");',500);
      this.$router.go(0);
    }
    this.getRefTel();
    // myDB.findOne({ email: this.user.email }, function (err, docs) {
    //   console.log("err", err);
    //   console.log("docs", docs);
    //   // alert("data not found");
    //   // return docs;
    //   if(docs){
    //     this.$router.push("/admin");
    //     console.log("go to home page");
    //   }
    // });
  },
  methods: {
    getRefTel() {
      // console.log(myDB.findOne({ email: sessionStorage.getItem("email") }));
      console.log("admin methods", sessionStorage.getItem("userProfile"))
      let punchList = JSON.parse(sessionStorage.getItem("userProfile"));
      this.user = punchList[0].name;
      this.totalCount = punchList.length;
      sessionStorage.setItem("userName", this.user);
      console.log(punchList[0].email);
      punchList.forEach((row) => {
        this.items.push({
          員工Email: row.email,
          登錄時間: row.today,
          打卡時段: row.period,
          ip位置: row.ip,
        });
      });
    },
    details(item) {
      alert(JSON.stringify(item));
    },
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
  display: block;
  background-color: #ff9900;
  color: white;
  width: 100%;
  max-height: 2.2em;
  border-radius: 1em;
  margin-bottom: 1.5em;
}
input {
  margin-top: 0px;
}
</style>
