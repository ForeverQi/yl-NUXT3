# 代码示例及效果展示

## 全局服务式用法 - success

```
<template>
  <div>
  </div>
</template>
<script>
export default {
  moutend() {
    this.$nextTick(() => {
      this.showSuccess();
    });
  },
  methods() {
    showAlert() {
      // 3s后自动消失
      this.$baseUI.success('示例展示');
    },
  },
}
</script>
```

## 全局服务式用法 - error

```
<template>
  <div>
  </div>
</template>
<script>
export default {
  moutend() {
    this.$nextTick(() => {
      this.showSuccess();
    });
  },
  methods() {
    showAlert() {
      // 3s后自动消失
      this.$baseUI.error('示例展示');
    },
  },
}
</script>
```

## 全局服务式用法 - warning

```
<template>
  <div>
  </div>
</template>
<script>
export default {
  moutend() {
    this.$nextTick(() => {
      this.showSuccess();
    });
  },
  methods() {
    showAlert() {
      // 3s后自动消失
      this.$baseUI.warning('示例展示');
    },
  },
}
</script>
```

## 全局服务式用法 - info

```
<template>
  <div>
  </div>
</template>
<script>
export default {
  moutend() {
    this.$nextTick(() => {
      this.showSuccess();
    });
  },
  methods() {
    showAlert() {
      // 3s后自动消失
      this.$baseUI.info('示例展示');
    },
  },
}
</script>
```
