<template>
  <div class="page-container">
    <div class="page-main">
      <el-scrollbar ref="main-scrollbar">
        <div class="page-slot">
          <slot></slot>
        </div>
      </el-scrollbar>
    </div>
    <div v-show="$slots.ydk" class="page-ydk">
      <el-scrollbar ref="ydk-scrollbar">
        <slot name="ydk"></slot>
      </el-scrollbar>
    </div>
    <div v-show="$slots.form" class="page-form">
      <el-scrollbar ref="right-scrollbar">
        <slot name="form"></slot>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page',
  mounted() {
    addEventListener('resize', this.updateScrollbar);
  },
  unmounted() {
    removeEventListener('resize', this.updateScrollbar);
  },
  methods: {
    updateScrollbar() {
      this.$refs['main-scrollbar'].update();
      this.$refs['right-scrollbar'].update();
    }
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  height: calc(100vh);
  display: flex;

  .page-main {
    height: 100%;
    overflow: auto;
    flex-grow: 1;

    .page-slot {
      display: inline-flex;
      flex-wrap: wrap;
      vertical-align: top;
      padding: 20px;
    }
  }

  .page-form {
    height: 100%;
    width: 450px;
    flex-shrink: 0;
    border-left: 1px solid $border-color;
  }
  .page-ydk {
    height: 100%;
    width: 350px;
    flex-shrink: 0;
    border-left: 1px solid $border-color;
  }
}
</style>
