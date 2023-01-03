<template>
<div id="app">
  <div id="add-time">
    <h5>{{ new Date() }}</h5>
    <h4>Add a New Punchs Post</h4>    
    <div>說明: 
      0-7 --> 早班 
      8-15 --> 午班 
      16-23 --> 晚班 
    </div>
    <form v-if="!submitted">
      <label>Emp email:</label>
      <input type="text" v-model.lazy="user.emp" disabled />
      <div id="checkboxes">
        <p>Emp punch:</p>
        <label>#早上</label>
        <input type="radio" value="早" v-model="user.timePeriods" name="user-radio" required="required" />
        &nbsp;
        <label>#中午</label>
        <input type="radio" value="中" v-model="user.timePeriods" name="user-radio" required="required" />
        &nbsp;
        <label>#晚上</label>
        <input type="radio" value="晚" v-model="user.timePeriods" name="user-radio" required="required" />
      </div>
      <hr />
      <button v-on:click.prevent="post">Add Time</button>
    </form>
    <div v-if="submitted">
      <h3>Thanks for adding your timesheet</h3>
      <button v-on:click.prevent="showButton">punch again</button>
    </div>
    <div id="preview">
      <h3>Preview punch</h3>
      <p>Emp email: {{ user.emp }}</p>
      <p>Emp 簽到時段:</p>
      <ul>
        <li>
          {{ user.timePeriods }}
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import { myDB } from "@/config/localMongodb.js";

export default {
  data() {
    return {
      user: {
        emp: sessionStorage.getItem("email"),
        timePeriods: "",
      },
      submitted: false,
    };
  },
  methods: {
    async post() {
      let nowHour = new Date().getHours();
        let periodStr = "";
        if(nowHour >= 0 && nowHour < 8) {
            periodStr = "早"
        }else if(nowHour >= 8 && nowHour < 16){
            periodStr = "午"
        }else{
          periodStr = "晚"
      }
      if (this.user.timePeriods == periodStr) {
        let record = {
          name: sessionStorage.getItem("userName"),
          email: this.user.emp,
          period: this.user.timePeriods,
          today: new Date().toLocaleString("sv-SE"),       
        };
        // myDB.count({ record }, function (err, counts) {
        //   console.log("count: ", counts);

        //   if(counts == 0){
        //     alert("data not found");
        //   }else {
        //     sessionStorage.setItem("email", that.user.email);
        //     that.$router.push({path: "/admin"});
        //   }
        //   console.log("=====================================");
        // });
        this.submitted = true;
        await myDB.insert(record);
        console.log("success", record);
      }else {
          alert('Please select the correct time period', this.user.timePeriods);
      }
    },

    async showButton() {
      this.submitted = false;
    }
  },
};
</script>

<style>
#add-time * {
  box-sizing: border-box;
}
#add-time {
  margin: 10px auto;
  max-width: 400px;
}
label {
  display: block;
  margin: 10px 0 10px;
}
input[type="text"],

#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}
h3 {
  margin-top: 10px;
}
#checkboxes input {
  display: inline-block;
  margin-right: 10px;
}
#checkboxes label {
  display: inline-block;
  margin-top: 0;
}

#app {
  padding: 20px;
  height: 500px;
  margin-top: 1em;
}
#app h4 {
  padding: 0.5em;
  display: block;
  background-color: #ffbb00bd;
  color: rgba(12, 10, 10, 0.486);
  width: 100%;
  max-height: 2.2em;
  border-radius: 1em;
  margin-bottom: 1.5em;
}
</style>
