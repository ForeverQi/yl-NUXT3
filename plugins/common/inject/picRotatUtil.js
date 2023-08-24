import ResUtil from './resUtil';
let inited = false;
let Orientation = '';
let ret = {
    ready(cb) {
        if (inited) {
            cb();
            return;
        }
        ResUtil.loadJs(
            '/_nuxt/jsFile/exif.js',
            function () {
                inited = true;
                cb();
            },
            function () {
                inited = false;
                console.error('picRotatUtil的需要的js加载失败！');
            }
        );
    },
    checkDirection(file, cb) {
        //检查方向
        let _this = this;
        _this.ready(function () {
            EXIF.getData(file, function () {
                EXIF.getAllTags(this);
                Orientation = EXIF.getTag(this, 'Orientation');
                if (Orientation == 6 || Orientation == 3 || Orientation == 8) {
                    //顺时针90° 6   逆时针90°	8  180°	3
                    _this.rotato(file, Orientation, cb);
                } else {
                    cb(file);
                }
            });
        });
    },
    rotato(file, Orientation, cb) {
        //旋转
        let oReader = new FileReader();
        oReader.onload = function (e) {
            let image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                let expectWidth = this.naturalWidth;
                let expectHeight = this.naturalHeight;

                if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                    expectWidth = 800;
                    expectHeight = (expectWidth * this.naturalHeight) / this.naturalWidth;
                } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                    expectHeight = 1200;
                    expectWidth = (expectHeight * this.naturalWidth) / this.naturalHeight;
                }
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                let base64 = null;
                //修复ios
                if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
                    //如果方向角不为1，都需要进行旋转 added by lzk
                    if (Orientation != '' && Orientation != 1) {
                        switch (Orientation) {
                            case 6: //需要顺时针（向左）90度旋转
                                // alert('需要顺时针（向左）90度旋转');
                                rotateImg(this, 'left', canvas);
                                break;
                            case 8: //需要逆时针（向右）90度旋转
                                // alert('需要顺时针（向右）90度旋转');
                                rotateImg(this, 'right', canvas);
                                break;
                            case 3: //需要180度旋转
                                // alert('需要180度旋转');
                                rotateImg(this, 'right', canvas); //转两次
                                rotateImg(this, 'right', canvas);
                                break;
                        }
                    }

                    base64 = canvas.toDataURL('image/jpeg', 0.8);
                }
                // else if (navigator.userAgent.match(/Android/i)) {// 修复android
                //     alert('Android1')
                //     try{
                //         let encoder = new JPEGEncoder();
                //         base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
                //     }catch(err){

                //     }

                //     alert('JPEGEncoder')
                // }
                else {
                    if (Orientation != '' && Orientation != 1) {
                        switch (Orientation) {
                            case 6: //需要顺时针（向左）90度旋转
                                // alert('需要顺时针（向左）90度旋转');
                                rotateImg(this, 'left', canvas);
                                break;
                            case 8: //需要逆时针（向右）90度旋转
                                // alert('需要顺时针（向右）90度旋转');
                                rotateImg(this, 'right', canvas);
                                break;
                            case 3: //需要180度旋转
                                // alert('需要180度旋转');
                                rotateImg(this, 'right', canvas); //转两次
                                rotateImg(this, 'right', canvas);
                                break;
                        }
                    }

                    base64 = canvas.toDataURL('image/jpeg', 0.8);
                }
                //uploadImage(base64);
                let fil = baseToBlob(base64, file.name);
                // let fil = blobToFile(blob,file.name);
                cb(fil);
            };
        };
        oReader.readAsDataURL(file);
    },
};

//base64转flie
function baseToBlob(dataurl, filename) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
//  blob转fill
function rotateImg(img, direction, canvas) {
    //最小与最大旋转方向，图片旋转4次后回到原方向
    let minStep = 0;
    let maxStep = 3;
    //let img = document.getElementById(pid);
    if (img == null) return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    let height = img.height;
    let width = img.width;
    //let step = img.getAttribute('step');
    let step = 2;
    if (step == null) {
        step = minStep;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > maxStep && (step = minStep);
    } else {
        step--;
        step < minStep && (step = maxStep);
    }

    //旋转角度以弧度值为参数
    let degree = (step * 90 * Math.PI) / 180;
    let ctx = canvas.getContext('2d');
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }
}

export default {
    ...ret,
};
