<template>
  <nav class="navbar navbar-default">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand">Meetups</router-link>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <button class="btn btn-danger log" v-show="isLoggedIn()" @click="handleLogout()">Log out </button>
        <button class="btn btn-info log" v-show="!isLoggedIn()" @click="handleLogin()">Log In</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import Auth from '../auth/Auth';

const auth = new Auth();

export default {
  name: 'app-nav',
  methods: {
    handleLogin() {
      auth.login();
    },
    handleLogout() {
      auth.logout();
    },
    isLoggedIn() {
      return auth.isAuthenticated();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-right { margin-right: 0px !important}

.log {
  margin: 5px 10px 0 0;
}
</style>