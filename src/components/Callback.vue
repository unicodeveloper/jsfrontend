<template>
  <div>
      <h3>Loading....</h3>
  </div>
</template>
<script>

import Auth from '../auth/Auth.js';

const auth = new Auth();

export default {
  name: '',
  mounted() {
    this.$nextTick(() => {
      auth.handleAuthentication();
    });
  },
};
</script>