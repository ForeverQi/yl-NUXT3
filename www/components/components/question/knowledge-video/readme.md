## 组件位置：components\components\question\knowledge-video\index.vue

```
<knowledge-video
	show-next
    v-model="knowledgeVideoData.knowledgeId"
    :show.sync="knowledgeVideoData.isShow"
    :type="knowledgeVideoData.type"
    :list="videoList"
 />
```

## 1属性使用

### 1.1 show

```
是否展示考点讲解弹窗/做题练习弹窗
默认值：false
```

### 1.2 showNext

```
是否展示下一个知识点
默认值：false
```

### 1.3 type

```
类型：字符串
默认值：'knowledge'
'knowledge' 展示知识点视频讲解
'question' 展示做题内容
```

### 1.4 list

```
知识点列表
类型：数组 Array
举例必要参数
[{
 	knowledgeId:"KNOWLEDGE20220614000000000001" // 知识点id
    knowledgeTitle:"呼呼" // 知识点名称 获取接口（ks/knowledge/starlevel）
    paperId:"PAPER20220629000000150001", // 做题练习标识 1：获取接口：考点分析和考点讲解页面通过-试卷id（qb/business/support/knowledge/paper/list）2：试题解析考点获取接口：qb/business/support/question/knowledge/list
    state:"Y",// 'Y'有知识点讲解,（获取接口rc/web/resourcevideo/dot/status）
    resourceId:'',// 知识点考点讲解视频资源id（用于获取保利威视频token）（获取接口rc/web/resourcevideo/associated/dot）
    option：{ //保利威视频配置项 （获取接口rc/web/resourcevideo/associated/dot）
       videoId:'',// vid
       start:'',// 打点开始时间
       end:'',// 打点结束时间
    }
}]
```

### 1.5 subjectId 科目id（基础数据）

```
类型：字符串
用途：（type="question" 时使用 做题统计）
```

### 1.6  classId 班级id（基础数据）

```
类型：字符串
用途：（type="question" 时使用 做题统计）
```



## 2：事件

### 2.1 change(currentKnowledgeId) 

```
切换知识点时,抛出知识点id
```

### 2.2 post-success(answersheetId) 

```
精准练习，提交成功回调-抛出答题卡ID，此时做题弹窗会关闭，弹窗学习报告弹窗
```

### 2.3 close-report() 

```
关闭-精准练习学习报告-回调方法
```
