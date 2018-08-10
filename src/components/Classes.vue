<template>
    <section class="classes">
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
                <h3>我的课程<span>({{classLength}})</span></h3>
                <router-link to="/all">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            
            <div @click="addClass">
                <label>{{lists[0].class_name}}</label>
            </div>
           
        </section>
        <section class="video_list">
            <div class="video_list_header">
                <h3>小学课程<span>({{classLength}})</span></h3>
                <router-link to="/elementaryclass">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <!--
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
            -->
        </section>
        <section class="video_list">
            <div class="video_list_header">
                <h3>中学课程<span>({{classLength}})</span></h3>
                <router-link to="/middleclass">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <!--
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
            -->
        </section>
    </section>
</template>

<script>
import Loading from './common/Loading.vue'
import { url,initHome,getAvator, initTeachers, initClasses, addClass } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
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
        }
    },
    computed:{
        classLength(){
            return this.lists.length
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
            await initClasses().then(res =>  {
                let list = res.data
                this.lists = list
                console.log('classes', this.lists[0]);
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
        },

        addClass() {
            console.log('add');
            addClass(1,1).then(data=>{
                                this.$toast({
                                    icon:'success',
                                    message:'添加成功'
                                }) 
                            }).catch(e=>{
                                this.$toast({
                                    icon:'fail',
                                    message:e.message,
                                }) 
                            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/classes';

</style>
