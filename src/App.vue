<template>
    
    <div id="video">
        <mu-appbar style="width: 100%; background: linear-gradient(to right, #33ccff -6%, #303f9f 100%);">
            <mu-button icon slot="left" @click="open = !open">
                <mu-icon value="menu"></mu-icon>
            </mu-button>
            <mu-menu slot="right">
                <mu-icon value="account_circle" color="white" style="margin-right: 10px; margin-top:10px" size="48"></mu-icon>
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

            <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
                <mu-list>
                <mu-list-item @click="goHome()" button>
                    <mu-list-item-title>主页</mu-list-item-title>
                </mu-list-item>
                <mu-list-item @click="goClasses()" button>
                    <mu-list-item-title>课程</mu-list-item-title>
                </mu-list-item>
                <mu-list-item @click="goMe()" button>
                    <mu-list-item-title>我</mu-list-item-title>
                </mu-list-item>
                <mu-list-item @click="goAboutUs()" button>
                    <mu-list-item-title>关于我们</mu-list-item-title>
                </mu-list-item>
                <mu-list-item @click="goCalendar()" button>
                    <mu-list-item-title>日历</mu-list-item-title>
                </mu-list-item>
                <mu-list-item  @click="open = false" button>
                    <mu-list-item-title>Close</mu-list-item-title>
                </mu-list-item>
                </mu-list>
            </mu-drawer>

        <transition :name="transitionName">
            <keep-alive include="home">
                <router-view class="child-view"> </router-view>
            </keep-alive>
        </transition>
        <vfooter v-if="isShow" />
    </div>
</template>

<script>
import vfooter from './components/common/vfooter.vue'

export default {
    name: 'app',
    components:{
        vfooter
    },
    data () {
        return{
            transitionName: 'slide-left',
            isShow: true,
            docked: false,
            open: false,
            position: 'left'
        }
    },
    watch: {
        $route(to, from) {
            console.log(this.$route.name)
            if(this.$route.name == 'video'){
                this.isShow = false
            }else{
                this.isShow = true
            }
            // console.log(to.meta.index,from.meta.index)
            if (to.meta.index > from.meta.index) {
                this.transitionName = "slide-left";
            } else {
                this.transitionName = "slide-right";
            }
        }
    },
    methods: {
        goHome() {
            console.log('gohome')
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

<style lang="scss" >
@import './src/style/reset.scss';
.child-view {
    position: absolute;
    width:100%;
    transition: all .4s ;
}
.slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
}
.account_icon {
    size: 56
}
</style>
