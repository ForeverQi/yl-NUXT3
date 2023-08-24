# 代码示例及效果展示

## 基本用法

```
<template>
  <div>
    <msg-box ref="msgBox" />
  </div>
</template>
<script>
export default {
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

## 不确定创建加载框位置的用法

```
<template>
  <div>
    <msg-box ref="msgBox" />
  </div>
</template>
<script>
export default {
  moutend() {
    this.$nextTick(() => {
      this.$baseUI.loading();
      setTimeout(() => {
        this.$baseUI.loading.closeAll();
      }, 5000);
    });
  },
}
</script>
```
