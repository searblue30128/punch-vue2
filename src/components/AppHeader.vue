<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand class="mr-auto">  
        <img
          src="https://cdn.iconscout.com/icon/free/png-512/vue-282497.png"
          width="30rem"
          class="d-inline-block align-top"
          alt="vue_icon"
        />
      <router-link to="/admin">員工打卡系統</router-link>
        
        
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto navbar-expand-sm">
        <b-nav-item> <router-link to="/admin" exact>Home</router-link></b-nav-item>
        <b-nav-item><router-link to="/addBlog" exact>Punch</router-link></b-nav-item>


        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item><router-link to="/login">Login</router-link></b-dropdown-item>
          <b-dropdown-item><router-link to="/register">Register</router-link></b-dropdown-item>
          <b-dropdown-item><router-link to="/logout">Logout</router-link></b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
p {
  color: #ff9900;
}
li a {
  text-decoration: none;
  color: #ff9900;
}
a {
  text-decoration: none;
  color: #ffffff;
}
</style>
