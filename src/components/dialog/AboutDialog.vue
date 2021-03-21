<template>
  <div class="about-dialog-container">
    <el-dialog title="关于游戏王卡片制作器 2.2.2" :modelValue="modelValue" width="500px" :before-close="closeDialog">
      <div class="about-main">
        <p>本软件遵从 MIT 开源协议</p>
        <p>开源地址:
          <el-button type="text" @click="toGithubRarnu">github.com/rarnu/electron-diy</el-button>
        </p>
        <p><b>依赖的开源项目</b></p>
        <p>&nbsp;&nbsp;
          <el-button type="text" @click="toToolsvue">tools-vue</el-button>
          一个使用vue开发的网页版工具包
        </p>
        <p>&nbsp;&nbsp;
          <el-button type="text" @click="toElectron">electron</el-button>
          使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序
        </p>
        <p><b>依赖的闭源后端</b></p>
        <p>&nbsp;&nbsp;
          <el-button type="text">tools.kooriookami.top/api</el-button>
          提供各语言的卡片效果数据
        </p>
        <div style="width: 100%; height: 1px; background: lightgray"></div>
        <p>
          <b>rarnu:</b> 之前想做红碎效果，谁想给自己挖了个大坑，才发现 html2canvas, <br/>
          dom-to-image 等组件都无法支持 <code>background-clip: text</code> 属性， 要<br/>
          自己改吧，我一个前端菜鸟死活没能搞定，鬼知道这几天我经历了什么。<br/>
          最终还是选择了 Electron 的截图 API 作为最终解决方案，也算是把功能实<br/>
          现了。后面没有特别大的问题就不改了，先这么用着吧 2333。
        </p>
      </div>
      <template #footer>
        <el-button plain size="medium" @click="closeDialog">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AboutDialog',
  props: ['modelValue'],
  methods: {
    closeDialog() {
      this.$emit('update:modelValue', false);
    },
    toToolsvue() {
      open('https://github.com/kooriookami/tools-vue');
    },
    toElectron() {
      open('https://www.electronjs.org/');
    },
    toGithubRarnu() {
      open('hhttps://github.com/rarnu/electron-diy');
    }
  }
};
</script>

<style lang="scss" scoped>
.about-dialog-container {
  .about-main {
    margin: -10px 0;

    p {
      line-height: 1.7;
      margin: 10px 0;

      .el-button {
        padding: 0;
        min-height: auto;
      }
    }
  }
}
</style>
