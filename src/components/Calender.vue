
<template>

  <v-app id="dayspan" v-cloak>
    <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left">
                <mu-icon value="menu"></mu-icon>
            </mu-button>
            Title
            <mu-menu slot="right">
                <mu-button flat>MENU</mu-button>
                <mu-list slot="content">
                <mu-list-item button>
                    <mu-list-item-content>
                    <mu-list-item-title>Menu Item 1</mu-list-item-title>
                    </mu-list-item-content>
                </mu-list-item>
                <mu-list-item button>
                    <mu-list-item-content>
                    <mu-list-item-title>Menu Item 2</mu-list-item-title>
                    </mu-list-item-content>
                </mu-list-item>
                </mu-list>
            </mu-menu>
            </mu-appbar>
    <ds-calendar-app :calendar="calendar"></ds-calendar-app>
    <mu-container style="width: 100%">
        <mu-bottom-nav>
            <mu-bottom-nav-item title="Recents" icon="restore"></mu-bottom-nav-item>
            <mu-bottom-nav-item title="Favorites" icon="favorite"></mu-bottom-nav-item>
            <mu-bottom-nav-item title="Nearby" icon="location_on"></mu-bottom-nav-item>
        </mu-bottom-nav>
        </mu-container>
  </v-app>
</template>

<script>
import { Calendar } from 'dayspan';

export default {
  name: 'app',
  data: () => ({
    calendar: Calendar.months()
  })
}
</script>

<style>
body, html, #app, #dayspan {
  font-family: Roboto, sans-serif;
  width: 100%;
  height: 85%;
}
</style>