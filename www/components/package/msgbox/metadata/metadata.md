## 组件基本信息

```json
{
    "$desc_title": "alert、comfirm弹窗",
    "$desc_usage": "作用于全局的对话框",
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

| 方法      | 说明         | 返回类型 | 参数   | 触发方式 |
| --------- | ------------ | -------- | ------ | -------- |
| showModal | 显示对话框   | --       | Object | 同步     |
| hide      | 隐藏对话框   | --       | --     | 同步     |
| ok        | 点击确定按钮 | --       | --     | 异步     |
| cancel    | 点击取消按钮 | --       | --     | 异步     |

### showModal 参数说明

| 方法            | 说明                | 类型     | 默认     |
| --------------- | ------------------- | -------- | -------- |
| obj             | showModal 入参      | Object   | {}       |
| obj.title       | 弹窗标题            | string   | 提示     |
| obj.content     | 弹窗内容            | string   | --       |
| obj.showCancel  | 是否暂时取消按钮    | any      | ''       |
| obj.confirmText | 确定按钮文字        | string   | 确定     |
| obj.cancelText  | 取消按钮文字        | string   | 取消     |
| obj.success     | 成功回调方法        | function | () => {} |
| obj.isHtml      | content 是否是 html | boolean  | false    |
| obj.hint        | 接口报错编码        | string   | null     |
| obj.type        | 弹窗类型            | string   | ''       |
