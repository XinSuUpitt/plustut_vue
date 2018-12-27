<template>
    <main>
        <section class="main_wrap">
            <section class="user_title">
                <i class="iconfont icon-denglu"></i>
                <h3>新用户注册</h3>
            </section>
            <section class="user">
                <form  enctype='multipart/form-data'>
                    <div class="input">
                        <div class="input_wrap">
                            <i class="iconfont icon-name"></i>
                            <input type="text" v-model.trim="name" @keyup.enter="signin" name="name" placeholder="姓名">
                        </div>
                        <div class="input_wrap">
                            <i class="iconfont icon-email"></i>
                            <input type="text" v-model.trim="email" @keyup.enter="signin" name="email" placeholder="邮箱">
                        </div>
                        <div class="input_wrap">
                            <i class="iconfont icon-email"></i>
                            <input type="text" v-model.trim="phoneNumber" @keyup.enter="signin" name="phoneNumber" placeholder="电话号">
                        </div>
                        <div class="input_wrap">
                            <i class="iconfont icon-email"></i>
                            <input type="text" v-model.trim="wechat" @keyup.enter="signin" name="wechat" placeholder="微信号">
                        </div>
                        <div class="input_wrap">
                            <i class="iconfont icon-mima1"></i>
                            <input type="password" v-model="password" @keyup.enter="signin" name="password" placeholder="密码">
                        </div>
                        <div class="input_wrap">
                            <i class="iconfont icon-mima1"></i>
                            <input type="password" v-model="confirm_password" @keyup.enter="signin" name="confirm password" placeholder="确认密码">
                        </div>
                    </div>
                    <div class="submit" @click="signin">立即注册</div> 
               </form>
            </section>
        </section> 
    </main>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import { register , yzmChange, checkUser,url } from '../data/fetchData.js'
export default {
    name: 'register',
    data () {
        return {
            lists: '',
            loading: false,
            userName: '',
            password: '',
            confirm_password: '',
            yzm: '',
            yzmTest: '',
            url: ''
        }
    },
    computed:{
        ...mapState([
            'userInfo',
        ]),
    },
    mounted () {
        if(localStorage.user && localStorage.user != ''){
            this.$router.push('/me')
        }
        this.url = url + '/images/yzm.jpg'
    },
    methods:{
        // 登录 
        signin(){
            if (this.name === '' || this.password === '') {
                this.$toast({
                    icon:'fail',
                    message:'用户名/密码不能为空'
                }) 
                return 
            }
            if (this.email === '') {
                this.$toast({
                    icon:'fail',
                    message:'邮箱不能为空'
                }) 
                return 
            }
            if (this.phoneNumber === '') {
                this.$toast({
                    icon:'fail',
                    message:'电话号不能为空'
                }) 
                return 
            }
            if (this.wechat === '') {
                this.$toast({
                    icon:'fail',
                    message:'微信号不能为空'
                }) 
                return 
            }
            if (this.password !== this.confirm_password) {
                this.$toast({
                    icon:'fail',
                    message:'密码不匹配'
                }) 
                return 
            }
            register(this.name, this.email, this.phoneNumber, this.wechat, this.password).then(data => {
                // 用户存在
                if (data.code == 200) {
                    this.$toast({
                        icon:'success',
                        message:'登录成功',
                        success:()=>{
                            this.$router.push({path:'/me'})
                        }
                    }) 
                    this.$store.dispatch('createUser',{
                        userName:this.userName
                    })
                    document.cookie = `token=${data.token};max-age=${30*24*60*60*1000}`
                    // console.log(document.cookie)
                    localStorage.setItem('user',this.userName)
                    localStorage.setItem('avator',data.avator)
                }else if(data.code == 201){
                    //新用户
                    this.$toast({
                        icon:'success',
                        message:'注册成功',
                        success:()=>{
                            this.$router.push({path:'/me'})
                        }
                    }) 
                    document.cookie = `token=${data.token};max-age=${30*24*60*60*1000}`
                    
                    localStorage.setItem('user',this.userName)

                }
            }).catch(e=>{
                this.$toast({
                    icon:'fail',
                    message: e.message
                }) 
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main_wrap{
    // position: absolute;
    // top: 50%;
    // width: 100%;
    // transform: translateY(-55%)
    margin-top: 1rem;
}
.user_title{
    display:flex;
    flex-direction: column;
    align-items: center;
    i{
        color: #2196f3;
        font-size: 60px;
    }
    h3{
        font-size: 18px;
        color: #2196f3;
    }
}
.user{
    .input_wrap{
        position: relative;
        margin-top: 0.5rem;
        i{
            font-size: 30px;
            color: #2196f3;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%)
        }
        input{
            border:none;
            width: 100%;
            padding:0.25rem 0;
            border-top:1px solid  #2196f3;
            border-bottom:1px solid  #2196f3;
            font-size: 16px;
            padding-left: 0.7rem;
            background: transparent; 
        }
        img{
            position: absolute;
            right: 0;
            top:50%;
            transform: translateY(-50%);
            height: 90%;
        }
        p{
            position: absolute;
            top: 0;
            right: 0;
            color: #ec5051;
        }
    }
    .submit{
        width: 70%;
        background: #2196f3;
        padding:0.2rem 0.3rem;
        border-radius:10px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        margin:0.2rem auto;
    }
    .register{
        width: 40%;
        padding:0.1rem 0.1rem;
        border-radius:10px;
        text-align: center;
        font-size: 18px;
        color: #102037;
        margin: 0.1rem auto;
    }
}
</style>
