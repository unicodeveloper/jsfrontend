/* eslint-disable */
import auth0 from 'auth0-js';
import router from '../router';

export default class Auth {
  
  auth0 = new auth0.WebAuth({
    domain: 'kabiyesi.auth0.com', // e.g kabiyesi.auth0.com
    clientID: 'QKZNaMaa07jqqPB4yJA5RgFSqEfDXSqq', // e.g i473732832832cfgajHYEUqiqwq
    redirectUri: 'http://localhost:8080/callback', // e.g http://localhost:8080/callback
    audience: 'http://meetapi.com', // e.g. https://meetupapi.com
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        router.replace('/');
      } else if (err) {
        router.replace('/');
      }
    })
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  requireAuth(to, from, next) {
    if (! (new Auth).isAuthenticated()) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } 


  login() {
    this.auth0.authorize();
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the landing page route
    router.go('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}