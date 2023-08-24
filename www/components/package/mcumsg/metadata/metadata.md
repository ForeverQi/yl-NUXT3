## 组件基本信息

```json
{
    "$desc_title": "微课的弹窗提示",
    "$desc_usage": "业务错误或操作提示的时候",
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

| 方法      | 说明           | 返回类型 | 参数   | 触发方式 |
| --------- | -------------- | -------- | ------ | -------- |
| showModal | 显示弹窗       | --       | Object | 同步     |
| hide      | 隐藏弹窗       | --       | --     | 同步     |
| ok        | 点击了确定按钮 | --       | --     | 同步     |
| cancel    | 点击了取消按钮 | --       | --     | 同步     |

### showModal 参数说明

| 方法            | 说明             | 类型     | 默认     |
| --------------- | ---------------- | -------- | -------- |
| obj             | showModel 入参   | object   | {}       |
| obj.title       | 弹窗标题         | string   | 提示     |
| obj.content     | 弹窗内容         | string   | --       |
| obj.showCancel  | 是否显示取消按钮 | boolean  | --       |
| obj.showConfirm | 是否显示确定按钮 | boolean  | --       |
| obj.confirmText | 确定按钮文字提示 | string   | 确定     |
| obj.cancelText  | 确定按钮文字提示 | string   | 取消     |
| obj.success     | 回调事件         | function | () => {} |
