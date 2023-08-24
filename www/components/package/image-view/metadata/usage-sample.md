# 代码示例及效果展示

## 基本用法

```
<template>
  <div>
    <image-view :src="src" :type="`banner`" placeholderWidth="100%" placeholderHeight="auto" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: 'https://ufile.niceloo.com/api/file/download?action=view&path=2023%2F01%2F30%2FA%2F1675071543021120000470728.png',
    };
  },
  moutend() {
    this.$nextTick(() => {
      const loading = this.$baseUI.loading();
      setTimeout(() => {
        loading.close();
      }, 5000);
    });
  },
}
</script>
```
