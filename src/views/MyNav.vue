<template>
  <div class="myDiv">
    <el-container>

      <el-aside>
        <el-menu
            :collapse="isCollapse"
            :collapse-transition=false
            :default-active="activeMenu"
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical" text-color="#fff"
            @select="jump"
        >
          <!--logo-->
          <el-image class="logo"
                    fit="scale-down"
                    src="/img/logo.png"
          ></el-image>
          <!--菜单List-->
          <el-menu-item v-for="(item,index) in menuData" :key="index" :index="(index+'')">
            <i :class="setIcon(item.i)"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
          <!--展开/折叠-->
          <el-menu-item index="-1" @click="openOrClose()">
            <i :class="this.isCollapse===false?'el-icon-s-fold':'el-icon-s-unfold'"></i>
            <span slot="title">{{ isCollapseText }}</span>
          </el-menu-item>

        </el-menu>
      </el-aside>

      <el-main :style="mainStyle">
        <div v-for="(item,index) in menuData" :key="index">

          <el-divider content-position="left">
            <el-tag :id="'nav-content-title-'+index">{{ item.name }}</el-tag>
          </el-divider>

          <div :style="{height:(index===(menuData.length-1)?lastDivHeight:'auto')}" class="nav-content">
            <el-row :gutter="10">
              <div v-for="(st,sti) in siteData" :key="sti">
                <el-col v-if="st.type===(index+1)" :span="4" class="e-col" style="margin-top: 10px;min-width: 245px">
                  <el-card ref="elcard" :body-style="{ padding: '10px' }" shadow="hover" @click.native=openSite(st.url)>
                    <div style="display: flex;align-items: center;">
                      <el-image :src=st.ico class="site-ico" fit="fill"></el-image>
                      <div :title="st.name" class="ellipsis-text site-name">{{ st.name }}</div>
                    </div>
                    <el-divider class="card-divider"></el-divider>
                    <div :title="st.content" class="ellipsis-text site-content">{{ st.content }}</div>
                  </el-card>
                </el-col>
              </div>
            </el-row>
          </div>

        </div>
      </el-main>

    </el-container>


    <!--回到顶部-->
    <el-backtop :bottom="100" target=".el-main">
      <div class="backtop">
        <i class="el-icon-arrow-up"></i>
      </div>
    </el-backtop>
  </div>
</template>

<script>
import siteData from "../../public/data/siteData.json";

export default {
  name: "MyNav",
  components: {},
  data() {
    return {
      isCollapse: false,
      isCollapseText: '折叠',
      menuData: [
        {"name": "常用", "i": "el-icon-star-off"},
        {"name": "资讯", "i": "el-icon-document"},
        {"name": "工具", "i": "el-icon-folder"},
        {"name": "开发", "i": "el-icon-monitor"},
        {"name": "资源", "i": "el-icon-download"},
        {"name": "其他", "i": "el-icon-files"}
      ],
      mainStyle: {
        left: '120px'
      },
      activeMenu: '0',
      lastDivHeight: 'auto',
      siteData: '',
      tipWidth: ''
    };
  },
  methods: {
    arraySort(property) {
      return function (a, b) {
        let value1 = a[property]
        let value2 = b[property]
        return value1 - value2
      }
    },
    openSite(url) {
      window.open(url, '_blank') // 新窗口打开外链接
      // window.location = url;
    },
    setIcon(val) {
      let obj = {};
      obj[`${val}`] = true;
      return obj;
    },
    openOrClose() {
      this.isCollapse = !this.isCollapse;
      this.isCollapseText = this.isCollapse ? '展开' : '折叠';
      this.mainStyle.left = this.isCollapse ? '64px' : '120px';
    },
    //菜单锚点双向绑定 start
    jump(key) {
      if ("-1" === key) {
        return
      }
      console.log("key:" + key);
      let navContentId = '#nav-content-title-' + key;
      console.log(navContentId);
      this.$nextTick(() => {
        document.querySelector(navContentId).scrollIntoView({
          behavior: "auto", // 平滑过渡
          block: "start" // 上边框与视窗顶部平齐。默认值
        });
      });
    },
    onScroll(e) {
      let scrollItems = document.querySelectorAll(".nav-content");
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
        let judge =
            e.target.scrollTop >=
            scrollItems[i].offsetTop - scrollItems[0].offsetTop;
        if (judge) {
          this.activeMenu = i + '';
          break;
        }
      }
    },
    //菜单锚点双向绑定 end
    changeLastDivHeight() {
      //修改最后一个div的高度，避免高度不足时菜单双向绑定出现bug
      let items = document.querySelectorAll(".nav-content");
      let lastDiv = items[items.length - 1];
      let divHeight = lastDiv.offsetHeight;
      let winHeight = window.innerHeight;
      let newHeight = (winHeight - 60) + 'px';
      this.lastDivHeight = (divHeight - winHeight) < 0 ? newHeight : divHeight;
    },

  },
  mounted() {
    // 加载siteData，并排序
    this.siteData = siteData.sort(this.arraySort('sortId'));

    document.addEventListener("scroll", this.onScroll, true);
    this.changeLastDivHeight();

    window.onresize = () => {
      //窗口大小改变时候，也改变最后一个div的高度
      this.changeLastDivHeight();

    }
  },
  destroyed() {
    document.removeEventListener("scroll", this.onScroll);
  }


}

</script>

<style scoped>
.myDiv {

}

.el-menu-vertical {
  height: 100vh;
  max-width: 120px;
}

.el-aside {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 120px;
}

.logo {
  width: auto;
  height: 56px;
}

.el-main {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
}

.el-card:hover {
  cursor: pointer;
}

.site-ico {
  min-width: 30px;
  min-height: 30px;
  width: 30px;
  height: 30px
}

.site-name {
  margin-left: 10px;
  min-width: 160px;
  font-size: 18px
}

.site-content {
  font-size: 12px;
  color: #979898
}

.card-divider {
  margin: 5px 0;

}

.backtop {
  height: 100%;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, .12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}

.ellipsis-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>