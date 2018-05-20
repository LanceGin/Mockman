import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '/',
      name: 'home',
      component: require('@/views/Home').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
