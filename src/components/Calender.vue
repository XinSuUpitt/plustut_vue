
<template>
  <section> 

    <v-app id="dayspan" v-cloak>

    <ds-calendar-app ref="app"
      :calendar="calendar"
      @change="saveState">

      <template slot="title">
        PlusTuT日历
      </template>

      <template slot="eventPopover" slot-scope="slotData">
         <ds-calendar-event-popover
          v-bind="slotData"
          @finish="saveState"
        ></ds-calendar-event-popover>
      </template>

      <template slot="eventCreatePopover" slot-scope="{placeholder, calendar, close}">
        <ds-calendar-event-create-popover
          :calendar-event="placeholder"
          :calendar="calendar"
          :close="$refs.app.$refs.calendar.clearPlaceholder"
          @create-edit="$refs.app.editPlaceholder"
          @create-popover-closed="saveState"
        ></ds-calendar-event-create-popover>
      </template>

      <template slot="eventTimeTitle" slot-scope="{calendarEvent, details}">
        <div>
          <v-icon class="ds-ev-icon"
            v-if="details.icon"
            size="14"
            :style="{color: details.forecolor}">
            {{ details.icon }}
          </v-icon>
          <strong class="ds-ev-title">{{ details.title }}</strong>
        </div>
        <div class="ds-ev-description">{{ getCalendarTime( calendarEvent ) }}</div>
      </template>

    </ds-calendar-app>

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
import { dsMerge } from './functions';
import { Calendar, Weekday, Month, Sorts } from 'dayspan';
import { url, initClasses,getStudentClass, getStudentId} from '../data/fetchData'
export default {
  name: 'dayspan',
  data() {
      return {
      storeKey: 'dayspanState',
      calendar: Calendar.months(),
      userName: localStorage.user,
      userId: 0,
      myClasses: [],
      lists: [],
      defaultEvents: [
        {
          data: {
            title: 'Weekly Meeting',
            color: '#3F51B5'
          },
          schedule: {
            dayOfWeek: [Weekday.MONDAY],
            times: [9],
            duration: 30,
            durationUnit: 'minutes'
          }
        },
        {
          data: {
            title: 'First Weekend',
            color: '#4CAF50'
          },
          schedule: {
            weekspanOfMonth: [0],
            dayOfWeek: [Weekday.FRIDAY],
            duration: 3,
            durationUnit: 'days'
          }
        },
        {
          data: {
            title: 'End of Month',
            color: '#000000'
          },
          schedule: {
            lastDayOfMonth: [1],
            duration: 1,
            durationUnit: 'hours'
          }
        },
        // {
        //   data: {
        //     title: 'Mother\'s Day',
        //     color: '#2196F3',
        //     calendar: 'US Holidays'
        //   },
        //   schedule: {
        //     month: [Month.MAY],
        //     dayOfWeek: [Weekday.SUNDAY],
        //     weekspanOfMonth: [1]
        //   }
        // },
        // {
        //   data: {
        //     title: 'New Year\'s Day',
        //     color: '#2196F3',
        //     calendar: 'US Holidays'
        //   },
        //   schedule: {
        //     month: [Month.JANUARY],
        //     dayOfMonth: [1]
        //   }
        // },
        // {
        //   data: {
        //     title: 'Inauguration Day',
        //     color: '#2196F3',
        //     calendar: 'US Holidays'
        //   },
        //   schedule: {
        //     month: [Month.JANUARY],
        //     dayOfMonth: [20]
        //   }
        // },
        // {
        //   data: {
        //     title: 'Martin Luther King, Jr. Day',
        //     color: '#2196F3',
        //     calendar: 'US Holidays'
        //   },
        //   schedule: {
        //     month: [Month.JANUARY],
        //     dayOfWeek: [Weekday.MONDAY],
        //     weekspanOfMonth: [2]
        //   }
        // },
        // {
        //   data: {
        //     title: 'George Washington\'s Birthday',
        //     color: '#2196F3',
        //     calendar: 'US Holidays'
        //   },
        //   schedule: {
        //     month: [Month.FEBRUARY],
        //     dayOfWeek: [Weekday.MONDAY],
        //     weekspanOfMonth: [2]
        //   }
        // },
        // {
        //   data: {
        //     title: 'Memorial Day',
        //     color: '#2196F3',
        //     calendar: 'US Holidays'
        //   },
        //   schedule: {
        //     month: [Month.MAY],
        //     dayOfWeek: [Weekday.MONDAY],
        //     lastWeekspanOfMonth: [0]
        //   }
        // },
        // {
        //   data: {
        //     title: 'Independence Day',
        //     color: '#2196F3',
        //     calendar: 'US Holidays'
        //   },
        //   schedule: {
        //     month: [Month.JULY],
        //     dayOfMonth: [4]
        //   }
        // },
        // {
        //   data: {
        //     title: 'Labor Day',
        //     color: '#2196F3',
        //     calendar: 'US Holidays'
        //   },
        //   schedule: {
        //     month: [Month.SEPTEMBER],
        //     dayOfWeek: [Weekday.MONDAY],
        //     lastWeekspanOfMonth: [0]
        //   }
        // },
        // {
        //   data: {
        //     title: 'Columbus Day',
        //     color: '#2196F3',
        //     calendar: 'US Holidays'
        //   },
        //   schedule: {
        //     month: [Month.OCTOBER],
        //     dayOfWeek: [Weekday.MONDAY],
        //     weekspanOfMonth: [1]
        //   }
        // },
        // {
        //   data: {
        //     title: 'Veterans Day',
        //     color: '#2196F3',
        //     calendar: 'US Holidays'
        //   },
        //   schedule: {
        //     month: [Month.NOVEMBER],
        //     dayOfMonth: [11]
        //   }
        // },
        // {
        //   data: {
        //     title: 'Thanksgiving Day',
        //     color: '#2196F3',
        //     calendar: 'US Holidays'
        //   },
        //   schedule: {
        //     month: [Month.NOVEMBER],
        //     dayOfWeek: [Weekday.THURSDAY],
        //     weekspanOfMonth: [3]
        //   }
        // },
        // {
        //   data: {
        //     title: 'Christmas Day',
        //     color: '#2196F3',
        //     calendar: 'US Holidays'
        //   },
        //   schedule: {
        //     month: [Month.DECEMBER],
        //     dayOfMonth: [25]
        //   }
        // }
      ]
    }
  },
  created () {
      this.getStudentIdByName()
      this.getStudentClass()
  },
  mounted()
  {
    window.app = this.$refs.app;
    this.loadState()
  },
  methods:
  {
    getStudentClass() {
      initClasses().then(res =>  {
          let list = res.data
          this.lists = list
          getStudentId(this.userName).then(res => {
            getStudentClass(res.data[0].id).then(res => {
                for (var i = 0; i < res.data.length; i++) {
                    var iid = res.data[i].class_id;
                    for (var j = 0; j < this.lists.length; j++) {
                        if (this.lists[j].id === iid) {
                            this.myClasses.push(this.lists[j]);
                            break;
                        }
                    }
                }
            }).catch(e => {
                console.log('cannot get student classes', e.message)
            })
        }).catch(e => {
            console.log('cannot find student', e.message)
        })
      }).catch(e => {
          console.log('error', e.message)
      }) 
    },
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
    },
    getCalendarTime(calendarEvent)
    {
      let sa = calendarEvent.start.format('a');
      let ea = calendarEvent.end.format('a');
      let sh = calendarEvent.start.format('h');
      let eh = calendarEvent.end.format('h');
      if (calendarEvent.start.minute !== 0)
      {
        sh += calendarEvent.start.format(':mm');
      }
      if (calendarEvent.end.minute !== 0)
      {
        eh += calendarEvent.end.format(':mm');
      }
      return (sa === ea) ? (sh + ' - ' + eh + ea) : (sh + sa + ' - ' + eh + ea);
    },
    saveState()
    {
      let state = this.calendar.toInput(true);
      let json = JSON.stringify(state);
      localStorage.setItem(this.storeKey, json);
    },
    loadState()
    {
      let state = {};
      try
      {
        let savedState = JSON.parse(localStorage.getItem(this.storeKey));
        if (savedState)
        {
          state = savedState;
          state.preferToday = false;
        }
      }
      catch (e)
      {
        console.log( e );
      }
      
      var classesList = [];
      getStudentId(this.userName).then(res => {
            getStudentClass(res.data[0].id).then(res => {
                for (var i = 0; i < res.data.length; i++) {
                    var iid = res.data[i].class_id;
                    for (var j = 0; j < this.lists.length; j++) {
                        if (this.lists[j].id === iid) {
                            classesList.push(this.lists[j]);
                            break;
                        }
                    }
                }
                for (var i = 0; i < classesList.length; i++) {
                  var myClass = classesList[i];
                  console.log('class', myClass);
                  
                  switch (myClass.week_day) {
                    case 0:

                  } 
                  this.defaultEvents.push({
                    data: {
                      title: myClass.class_name,
                      color: '#3F51B5'
                    },
                    schedule: {
                      dayOfWeek: [Weekday.SUNDAY],
                      times: [14],
                      duration: 60,
                      durationUnit: 'minutes'
                    }
                  });
                  state.events = this.defaultEvents;
                  let defaults = this.$dayspan.getDefaultEventDetails();
                  state.events.forEach(ev =>
                  {
                    ev.data = dsMerge( ev.data, defaults );
                  });
                  this.$refs.app.setState( state );
                }
            }).catch(e => {
                console.log('cannot get student classes', e.message)
            })
        }).catch(e => {
            console.log('cannot find student', e.message)
        })
      
    },
    getStudentIdByName() {
        getStudentId(this.userName).then(res => {
            this.userId = res.data[0].id;
        }).catch(e => {
            console.log('cannot find student', e.message)
        })
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