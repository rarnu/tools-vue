<template>
  <div class="kanji-kana-dialog">
    <el-dialog title="一键注音" :modelValue="modelValue" width="500px" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form ref="form" :model="form" label-position="top" size="small">
        <el-form-item label="注音只支持 OCG 常用语" prop="text">
          <el-input type="textarea" :autosize="{minRows: 3}" v-model="form.text" placeholder="请输入文本"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button plain size="medium" @click="closeDialog">关闭</el-button>
        <el-button type="primary" size="medium" @click="remoteKanaEffect">注音(偏重卡片效果)</el-button>
        <el-button type="primary" size="medium" @click="remoteKanaNormal">注音(偏重日语语句)</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'KanjiKanaDialog',
  props: ['modelValue'],
  data() {
    return {
      form: {
        text: ''
      }
    };
  },
  created() {
    try {
      ipcRenderer.on('remote-kanji-kana-reply', (event, args) => {
        this.form.text = args.text;
      });
    } catch (e) {

    }
  },
  methods: {
    closeDialog() {
      this.resetForm('form');
      this.$emit('update:modelValue', false);
    },
    remoteKanaEffect() {
      this.effectKanjiKanaAPI(this.form.text).then(kk => {
        if (kk) {
          this.form.text = kk;
        } else {
          this.form.text = this.kanjiToKana(this.form.text);
        }
      });
    },
    remoteKanaNormal() {
      this.normalKanjiKanaAPI(this.form.text).then(kk => {
        if (kk) {
          this.form.text = kk;
        } else {
          this.form.text = this.kanjiToKana(this.form.text);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.kanji-kana-dialog {

}
</style>
