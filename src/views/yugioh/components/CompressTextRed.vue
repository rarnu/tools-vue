<template>
    <span v-compress-text="compressParams">
        <template v-for="item in textList">
            <span v-if="typeof item === 'object'" class="ruby" :text="item.ruby">{{ item.ruby }}<span class="rt" v-compress-rt>{{ item.rt }}</span></span>
            <span v-else class="ruby" :text="item">{{ item }}</span>
        </template>
    </span>
</template>

<script>
export default {
  name: 'CompressTextRed',
  props: ['text', 'width', 'height', 'language', 'fontLoading', 'autoSizeElement'],
  computed: {
    compressParams() {
      return {
        width: this.width,
        height: this.height,
        language: this.language,
        autoSizeElement: this.autoSizeElement   // 英文语言下压缩到一定程度，字体缩小的元素
      };
    },
    textList() {
      return this.text.replace(/\[.*?\(.*?\)]/g, s => `|${s}|`).split('|').filter(value => value).map(value => {
        if (/\[.*?\(.*?\)]/g.test(value)) {
          return {
            ruby: value.replace(/\[(.*?)\((.*?)\)]/g, '$1'),
            rt: value.replace(/\[(.*?)\((.*?)\)]/g, '$2')
          };
        }
        return value;
      });
    }
  },
  watch: {
    fontLoading() {
      if (!this.fontLoading) {
        // 强制刷新
        this.$forceUpdate();
      }
    }
  },
  directives: {
    // 压缩或拉伸注音文字
    compressRt(el) {
      let ruby = el.parentNode;
      let rt = el;
      rt.classList.remove('justify');
      ruby.style.margin = '';
      rt.style.transform = '';
      rt.style.left = '';

      let text = ruby.innerText.split('\n')[0];
      let rubyWidth = ruby.offsetWidth;
      let rtWidth = rt.offsetWidth;
      if (rtWidth / rubyWidth < 0.9 && text.length > 1) {
        // 拉伸两端对齐
        rt.classList.add('justify');
      } else if (rtWidth > rubyWidth) {
        // 压缩
        if (rubyWidth / rtWidth < 0.6) {
          // 防止过度压缩，加宽ruby
          // 公式：(rubyWidth + widen) / rtWidth = 0.6
          let widen = 0.6 * rtWidth - rubyWidth;
          ruby.style.margin = `0 ${widen / 2}px`;
          rt.style.transform = `scaleX(${(rubyWidth + widen) / rtWidth})`;
          rt.style.left = `${-widen / 2}px`;
        } else {
          rt.style.transform = `scaleX(${rubyWidth / rtWidth})`;
        }
      } else {
        // 不变并居中
        rt.style.left = `${(rubyWidth - rtWidth) / 2}px`;
      }
    },
    // 压缩文本文字
    compressText(el, binding) {
      let params = binding.value;
      if (params.width && params.height) {
        el.style.display = 'inline-block';
        el.style.width = `${params.width}px`;
        el.style.transform = '';
        el.style.transformOrigin = '0 0';

        let autoSizeElement = document.querySelector(params.autoSizeElement);
        autoSizeElement?.classList.remove('small-description');

        if (el.clientHeight > params.height) {
          // 用二分法获取最大的scale，精度0.01
          let scale = 0.5;
          let start = 0;
          let end = 1;
          while (scale > 0) {
            scale = (start + end) / 2;
            el.style.width = `${params.width / scale}px`;
            el.style.transform = `scaleX(${scale})`;
            el.clientHeight > params.height ? end = scale : start = scale;
            if (el.clientHeight <= params.height && end - start <= 0.005) {
              // 如果是英文，灵摆和效果栏字体判断缩小
              if (params.language === 'en' && params.autoSizeElement && scale < 0.7) {
                // 防止死循环
                if (autoSizeElement?.classList.contains('small-description')) {
                  break;
                } else {
                  autoSizeElement?.classList.add('small-description');
                  scale = 0.5;
                  start = 0;
                  end = 1;
                }
              } else {
                break;
              }
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.ruby {
  position: relative;
  color: #ff4545;

  .rt {
    text-shadow: none;
    -webkit-filter: drop-shadow(0 0 0 transparent);
    font-family: ygo-tip, sans-serif;
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    left: 0;
    top: 5px;
    text-align: center;
    white-space: nowrap;
    letter-spacing: 0;
    text-indent: 0;
    transform-origin: 0 0;

    &.justify {
      text-align-last: justify;
      left: 5%;
      width: 90%;
    }
  }
}

.ruby:before {
  content: attr(text);
  position: absolute;
  z-index: 10;
  color:#a31818;
  -webkit-mask-image: linear-gradient(#a31818, transparent, #a31818);
  -webkit-filter: drop-shadow(0px 1px 0px #090103);
  text-shadow: -1px -1px 0 rgba(8, 1, 3, 0.01), 0 0 0 rgba(255, 255, 255, 0.03);
}

</style>
