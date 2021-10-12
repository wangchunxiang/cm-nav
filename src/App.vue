<template>
  <div id="app" >
<!--    <h2>我是APP组件</h2>-->
<!--    &lt;!&ndash; 直接使用   &ndash;&gt;-->
<!--    <router-link to="/home">首页</router-link>-->
<!--    <router-link to="/about">关于</router-link>-->
<!--    &lt;!&ndash;通过函数跳转&ndash;&gt;-->
<!--    <button @click="homeClick">首页</button>-->
<!--    <button @click="aboutClick">关于</button>-->
<!--    <router-view></router-view>-->
    <my-nav/>
  </div>
</template>

<script>
import MyNav from './views/MyNav.vue'


export default {
  name: 'App',
  components: {
    MyNav
  }
}
</script>

<style>

#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*color: #2c3e50;*/
}


</style>
