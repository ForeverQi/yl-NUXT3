let eleSource = null;
var numRadius = 0;
var output = null;

// 模糊绘制的主方法
const funDrawBlur = () => {
    const eleOutput = document.createElement('canvas');
    const contextBlur = eleOutput.getContext('2d');
    // 绘制画布的尺寸
    eleOutput.width = eleSource.width;
    eleOutput.height = eleSource.height;

    // 填充底部图像
    contextBlur.clearRect(0, 0, eleOutput.width, eleOutput.height);
    contextBlur.drawImage(eleSource, 0, 0);

    // 创建一个屏外canvas
    var canvasOff = document.createElement('canvas');
    canvasOff.width = eleOutput.width;
    canvasOff.height = eleOutput.height;
    var contextOff = canvasOff.getContext('2d');

    // 支持canvas滤镜
    contextOff.filter = 'blur(' + numRadius + 'px)';
    // 绘制局部图像
    // console.log(contextBlur.filter, '009');
    // eslint-disable-next-line no-useless-call
    contextOff.drawImage.apply(contextOff, [0, 0, eleSource.width, eleSource.height]);
    // 上层图像绘制
    contextBlur.drawImage(canvasOff, 0, 0);
    output(eleOutput);
};

function localBlur(source, radius, outputFn) {
    numRadius = Number(radius);
    output = outputFn;
    eleSource = source;
    eleSource.onload = funDrawBlur;
}

export default localBlur;
