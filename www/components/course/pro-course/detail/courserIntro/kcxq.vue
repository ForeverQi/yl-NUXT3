<template>
    <!-- 课程介绍 -->
    <div class="kcxqInfo" v-if="propsData != undefined">
        <!-- 课程详情 -->
        <div class="kcxq">
            <div class="kcxqTop">
                <span>{{ propsData.title }}</span>
            </div>
            <div class="videoPlay">
                <vb-video ref="vbVideo" @ready="videoReady"></vb-video>
            </div>
        </div>
        <!-- 重新定义 -->
        <!-- <div class="cxdy">
			<div class="cxdyTop">
				<span><span>重新定义</span>2020二建金卡班</span>
			</div>
			<div class="cxdyImg">
				<img style="width:100%;height:100%" src="./asset/images/cxdyImg.png" />
			</div>
		</div> -->
        <!-- {{propsData}} -->
    </div>
</template>
<script>
import vbVideo from '../vbVideo.vue';

export default {
    name: 'kcxq',
    components: { vbVideo },
    propsData: {
        type: Object,
        default: () => {},
    },
    data() {
        return {
            // vid:'02bfeb00e27ff92a76364b16af2f115e_0',
            vid: '',
            PlayReturn: '',
            k: [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                'a',
                'b',
                'c',
                'd',
                'e',
                'f',
                'g',
                'h',
                'i',
                'j',
                'k',
                'l',
                'm',
                'n',
                'o',
                'p',
                'q',
                'r',
                's',
                't',
                'u',
                'v',
                'w',
                'x',
                'y',
                'z',
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
                'G',
                'H',
                'I',
                'J',
                'K',
                'L',
                'M',
                'N',
                'O',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'U',
                'V',
                'W',
                'X',
                'Y',
                'Z',
            ],
        };
    },
    watch: {
        propsData(val) {
            let vm = this;
            vm.propsData = val;
            vm.vid = vm.propsData.src;
            // vm.changeVid();
        },
    },
    mounted() {},
    methods: {
        videoReady() {
            let vm = this;
            if (vm.propsData) {
                vm.vid = vm.propsData.src;
                vm.changeVid();
            }
        },
        toLong(values) {
            let k = this.k;
            values = /(.{6})(.*)/.exec(values);
            var values1 = [...values[1]].join('');
            var values2 = [...values[2]].join('');

            function long(value = '') {
                var result = 0;
                value = value.split('').reverse();
                value.forEach((item, index, arr) => {
                    result += Math.pow(k.length, index) * k.indexOf(item);
                });
                return `${result}`.padStart(10, '0');
            }
            return long(values1) + long(values2);
        },
        //视频播放及事件
        play() {
            let vm = this;
            let vidObj = {};
            vidObj.videoId = vm.vid;
            vidObj.type = 'I';
            vidObj.bizId = 'CLASSTYPE' + vm.toLong(vm.$route.params.classtypeId);
            // if(!vm.$refs.vbVideo.playVid(vidObj).isPlaying()){
            // setTimeout(function(){
            vm.PlayReturn = vm.$refs.vbVideo.playVid(vidObj).start(function () {
                // 暂停视频，不让自动播放
                vm.PlayReturn.pauseVideo();
            });

            // },500)
            // }
        },
        //改变视频id
        changeVid() {
            // this.vid = "02bfeb00e27ff92a76364b16af2f115e_0";
            this.play();
        },
    },
};
</script>
<style lang="less" scoped>
.kcxqInfo {
    padding: 30px 0 30px 30px;
    margin: 20px 30px 0 0;
    border-radius: 2px;
    background-color: #fff;
    .kcxq {
        text-align: center;
        .kcxqTop {
            color: #626feb;
            font-size: 54px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            text-align: center;
            line-height: 105px;
            display: inline-block;
            height: 100px;
            width: 775px;
            background: url('./asset/images/header_decorate1.png') no-repeat;
            background-size: 100% 100%;
            span:nth-child(1) {
                display: block;
                font-weight: bold;
            }
        }
        .videoPlay {
            width: 980px;
            height: 552px;
            background: #000c17;
            margin-top: 40px;
            overflow: hidden;
        }
    }

    .cxdy {
        margin-top: 50px;
        text-align: center;
        .cxdyTop {
            color: #616feb;
            font-size: 54px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            text-align: center;
            line-height: 130px;
            display: inline-block;
            height: 100px;
            width: 775px;
            background: url('./asset/images/header_decorate1.png') no-repeat;
            background-size: 100% 100%;
            span {
                font-weight: bold;
                span {
                    color: #333333;
                    font-weight: bold;
                }
            }
        }
        .cxdyImg {
            height: 328px;
            width: 1036px;
            // background-size: 100% 100%;
            position: relative;
            left: -28px;
        }
    }
}
</style>
