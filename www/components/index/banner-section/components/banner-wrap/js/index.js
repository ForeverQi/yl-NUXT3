export default (imgList, dotList, callback) => {
    /* 是否正在切换 */
    var isBannerImgSwitching = false;

    /* 当前展现的轮播图索引 */
    var currentBannerImgIndex = 0;

    /* 动画的持续时长，需要与css保持一致。单位：毫秒 */
    var animationDuration = 280;

    /* 单张轮播图的停留时长。单位：毫秒 */
    var stayDuration = 3000;

    /* 填充 DOM 元素 */
    var slideShowImgListObj = imgList;
    var slideShowTextListObj = dotList;
    var items = imgList.children;

    var clearState = function (bannerAObj) {
        bannerAObj.classList.remove('show');
        bannerAObj.classList.remove('next');
        bannerAObj.removeAttribute('data-slide-direction');
        // delete bannerAObj.dataset.slideDirection;
    };

    /**
     * 将轮播图切换至给定索引对应的图片上去
     * @param {Number} fromIndex 起始索引
     * @param {Number} toIndex 目标索引
     */
    var switchBannerImg = function (fromIndex, toIndex) {
        isBannerImgSwitching = true;

        var fromBannerAObj = slideShowImgListObj.querySelector('a[data-index=index-' + fromIndex + ']');
        var fromTextSpanObj = slideShowTextListObj.querySelector('a[data-index=index-' + fromIndex + ']');
        var toBannerAObj = slideShowImgListObj.querySelector('a[data-index=index-' + toIndex + ']');
        var toTextSpanObj = slideShowTextListObj.querySelector('a[data-index=index-' + toIndex + ']');

        var currentActiveAObj = slideShowImgListObj.querySelector('a.show');
        var currentActiveTextObj = slideShowTextListObj.querySelector('a.this');

        /* 确定轮播图切换方向 */
        var imgSlideDirection = toIndex > fromIndex ? 'upwards' : 'downwards';

        /* 确保切换前的轮播图处于 显现 状态 */
        currentActiveAObj && clearState(currentActiveAObj);
        currentActiveTextObj && currentActiveTextObj.classList.remove('this');

        /* 设定切换前的轮播图的切换方向 */
        fromTextSpanObj.classList.remove('this');
        fromBannerAObj.classList.add('show');
        // fromBannerAObj.dataset.slideDirection = imgSlideDirection;
        fromBannerAObj.setAttribute('data-slide-direction', imgSlideDirection);
        /* 切换要展现的下一个图片 */
        var currentNextAObj = slideShowImgListObj.querySelector('a.next');
        if (currentNextAObj) {
            currentNextAObj.classList.remove('show');
            currentNextAObj.classList.remove('next');
            // delete currentNextAObj.dataset.slideDirection;
            currentNextAObj.removeAttribute('data-slide-direction');
        }

        /* 设定切换后的轮播图的切换方向 */
        toTextSpanObj.classList.add('this');
        toBannerAObj.classList.add('next');
        // toBannerAObj.dataset.slideDirection = imgSlideDirection;
        toBannerAObj.setAttribute('data-slide-direction', imgSlideDirection);

        setTimeout(function () {
            fromBannerAObj.classList.remove('show');
            // delete fromBannerAObj.dataset.slideDirection;
            fromBannerAObj.removeAttribute('data-slide-direction');

            toBannerAObj.classList.remove('next');
            toBannerAObj.classList.add('show');
            // delete toBannerAObj.dataset.slideDirection;
            toBannerAObj.removeAttribute('data-slide-direction');

            currentBannerImgIndex = toIndex;
            isBannerImgSwitching = false;
        }, animationDuration);
    };

    /**
     * 呈现给定索引的轮播图
     * @param {Number} toIndex 要呈现的轮播图的索引
     */
    var showBannerImg = function (toIndex) {
        var currentActiveAObj = slideShowImgListObj.querySelector('a.show');
        var currentActiveTextObj = slideShowTextListObj.querySelector('a.this');

        var toBannerAObj = slideShowImgListObj.querySelector('a[data-index=index-' + toIndex + ']');
        var toTextSpanObj = slideShowTextListObj.querySelector('a[data-index=index-' + toIndex + ']');

        currentActiveAObj && clearState(currentActiveAObj);
        currentActiveTextObj && currentActiveTextObj.classList.remove('this');

        clearState(toBannerAObj);
        toBannerAObj.classList.add('show');
        toTextSpanObj.classList.add('this');

        currentBannerImgIndex = toIndex;
    };

    /**
     * 呈现或切换轮播图
     * @param {Number} [fromIndex] 起始索引
     * @param {Number} toIndex 目标索引
     */
    var wrapSwitchBannerImg = function (fromIndex, toIndex) {
        if (arguments.length < 2) {
            toIndex = arguments[0];
            fromIndex = null;
        }
        callback(toIndex);
        if (typeof fromIndex !== 'number' || fromIndex < 0) {
            showBannerImg(toIndex);
            return;
        }

        if (fromIndex === toIndex) {
            showBannerImg(toIndex);
            return;
        }

        switchBannerImg(fromIndex, toIndex);
    };

    /**************************************************************************/

    /**
     * 自动播放定时器
     */
    var autoplayTimer = null;

    /**
     * 停止自动播放
     */
    var stopAutoplay = function () {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    };

    /**
     * 开始自动播放
     */
    var startAutoplay = function () {
        stopAutoplay();
        autoplayTimer = setInterval(function () {
            var toIndex = (currentBannerImgIndex + 1) % items.length;
            wrapSwitchBannerImg(currentBannerImgIndex, toIndex);
        }, stayDuration);
    };

    /* 自动以无动画的方式展现第一个轮播图 */
    wrapSwitchBannerImg(0);
    /* 开始自动播放轮播图 */
    startAutoplay();

    /* 交互切换 */

    /* 防抖定时器 */
    var throttleTimer = null;
    /* 防抖时间范围。单位：毫秒 */
    var throttleTimeout = 30;

    var textSpanObjs = slideShowTextListObj.children;
    slideShowTextListObj.addEventListener('mouseenter', () => {
        stopAutoplay();
    });
    slideShowTextListObj.addEventListener('mouseleave', () => {
        startAutoplay();
    });
    // 轮播图滚动结束事件
    slideShowTextListObj.addEventListener('slideChangeTransitionEnd', () => {
        startAutoplay();
    });

    for (var i = 0; i < textSpanObjs.length; i++) {
        var textSpanObj = textSpanObjs[i];

        textSpanObj.addEventListener('mousemove', function () {
            if (isBannerImgSwitching) return;

            // var toIndex = Number(this.dataset.index.match(/index-(\d+)/)[1]);
            var toIndex = Number(this.getAttribute('data-index').match(/index-(\d+)/)[1]);

            clearTimeout(throttleTimer);
            throttleTimer = setTimeout(function () {
                wrapSwitchBannerImg(currentBannerImgIndex, toIndex);
            }, throttleTimeout);
        });

        textSpanObj.addEventListener('mouseout', function () {
            clearTimeout(throttleTimer);
            throttleTimer = null;
        });
    }
};
