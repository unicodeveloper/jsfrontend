<template>
  <div>
    <app-nav></app-nav>
    <h3 class="text-center">Secret Meetups</h3>
    <hr/>
    
    <div class="col-sm-4" v-for="meetup in privateMeetups">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"> {{ meetup.name }} </h3>
        </div>
        <div class="panel-body">
          <p><span class="badge alert-info"> Host: </span> {{ meetup.host }} </p>
          <p><span class="badge alert-danger"> Attendees: </span><strong> {{ meetup.attendees }} </strong></p>
        </div>
      </div>
    </div>
    
    <div class="col-sm-12">
      <div class="jumbotron text-center">
        <h2>View Public Meetups</h2>
        <router-link class="btn btn-lg btn-success" to="/"> Public Meetups </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav';
import Auth from '../auth/Auth';
import { getPrivateMeetups } from '../../utils/meetup-api';

const auth = new Auth();

export default {
  name: 'privateMeetups',
  components: {
    AppNav,
  },
  data() {
    return {
      privateMeetups: '',
    };
  },
  methods: {
    isLoggedIn() {
      return auth.isAuthenticated();
    },
    getPrivateMeetups() {
      getPrivateMeetups().then((meetups) => {
        this.privateMeetups = meetups;
      });
    },
  },
  mounted() {
    this.getPrivateMeetups();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>