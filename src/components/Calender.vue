
<template>
  <section> 

    <!-- <full-calendar :events="fcEvents" locale="en"></full-calendar> -->
    <v-app id="dayspan" v-cloak>
      <ds-calendar-app :calendar="calendar"></ds-calendar-app>
    </v-app>
    <mu-bottom-nav style="width: 100%" value="日历">
      <mu-bottom-nav-item title="主页" icon="home" to="/" value="主页"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="课程" icon="class" to="/classes" value="课程"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="我" icon="account_box" to="/me" value="我"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="关于我们" icon="help" to="/aboutus" value="关于我们"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="日历" icon="event_note" to="/calender" value="日历"></mu-bottom-nav-item>

  </mu-bottom-nav>
  </section>
  
</template>

<script>
import { Calendar } from 'dayspan';
var demoEvents = [
	{
      title : 'Sunny Out of Office',
      start : '2018-08-25',
      end : '2018-08-27'
    }
]
export default {
  name: 'app',
  data: () => ({
    fcEvents : demoEvents,
    calendar: Calendar.months(),
  }),
  components : {
	'full-calendar': require('vue-fullcalendar')	
  },
  methods: {
    goHome() {
        this.$router.push("/")
    },
    goClasses() {
        this.$router.push("/classes")
    },
    goMe() {
        this.$router.push("/me")
    },
    goAboutUs() {
        this.$router.push("/aboutus")
    },
    goCalendar() {
        this.$router.push("/calender")
    }
  }
}
</script>

<style>
.dayspan {
  font-family: Roboto, sans-serif;
  width: 100%;
  height: 70%;
}
</style>