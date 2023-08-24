### 试题相关组件的目录集合

## question-timer 计时器组件
```html
<question-timer ref="timer" :start-seconds="0" @change="change(当前秒数:Number,当前秒数格式化的时间文字:String)" />
```
@apis
api_start() 开始或恢复计时
api_pause() 暂停计时器
api_reset() 重置计时器，将时间重置为0，并暂停计时器(若为倒计时，则会重置为默认值)
api_getTime() 获取当前的计时信息，返回值{seconds:当前秒数, time: 当前秒数格式化的时间文字}

@events
change(当前秒数:Number,当前秒数格式化的时间文字:String) 每当秒数发生变化时都会触发
change-status(当前状态) 点击暂停或开始按钮触发，值为start或pause
end() 计时结束时触发

注意： 更改入参start-seconds时会导致计时器重置成入参值，并暂停计时器

## question-tool 学习工具组件
```html
<question-tool showPoint showDictionary />
```
@props
1. showPoint:boolean 是否展示考点秒懂
2. showDictionary:boolean 是否展示词点快查

## question-card 答题卡组件
```html
<question-card :list="[]" :paperType="errorBook" @item-click />
```
@props
1. paperType:string 试卷类型，用于展示不同答题卡样式 default做题 errorBook错题本/paperWrong错题解析 collectBook收藏夹/paperAll全部解析；
2. list:array 传入的小题列表；
3. current:number 当前试题下标

@events
1、item-click(点击的元素信息,点击元素所属的类型信息)

# knowledge-table 考察考点表格组件
```html
<knowledge-table :list="[]" @click-explain="" @click-question="" />
```
@props
1. list:array 知识点列表
2. maxHeight:string tbody的最大高度，默认470px滚动,auto为不限制

@events
1、click-explain(点击的元素信息) 点击了考点讲解
1、click-question(点击的元素信息) 点击了做题练习

# analysis-tab 科目测评页的tab区块
```html
<analysis-tab :active.sync="[]" @change="" />
```
@props
1. active:string 当前选中的tab,支持.sync

@events
1、change(点击的tab) 切换tab时触发

## 答题组件

# paper.js

1. 组卷所用 paper 类，其属性和方法用于支撑试卷所需大部分数据（PC 的解析模块中视频来源、知识点列表依序查询接口过多，不宜放在组卷时同步查询，因此视频解析和知识点列表相关接口抽出在组件内单独查询）；
2. 通过 new Paper 分发三种组卷情况：成套卷组卷（包括错题本/收藏夹抽题组卷）、错题本解析、收藏夹解析；

```js
/**
 * 成套试卷组卷，最基础的做题组卷参数：必传paperId和sourceType
 */
new Paper({
    paperId, // 试卷标识
    sourceType, // 试卷来源
});
/**
 * 学习中心的课内练习组卷，需根据classId和coursewareId查询答题卡，比基础做题组卷参数多了classId和coursewareId
 */
new Paper({
    paperId,
    sourceType,
    classId, // 班级标识
    coursewareId, // 资源标识
});
/**
 * 成套卷解析初始化，比基础做题组卷参数多了answersheetId
 */
new Paper({
    paperId,
    sourceType,
    answersheetId, // 答题卡标识
});
/**
 * 错题本/收藏夹全部解析，非试卷维度，通过参数scene进行分发查询
 */
new Paper({
    scene, // 枚举值：wrong错题本 collect收藏夹
    subjectId, // 科目标识
    pageIndex, // PC的全部解析有分页
    pageSize, // PC的全部解析有分页，分页数量
    questionType, // 试题类型
    sourceType, // 试卷来源
    projectUniCode, // 项目唯一编码
});
```

3. 组卷完成/失败，可通过 `Paper.onInitPaper` 、 `Paper.onError` 监听，并在其回调进行数据操作；

```js
this.testPaper = new Paper({
    paperId,
    sourceType,
});
// 监听试卷初始化成功
this.testPaper.onInitPaper(() => {
    // 回调处理需传入试题入口组件的各数据
});
// 监听试卷初始化失败
this.testPaper.onError((err) => {
    // 组卷抛出的err是Paper类做过处理的接口错误信息msg，字符串；错题本/收藏夹解析组卷抛出的未做处理，是接口报错返回的err
});
```

4. paper类封装方法

| 方法/属性            | 说明                          | 回调/参数                      | 
| ------------------- | ----------------------------- | ----------------------------- | 
| supportQuestionType | 该属性定义paper类目前支持的题型，非支持题型的题目不会参与组卷，代码内处理将不被支持的题目在控制台以 `warning` 形式输出 | | 
| queryPaperQuestions() | 查询题目数据，目前可用于有`paperId`的组卷和解析的基础组卷，通过改变入参进行基础组件及其引申定制 | 必传参数 {paperId, sourceType} | 
| queryWrongQuestions() | 查询错题本全部解析页所需数据，支持分页 | 必传参数 {sourceType, questionType, projectUniCode} | 
| queryCollectQuestions() | 查询收藏夹全部解析页所需数据，支持分页 | 必传参数 {sourceType, questionType, projectUniCode} | 
| queryQuestionsParse() | 查询题目解析，以上三个组卷方法中会调用其查询题目解析 | | 
| onInitPaper() | 监听试卷初始化完成事件，页面new Paper()后监听组卷完成，并在其回调中操作组件所需数据 | 回调callback | 
| onError() | 监听试卷初始化错图信息，页面new Paper()后监听组卷报错，并在其回调中进行错误处理 | 回调callback | 
| error() | 抛出错误信息方法 | 参数是paper类捕获的报错err | 
| getPaperDetail() | 获取试卷详情，返回一个对象。如new paper()时没有paperId，则为空对象 | | 
| getRawQuestionById() | 通过`questionId`获取题目原始数据 | 必传参数 {questionId} | 
| getPaperQuestionTypeList() | 获取试卷题目类型数组 | | 
| getQuestionList() | 从试卷详情中获取逐个题目数据，然后组合组件所需数据格式，支持传入自定义格式化方法。其先使用工厂类定义的格式化方法进行试题过滤，后使用自定义格式化方法对试题进行过滤，并将其返回。注意：调用该方法 会 改变paper实例内的questionList属性 | 非必传参数 {format} | 
| getQuestionListCount() | 获取错题本或收藏夹试题列表总长度，因错题本和收藏夹通过分页查询，可使用此方法获取列表总长度 | 
| getLastAnswerQuestionIndex() | 查找最后做题的题目索引，支持传入自定义验证方法 | 非必传参数 {checkFun} | 
| getQuestionAnswerDetailByAnswerSheet() | 通过`questionId`获取答题卡题目做题记录 | | 
| saveOrSubmitAnswer() | 保存或提交题目答案，使用网关2.0接口 | 具体参数见该方法，注意：其参数`questions`是用户本次提交时修改的试题合集，集合内不包含的题目，后端会按“如有上次提交则使用上次提交，如没有上次提交则为未答”来处理 | 
| addCollect() | 添加收藏 | 必传参数 {questionId}, 支持传入success和fail回调 | 
| cancelCollect() | 取消收藏 | 必传参数 {collectId}, 支持传入success和fail回调 | 

1. 设计思路：  
    * 通过实例化Paper类时不同入参，一次性完成组卷（解析）必须接口查询，并将组件所需数据和方法进行挂载和定义，以供按需获取、调用。 
    * 根据是否有paperId、不同情况下查询接口的差异性将组卷（解析）分为paper、wrong、collect三种形式，通过实例化时入参`scene`来进行分发请求： 
        1. 有paperId的标准组卷，需要根据paperId查询试卷详情和该试卷所有题型列表，再根据题型列表查询不同题型的题目详情并组成套卷。同时支持查询题目解析和恢复上次答题卡，同样是根据实例化时入参变化来控制是否查询解析和恢复答题卡，默认查询并恢复；
        2. 无paperId的错题本全部解析、收藏夹全部解析，被分发去对应方法请求对应接口，同样支持根据实例化时入参变化来控制是否查询解析。
        3. 通过`scene`控制接口调用提供了定制化的功能：如后续添加新的组卷方式，也可根据添加scene枚举来分发到新的组卷方法。
    * 组卷一旦完成，抛出`initPaper`和当前实例，调用页面则通过onInitPaper()监听组卷完成。同理，如组卷过程中发生接口报错，错误信息会被捕获抛出，调用页面则通过onError()监听、处理。
    * 接口返回的数据中，并非所有均为用户端前端可使用、有用的。同理，接口返回数据也并非能完全满足用户端前端组件所需。因此提供了getQuestionList()方法以供页面调用，其可根据不同使用场景，对组件所用的`questionList`属性进行自定义格式化，修改、添加数据以供不同场景组件编译所用。该方法会先使用工厂类所定义的基础格式化方法对试题数据进行整理、合并，再使用调用该方法传入的自定义方法再次格式化。注意，其会改变paper实例的questionList属性。 
    建议：接口返回的数据、前端添加的通用性强的属性，在工厂类里定义保留、paper类内处理添加；定制化的、通用性不强的属性，可在页面调用该方法时添加，也可在工厂类定义默认值表明有这样一个属性，添加可读性、避免随着项目和人员更迭出现遗漏。
    * 页面传入题库入口文件的数据其实是paper类实例里的初始数据，以`questionList`和`paperQuestionTypeList`为基础，在题库入口文件内部进行中转和组件所需数据结构转换，后续的数据内属性操作也放在了组件内部，例如用户改变答案，实际上操作的是入口文件实例的questionList，而非页面获取的questionList，也非paper实例内的questionList，为页面内前后数据比对提供可能性。

# format.js

1. 工厂类，用于管理答题组件内各种不同题型的数据格式，其内针对 paper 类定义的各类题型进行了格式化，规范了以每一道小题为维度的前端所需的数据。未在其内定义的属性、也未在调用getQuestionList()方法时添加的属性，不会出现在paper实例的questionList属性中。
2. 因此，如功能更迭、接口添加新属性，务必在工厂类内进行定义和添加，否则会被过滤：可在 format 的`createObjectiveQuestion()` `createSubjectiveQuestion()`两个方法中修改/添加字段和功能，或者修改小题维度的数据结构。
3. 因其内均以基础题型为维度进行定义和调用格式化方法，自由度非常高，方便对某个复合题型下的某个基础题型进行定制化数据整理。

# apis.js

* 定义了答题组件内所需的大部分接口（如上所述原因，解析模块中视频来源、知识点列表依序查询相关接口不在此处定义）。

# utils.js

* 工具类，管理答题组件所需的所有工具类函数，如有增改，建议也于此处统一管理。

# event.js

* 事件处理类，定义事件监听、触发监听、一次监听、移除监听等。

# 混入：mixins/index.js

1. PC 端的课内练习解析页、收藏夹/错题本组卷做题后的解析页专用。为解决全部试题模式查询接口过多的问题：因解析组件中的视频解析逻辑是以小题为维度，如题库未返回则查询源点库，而知识点列表则是先查知识点列表、再根据知识点查考点星级、考点讲解、考点做题练习，一套卷子题目很多，组卷时全部查询接口数量太大，因此放在了解析组件内单独查询；
2. 解析页组卷时只默认查询第 1 道题的解析视频、知识点、星级、讲解和做题练习，查询与否根据小题的`showParseImmediately`属性控制。混入文件的作用即监听试题是否进入视区，若进入则更改`showParseImmediately`值为 `true`，解析组件则据此调用接口，以减少并发量；
3. 该文件已处理了通用的 current 变化、页面加载完成后的监听和取消监听，以及销毁时取消监听。如有增改，建议也在该文件内统一管理。
4. 后续迭代建议：
   1. 不支持intersectionObserver属性的浏览器，从目前的全部赋true，改为定时器/延时器赋true，尽量分散触发接口请求时间；
   2. 只有全部试题模式使用混入进行接口调用，单题模式current改变时同时更改`showParseImmediately`属性实现一题一查询； 
   3. 查询后的数据进行存储，减少因切换全部解析/错题解析tab导致的重复请求；

# 组卷文件 @/www/components/components/question/question-init.vue
1. props 入参
    1. paperParsingSource: { String } 类型当前卷子是解析还是做题, 默认为: `''`, '': 做题, parsing: 解析
    2. showKnowledge: { Boolean } 是否展示解析当中的考察考点, 默认为: `true`, true: 展示， false: 隐藏
    3. showCloseAll: { Boolean } 是否展示左上角收起全部按钮, 默认为: `true`, true: 展示， false: 隐藏
    4. paperSourceType: { String } 试卷类型, 默认为: `''`, errorBook: 错题本/解析页, collectBook: 收藏夹, questionModel: 弹窗做题, '': 普通试卷
    5. setType: { Boolean } 外部传入 type, 默认为: `false`, true: 单题模式, false: 多题模式
    6. list: { Array } 当前小题列表
    7. paperQuestionTypeList: { paperQuestionTypeList } 当前卷子的题型列表，用于组装前端数据结构
    8. current: { Number } 当前所答题目在小题集合questionList中的下标, 默认为: `0`,

2. 可供页面调用方法
    1. setData(obj, target) 设置当前/目标试题数据
        obj: {Object} 必传，需要更改的数据，e.g. {collectId: res.collectId,showParseImmediately: true,}
        target: {String} 非必传，需要更改的目标，可以理解为所操作数据在questionList中的index，传则根据其更改，不传则默认更改当前下标对应数据
    2. getData() 获取当前试题数据，返回当前下标的试题数据
    3. getList() 获取全部组件题目数据，即当前组件内最新的小题`questionList`
