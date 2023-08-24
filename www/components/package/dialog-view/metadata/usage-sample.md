# 代码示例及效果展示

## 基本用法

```
<template>
  <div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  moutend() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      this.$baseUI.createModel({
          modalContent: <div>主要{{ txt }}内容</div>,
          modalHeader: (
              <div class="title-wrap">
                  <h2 class="title">标题</h2>
              </div>
          ),
          modalFooter: (
              <div class="footer-wrap">
                  <a class="download" download target="_blank" >
                      下载
                  </a>
              </div>
          ),
      },
      { txt: '示例' },
      {
          width: '890px',
          radius: '16px',
      });
    },
  },
}
</script>
```
