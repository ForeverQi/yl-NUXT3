export const errorDataMap = new Map([
    ['empty', { imgPath: require('./asset/images/empty.png'), text: '内容正在上传中，请耐心等待' }],
    ['error', { imgPath: require('./asset/images/load-error.png'), text: '内容加载失败，请刷新页面' }],
    ['load', { imgPath: require('./asset/images/empty.png'), text: '数据加载中，请耐心等待' }],
    ['invalid', { imgPath: require('./asset/images/invalid.png'), text: '该页面已失效' }],
]);
