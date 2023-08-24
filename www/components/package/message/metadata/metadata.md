## 组件基本信息

```json
{
    "$desc_title": "轻提示",
    "$desc_usage": "接口请求网络报错、业务需要轻提示的时候",
    "$desc_note": "无",
    "$desc_availableScope": "public",
    "$desc_supportedVueVersion": [2],
    "$desc_ifSupportGlobalEventBus": false
}
```

## 组件插槽

无

## 组件事件

无

## 组件事件对象说明-obj

无

## 组件方法

| 方法             | 说明             | 返回类型 | 参数   | 触发方式 |
| ---------------- | ---------------- | -------- | ------ | -------- |
| showMessage      | 显示提示         | --       | Object | 同步     |
| close            | 关闭提示         | --       | --     | 同步     |
| handleAfterLeave | 销毁轻提示       | --       | --     | 同步     |
| animationEnd     | 动画结束时的回调 | --       | --     | 同步     |

### showMessage 参数说明

| 方法        | 说明               | 类型   | 默认                          |
| ----------- | ------------------ | ------ | ----------------------------- |
| obj         | showMessage 带入参 | Object | {}                            |
| obj.type    | 轻提示类型         | string | success、error、info、warning |
| obj.content | 轻提示内容         | string | --                            |
