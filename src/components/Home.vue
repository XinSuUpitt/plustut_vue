<template>
    <section>
        

        <div style="width: 100%; height: 400px; background: linear-gradient(to right, #33ccff -6%, #303f9f 100%);">
            <mu-row justify-content="center">
                <mu-avatar :size="size" style="margin-top: 50px">
                    <img src="../assets/plustut_logo.png">
                </mu-avatar>
            </mu-row>
        </div>

        <mu-carousel style="width:100%; max-width: 375px; margin-top: 20px" justify-content="center">
            <mu-carousel-item>
                <img :src="carouselImg1">
            </mu-carousel-item>
            <mu-carousel-item>
                <img :src="carouselImg2">
            </mu-carousel-item>
        </mu-carousel>

        <mu-container>
            <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
            <mu-card-header title="Myron Avatar" sub-title="sub title">
                <mu-avatar slot="avatar">
                </mu-avatar>
            </mu-card-header>
            <mu-card-media title="Image Title" sub-title="Image Sub Title">
            </mu-card-media>
            <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>
            <mu-card-text>
                散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
                调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
                似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
                找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
            </mu-card-text>
            <mu-card-actions>
                <mu-button flat>Action 1</mu-button>
                <mu-button flat>Action 2</mu-button>
            </mu-card-actions>
            </mu-card>
        </mu-container>
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
                this.$toast({
                    icon: 'fail',
                    message: e.message
                })
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

</style>
