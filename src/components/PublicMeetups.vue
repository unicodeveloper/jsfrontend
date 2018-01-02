<template>
  <div>
    <app-nav></app-nav>
    <h3 class="text-center">Daily Meetups</h3>
    <hr/>

    <div class="col-sm-4" v-for="meetup in publicMeetups">
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
      <div class="jumbotron text-center" v-if="isLoggedIn()">
        <h2>View Private Meetups</h2>
        <router-link class="btn btn-lg btn-success" to="/private-meetups">Private Meetups</router-link>
      </div>
      <div class="jumbotron text-center" v-else>
        <h2>Get Access to Private Meetups by Logging In</h2>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav';
import Auth from '../auth/Auth';
import { getPublicMeetups } from '../../utils/meetup-api';

const auth = new Auth();

export default {
  name: 'publicMeetups',
  components: {
    AppNav,
  },
  data() {
    return {
      publicMeetups: '',
    };
  },
  methods: {
    isLoggedIn() {
      return auth.isAuthenticated();
    },
    getPublicMeetups() {
      getPublicMeetups().then((meetups) => {
        this.publicMeetups = meetups;
      });
    },
  },
  mounted() {
    this.getPublicMeetups();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>