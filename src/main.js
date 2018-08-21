// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './base/rem'
import VueLazyload from 'vue-lazyload'
import Toast from './components/common/Toast.js'
import promise from 'es6-promise'

import Vuetify from 'vuetify'
import DaySpanVuetify from 'dayspan-vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import theme from 'muse-ui/lib/theme'
import * as colors from 'muse-ui/lib/theme/colors'
import fullCalendar from 'vue-fullcalendar'

Vue.component('full-calendar', fullCalendar)

theme.add('custom-theme', {
  primary: colors.indigo,
  secondary: colors.pinkA200
});

Vue.use(MuseUI);

Vue.config.productionTip = false

Vue.use(Vuetify);

Vue.use(DaySpanVuetify, {
  methods: {
    getDefaultEventColor: () => '#1976d2'
  }
});

promise.polyfill();
Vue.use(Toast);
Vue.use(VueLazyload, {
  loading: 'http://www.wclimb.site/images/imgLoading.svg'
})
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})