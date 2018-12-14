<template>
    <section>
        <mu-tabs :value.sync="active2" color="green" indicator-color="yellow" full-width style="width: 100%; height: 50px; background: linear-gradient(to right, #33ccff -6%, #303f9f 100%);">
            <mu-tab>小学课程</mu-tab>
            <mu-tab>中学课程</mu-tab>
            <mu-tab>我的课程</mu-tab>
        </mu-tabs>
        <div class="row_flex" v-if="active2 === 0" v-for="elementary in elementaries" :key="elementary.id">
            <mu-card class="row_flex_1">
                <mu-card-header :title="elementary.teacher_id" sub-title="金牌教师">
                    <mu-avatar slot="avatar">
                    <img src="../assets/plustut_logo.png">
                    </mu-avatar>
                </mu-card-header>
                <mu-card-media :title="elementary.name" sub-title="">
                    <img src="../assets/home_3.jpg">
                </mu-card-media>
                <mu-card-title :title="elementary.price" sub-title="课程费用"></mu-card-title>
                <mu-card-text>
                    {{elementary.description}}
                </mu-card-text>
                <!-- <mu-card-actions>
                    <mu-button color="primary" @click="addClass(elementary.id)">添加到我的课程</mu-button>
                </mu-card-actions> -->
            </mu-card>   
        </div>
        <div class="row_flex" v-if="active2 === 1" v-for="middle in middles" :key="middle.id">
            <mu-card class="row_flex_1">
                <mu-card-header :title="middle.teacher_id" sub-title="金牌教师">
                    <mu-avatar slot="avatar">
                    <img src="../assets/plustut_logo.png">
                    </mu-avatar>
                </mu-card-header>
                <mu-card-media :title="middle.name" sub-title="">
                    <img src="../assets/home_3.jpg">
                </mu-card-media>
                <mu-card-title :title="middle.price" sub-title="课程费用"></mu-card-title>
                <mu-card-text>
                    {{middle.description}}
                </mu-card-text>
                <!-- <mu-card-actions>
                    <mu-button color="primary" @click="addClass(middle.id)">添加到我的课程</mu-button>
                </mu-card-actions> -->
            </mu-card> 
        </div>
        <div class="row_flex" v-if="active2 === 2" v-for="myclass in myClasses" :key="myclass.id">
            <mu-card class="row_flex_1">
                <mu-card-header :title="myclass.teacher_id" sub-title="金牌教师">
                    <mu-avatar slot="avatar">
                    <img src="../assets/plustut_logo.png">
                    </mu-avatar>
                </mu-card-header>
                <mu-card-media :title="myclass.class_name" sub-title="">
                    <img src="../assets/home_3.jpg">
                </mu-card-media>
                <mu-card-title :title="myclass.price" sub-title="课程费用"></mu-card-title>
                <mu-card-text>
                    {{myclass.description}}
                </mu-card-text>
            </mu-card>
        </div>
    </section>
</template>

<script>
import Loading from './common/Loading.vue'
import { url, initClasses, addClass ,getStudentClass, initTeachers, getStudentId} from '../data/fetchData'
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
            active2: 0,
            elementaries: [],
            middles: [],
            teachers: [],
            userName: localStorage.user,
            userId: 0,
            myClasses: []
        }
    },
    computed:{
        classLength(){
            return this.lists.length
        },
        ...mapState([
            'userInfo',
        ]),
    },
    created () {
        this.getStudentIdByName()
        this.getTeachers()
        this.initData()
        this.getStudentClass()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{
        getStudentIdByName() {
            getStudentId(this.userName).then(res => {
                this.userId = res.data[0].id;
            }).catch(e => {
                console.log('cannot find student', e.message)
            })
        },
        initData () {
            this.loading = true
            initClasses().then(res =>  {
                let list = res.data
                this.lists = list
                var elementaryList = [];
                var middleList = [];
                for (var i = 0; i < this.lists.length; i++) {
                    var teas = this.teachers[0];
                    for (var j = 0; j < teas.length; j++) {
                        if (this.lists[i].teacher_id === teas[j].id) {
                            this.lists[i].teacher_id = teas[j].name;
                            break;
                        }
                    }
                    this.lists[i].price = this.lists[i].price + "元/节";
                    if (this.lists[i].code_level_3 < 7) {
                        elementaryList.push(this.lists[i]);
                    } else {
                        middleList.push(this.lists[i]);
                    }
                }
                this.elementaries = elementaryList;
                this.middles = middleList;
                // this.$store.dispatch('initVideoData',{
                //     initVideoData: list
                // })
            }).catch(e => {
                console.log('error', e.message)
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

        addClass(class_id) {
            addClass(this.userId,class_id).then(data=>{
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
        },

        getStudentClass() {
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
                    console.log('myclass', this.myClasses);
                }).catch(e => {
                    console.log('cannot get student classes', e.message)
                })
            }).catch(e => {
                console.log('cannot find student', e.message)
            })
            
        },

        getTeachers() {
            initTeachers().then(res => {
                for (var i = 0; i < res.data.length; i++) {
                    this.teachers.push(res.data);
                }
            }).catch(e => {
                console.log(e.message)
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import 'src/style/classes';
.demo-text {
  width: 100%;
}
.row_flex {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-family: Roboto, Lato, sans-serif;
    font-size: 14px;
    justify-content: center;
    -webkit-text-size-adjust: 100%;
    -webkit-box-align: center;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: center;
}
.row_flex_1 {
    box-sizing: border-box;
    display: block;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    flex-basis: 31%;
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 31%;
    min-width: 375px;
    font-family: Roboto, Lato, sans-serif;
    font-size: 14px;
    -webkit-box-direction: normal;
    -webkit-box-flex: 0;
}
</style>
