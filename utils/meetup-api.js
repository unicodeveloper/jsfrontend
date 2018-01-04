/* eslint-disable */
import axios from 'axios';
import Auth from '../src/auth/Auth.js';

const auth = new Auth();
const BASE_URL = 'https://meetupservice.herokuapp.com';

export function getPublicMeetups() {
  const url = `${BASE_URL}/api/meetups/public`;
  return axios.get(url).then(response => response.data.meetups).catch(err =>  err || 'Unable to retrieve data');
}

export function getPrivateMeetups() {
  const url = `${BASE_URL}/api/meetups/private`;
  return axios.get(url, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }}).then(response => response.data.meetups).catch(err => err || 'Unable to retrieve data');
}