<template>
    <section>
        

        <div style="width: 100%; height: 400px; background: linear-gradient(to right, #33ccff -6%, #303f9f 100%);">
            <mu-row justify-content="center">
                <mu-avatar :size="size" style="margin-top: 50px">
                    <img src="../assets/plustut_logo.png">
                </mu-avatar>
            </mu-row>
            <h2 class="txt_h2">关于PlusTuT教育</h2>
        </div>
        <mu-expansion-panel :expand="panel === 'panel1'" @change="toggle('panel1')">
            <div slot="header">公司简介</div>
            深圳普拉斯图教育科技股份有限公司（PlusTuT）是一家综合型O2O科技教育培训机构。其成员由美国，香港，深圳，北京等地的教育及科技精英组建而成，致力为深港跨境学子提供一站式综合性学习提升及问题解决方案。

机构课程从香港教育体系出发，结合学科特点，辅以题库及线上配套资源，在测，讲，练，考每个环节均有严密的把控，使学子在短时间内提升学习兴趣及对知识体系理解能力，并在所学科目中得到提升
        </mu-expansion-panel>
        <mu-expansion-panel :expand="panel === 'panel2'" @change="toggle('panel2')">
            <div slot="header">名师介绍</div>
            <mu-expansion-panel :expand="panel === 'panel4'" @change="toggle('panel4')">
                <div slot="header">佟泽洲</div>
                Plustut全科金牌导师，本科毕业于香港理工大学，原阿里巴巴（香港）商务分析师及企业培训师，致力于为跨境学童学习提供综合性解决提升方案，整合知识体系，提升学习效率，短时间内提高学生学业成绩。
            </mu-expansion-panel>
            <mu-expansion-panel :expand="panel === 'panel4'" @change="toggle('panel4')">
                <div slot="header">任婉瑄</div>
                英语金牌讲师。毕业于新加坡国立大学，英语专业八级，同声传译，新东方在线题库主要编辑。致力于整合多方英语资源，从专业视角为英文科学习提供一站式解决方案。
            </mu-expansion-panel>
            <mu-expansion-panel :expand="panel === 'panel4'" @change="toggle('panel4')">
                <div slot="header">刘肖凡</div>
                数学金牌讲师，本科毕业于香港理工大学，金融与数学双学士。多年致力于数学理论体系研究，并为学子短时间内让学子掌握数学思想，提高应试成绩。
            </mu-expansion-panel>
            <mu-expansion-panel :expand="panel === 'panel4'" @change="toggle('panel4')">
                <div slot="header">杨开翼</div>
                中文金牌讲师，本科毕业于香港理工大学。具有丰富写作阅读教学经验，极大提升学子语文兴趣，提升语文对文章 的分析及理解能力。
            </mu-expansion-panel>
        </mu-expansion-panel>
        <mu-expansion-panel :expand="panel === 'panel3'" @change="toggle('panel3')">
            <div slot="header">联系我们</div>
            <mu-expansion-panel :expand="panel === 'panel4'" @change="toggle('panel4')">
                <div slot="header">电话</div>
                18902430450
            </mu-expansion-panel>
            <mu-expansion-panel :expand="panel === 'panel4'" @change="toggle('panel4')">
                <div slot="header">微信号</div>
                PlusTuT
            </mu-expansion-panel>
            <mu-expansion-panel :expand="panel === 'panel4'" @change="toggle('panel4')">
                <div slot="header">邮箱</div>
                plustut@126.com
            </mu-expansion-panel>
        </mu-expansion-panel>
        <mu-expansion-panel :expand="panel === 'panel1'" @change="toggle('panel1')">
            <div slot="header">公司地址</div>
            广东省深圳市海悦华城a座3502室
            
        </mu-expansion-panel>
    </section>
</template>

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
            panel: ''
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
        },
        // toggle (panel) {
        //     this.panel = panel === this.panel ? '' : panel;
        // }
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
    justify-content: flex-start;
    -webkit-text-size-adjust: 100%;
    -webkit-box-align: start;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: start;
}
.row_flex_1 {
    box-sizing: border-box;
    display: block;
    flex-basis: 33.33%;
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 33.33%;
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
