<template>
    <section>
        

        <div style="width: 100%; height: 400px; background: linear-gradient(to right, #33ccff -6%, #303f9f 100%);">
            <mu-row justify-content="center">
                <mu-avatar :size="size" style="margin-top: 50px">
                    <img src="../assets/plustut_logo.png">
                </mu-avatar>
            </mu-row>
            <h2 class="txt_h2">一站式中港补习直通车</h2>
        </div>

        <div class="row_flex">
            <div class="row_flex_1">
                <img src="../assets/可定制.png" class="row_flex_img">
                <h3 class="txt_h3"> 定制化课程</h3>
                <div class="txt_h4">专业教师团队，可私人订制课程</div>
            </div>

            <mu-carousel :active="active" class="row_flex_1">
            <mu-icon value="arrow_back" slot="left"></mu-icon>
            <mu-icon value="arrow_forward" slot="right"></mu-icon>
            <template slot="indicator" slot-scope="{ index, active }">
                <mu-button icon class="mu-carousel-indicator-button" :class="{'mu-carousel-indicator-button__active': active}" @click="changeActive(index)">
                <span class="rect-indicator"></span>
                </mu-button>
            </template>
            <mu-carousel-item class="row_flex_img">
                <img :src="carouselImg1" class="row_flex_img">
            </mu-carousel-item>
            <mu-carousel-item class="row_flex_img">
                <img :src="carouselImg2" class="row_flex_img">
            </mu-carousel-item>
            </mu-carousel>

            <div class="row_flex_1">
                <img src="../assets/组件丰富.png" class="row_flex_img">
                <h3 class="txt_h3"> 课程内容多样</h3>
                <div class="txt_h4">拥有独家权威中港中小学一手学习复习资料</div>
            </div>
        </div>
        
    </section>
</template>
        
<!--
        <div id="search">
            <router-link to="/search">
                <div class="search_input">
                    <i class="iconfont icon-sousuo1"></i>搜索
                </div>
            </router-link>
        </div>
        <Loading :loading="loading" />
        <section class="video_list">
            <div class="video_list_header">
                <h3>佳途频道<span>({{allLength}})</span></h3>
                <router-link to="/all">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <ul>
                <li :key="list.id"  v-for="(list,index) in lists[3]" v-if="index < 10">
                    <router-link :to="'/video/'+list.id">
                        <div><img  v-lazy="baseUrl+list.img" alt=""></div>
                        <h3>{{list.name}}</h3>
                        <div>
                            <div class="starList" :style="{'background-position-y':-15*(10-list.star).toFixed(0)+'px'}"></div>
                            <span>{{list.star}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>
        <section class="video_list">
            <div class="video_list_header">
                <h3>推荐课程<span>({{movieLength}})</span></h3>
                <router-link to="/movie">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <ul>
                <li :key="list.id"  v-for="(list,index) in lists[0]"  v-if="index < 10">
                    <router-link :to="'/video/'+list.id">
                        <div class="preImg"><img v-lazy="baseUrl+list.img" alt=""></div>
                        <h3>{{list.name}}</h3>
                        <div>
                            <div class="starList" :style="{'background-position-y':-15*(10-list.star).toFixed(0)+'px'}"></div>
                            <span>{{list.star}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>
        <section class="video_list">
            <div class="video_list_header">
                <h3>热门文章<span>({{tvLength}})</span></h3>
                <router-link to="/tv">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <ul>
                <li :key="list.id" v-for="(list,index) in lists[1]"  v-if="index < 10">
                    <router-link :to="'/video/'+list.id">
                        <div class="preImg"><img v-lazy="baseUrl+list.img" alt=""></div>
                        <h3>{{list.name}}</h3>
                        <div>
                            <div class="starList" :style="{'background-position-y':-15*(10-list.star).toFixed(0)+'px'}"></div>
                            <span>{{list.star}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>
        <section class="video_list">
            <div class="video_list_header">
                <h3>关于我们<span>({{zyLength}})</span></h3>
                <router-link to="/zy">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <ul>
                <li :key="list.id"  v-for="(list,index) in lists[2]"  v-if="index < 10">
                    <router-link :to="'/video/'+list.id">
                        <div class="preImg"><img v-lazy="baseUrl+list.img" alt=""></div>
                        <h3>{{list.name}}</h3>
                        <div>
                            <div class="starList" :style="{'background-position-y':-15*(10-list.star).toFixed(0)+'px'}"></div>
                            <span>{{list.star}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>
        -->


<script>
import Loading from './common/Loading.vue'
import { url,initHome,getAvator, initTeachers } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import carouselImg1 from '../assets/home_3.jpg';
import carouselImg2 from '../assets/plustut_logo.png';
export default {
    name: 'home',
    components:{
        Loading
    },
    data () {
        return {
            lists: '',
            loading: true,
            baseUrl:url + '/images/',
            docked: false,
            open: false,
            position: 'left',
            size: 200,
            carouselImg1,
            carouselImg2,
            active: 0
        }
    },
    computed:{
        allLength(){
            return this.getJsonLength(this.lists[3])
        },
        movieLength(){
            return this.getJsonLength(this.lists[0])
        },
        tvLength(){
            return this.getJsonLength(this.lists[1])
        },
        zyLength(){
            return this.getJsonLength(this.lists[2])
        },
        ...mapState([
            'videoData',
        ]),
    },
    created () {

        if (this.videoData != null) {
            this.lists = this.videoData
        }else{
           this.initData()
        }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{
        async initData () {
            this.loading = true
            await initHome().then(res =>  {
                let list = res.data
                this.lists = list
                this.$store.dispatch('initVideoData',{
                    initVideoData: list
                })
            }).catch(e => {
            })
            await initTeachers().then(res => {
                console.log('teachers', res)
            }).catch(e => {
                console.log('teachers error', e.message)
            })
            setTimeout(()=>{
                this.loading = false;
            },500)
        },
        getJsonLength(jsonData){
            var jsonLength = 0;
            for(var item in jsonData){
                jsonLength++;
            }
            return jsonLength;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/home';
.row_flex {
    align-items: flex-start;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-family: Roboto, Lato, sans-serif;
    font-size: 14px;
    justify-content: center;
    -webkit-text-size-adjust: 100%;
    -webkit-box-align: start;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: start;
}
.row_flex_1 {
    box-sizing: border-box;
    display: block;
    flex-basis: 30%;
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 30%;
    min-width: 375px;
    position: relative;
    font-family: Roboto, Lato, sans-serif;
    font-size: 14px;
    -webkit-box-direction: normal;
    -webkit-box-flex: 0;
}
.row_flex_img {
    max-width: 100%;
}
.txt_h2 {
    margin-top: 20px;
    font-weight: 300;
    font-size: 30px;
    font-style: bold;
    font-family: Roboto, Lato, sans-serif;
    text-align: center;
    display: block;
    box-sizing: border-box;

}
.txt_h3 {
    font-size: 21px;
    font-family: Roboto, Lato, sans-serif;
    text-align: center;
    display: block;
    box-sizing: border-box;

}
.txt_h4 {
    font-size: 18px;
    font-family: Roboto, Lato, sans-serif;
    text-align: center;
    display: block;
    box-sizing: border-box;
    
}
</style>
