import Vue from 'vue';
import Router from 'vue-router';
import PublicMeetups from '@/components/PublicMeetups';
import PrivateMeetups from '@/components/PrivateMeetups';
import Callback from '@/components/Callback';
import Auth from '../auth/Auth';

const auth = new Auth();

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PublicMeetups',
      component: PublicMeetups,
    },
    {
      path: '/private-meetups',
      name: 'PrivateMeetups',
      beforeEnter: auth.requireAuth,
      component: PrivateMeetups,
    },
    {
      path: '/callback',
      component: Callback,
    },
  ],
});
