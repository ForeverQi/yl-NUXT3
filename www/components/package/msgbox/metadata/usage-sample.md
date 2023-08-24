# 代码示例及效果展示

## 普通弹窗-内容是 txt

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
      this.showAlert();
    });
  },
  methods() {
    showAlert() {
      this.$refs.msgBox.showModal({
        type: 'alert',
        title: '提示',
        content: '这是一个示例',
        showCancel: false,
        confirmText: '知道了',
        success: (res) => {
          // res => { confirm: true }
          console.log('点击了按钮');
        }
      });
    },
  },
}
</script>
```

## 普通弹窗-内容是 html

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
      this.showAlert();
    });
  },
  methods() {
    showAlert() {
      this.$refs.msgBox.showModal({
        type: 'alert',
        title: '提示',
        isHtml: true,
        content: '<p>这是一个html的弹窗示例</p>',
        showCancel: false,
        confirmText: '知道了',
        success: (res) => {
          // res => { confirm: true }
          console.log('点击了按钮');
        }
      });
    },
  },
}
</script>
```

## 询问弹窗-内容是 txt

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
      this.showAlert();
    });
  },
  methods() {
    showAlert() {
      this.$refs.msgBox.showModal({
        type: 'confirm',
        title: '提示',
        content: '这是一个示例',
        showCancel: true,
        confirmText: '知道了',
        cancelText: '取消',
        success: (res) => {
          // res => { confirm: true } // 点击“知道了”按钮
          // res => { cancel: true } // 点击了“取消”按钮
          console.log('点击了按钮');
        }
      });
    },
  },
}
</script>
```

## 询问弹窗-内容是 html

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
      this.showAlert();
    });
  },
  methods() {
    showAlert() {
      this.$refs.msgBox.showModal({
        type: 'confirm',
        title: '提示',
        isHtml: true,
        content: '<p>这是一个html的弹窗示例</p>',
        showCancel: true,
        confirmText: '知道了',
        cancelText: '取消',
        success: (res) => {
          // res => { confirm: true } // 点击“知道了”按钮
          // res => { cancel: true } // 点击了“取消”按钮
          console.log('点击了按钮');
        }
      });
    },
  },
}
</script>
```

## 全局服务式用法 - alert

```
<template>
  <div>
  </div>
</template>
<script>
export default {
  moutend() {
    this.$nextTick(() => {
      this.showAlert();
    });
  },
  methods() {
    showAlert() {
      this.$baseUI.alert('这是一个示例', '提示').then(() => {
        console.log('点击了确定按钮');
      });
    },
  },
}
</script>
```

## 全局服务式用法 - alert（自定义按钮名称）

```
<template>
  <div>
  </div>
</template>
<script>
export default {
  moutend() {
    this.$nextTick(() => {
      this.showAlert();
    });
  },
  methods() {
    showAlert() {
      this.$baseUI.alert('这是一个示例', '提示', {
        'confirmText': '自定义按钮'
      }).then(() => {
        console.log('点击了确定按钮');
      });
    },
  },
}
</script>
```

## 全局服务式用法 - confirm

```
<template>
  <div>
  </div>
</template>
<script>
export default {
  moutend() {
    this.$nextTick(() => {
      this.showAlert();
    });
  },
  methods() {
    showAlert() {
      this.$baseUI.confirm({
        title: '提示',
        isHtml: true,
        content: '<p>这是一个html的弹窗示例</p>',
        showCancel: true,
        confirmText: '知道了',
        cancelText: '取消',
      }).then(() => {
        console.log('点击了知道了按钮');
      }).catch(() => {
        console.log('点击了取消按钮');
      });
    },
  },
}
</script>
```
