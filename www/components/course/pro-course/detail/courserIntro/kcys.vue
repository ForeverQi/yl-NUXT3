<template>
    <!-- 课程优势 -->
    <div class="kcysInfo" v-if="propsData != undefined">
        <!-- 2领跑优势 -->
        <div class="lpys">
            <div class="lpysTop">
                <span class="topNumber">
                    {{ propsData.num }}
                    <i></i>
                </span>
                <span class="topText">{{ propsData.title }}</span>
            </div>
            <div class="lpysCon">
                <div class="conTop">
                    <p>{{ propsData.subtitle }}</p>
                </div>
            </div>
            <div class="conImage">
                <ul>
                    <li v-for="(item, i) in propsData.dataList" :key="item.a">
                        <div class="lpys_top">
                            <span class="liNum">{{ i + 1 }}</span>
                            <div class="lpys_topText">
                                <p>{{ item.title }}</p>
                                <!-- <p>让备考张弛有度</p> -->
                            </div>
                        </div>
                        <div class="lpys_body">
                            <span>{{ item.introduce }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- {{propsData}} -->
    </div>
</template>
<script>
export default {
    name: 'kcys',
    components: {},
    filters: {
        filterN(val) {
            let value = val.replace(/↵/g, '<br/>');
            return value;
        },
    },
    propsData: {
        type: Object,
        default: () => {},
    },
    data() {
        return {};
    },
    watch: {
        propsData(val) {
            let vm = this;
            vm.propsData = val;
        },
    },
    methods: {},
};
</script>
<style lang="less" scoped>
.kcysInfo {
    padding: 30px 0 30px 30px;
    margin: 20px 30px 0 0;
    border-radius: 2px;
    background-color: #fff;
    // .bkls{
    // 	text-align: center;
    // 	.bklsTop{
    // 		color:#333333;
    // 		font-size:40px;
    // 		font-family:Source Han Sans CN;
    // 		font-weight: 500;
    // 		text-align: center;
    // 		line-height: 92px;
    // 		display: inline-block;
    // 		.topNumber{
    // 			color:#FBF1F2;
    // 			width:36px;
    // 			height:36px;
    // 			line-height: 36px;
    // 			display: inline-block;
    // 			background:linear-gradient(0deg,rgba(177,195,255,1) 0%,rgba(97,111,235,1) 100%);
    // 			position: relative;
    // 			margin-right: 20px;
    // 			i{
    // 				display: inline-block;
    // 				width:20px;
    // 				height:20px;
    // 				background:linear-gradient(0deg,rgba(177,195,255,1) 0%,rgba(97,111,235,1) 100%);
    // 				opacity:0.2;
    // 				position: absolute;
    // 				bottom: -10px;
    // 				right:-10px;
    // 			}
    // 		}
    // 		.topText{
    // 			  span{
    // 				  font-weight: 700;
    // 				  color:#626FEB;
    // 			  }
    // 		}
    // 	}
    // 	.bklsContent{
    // 		margin-top:20px;
    // 		position: relative;
    // 		width:1040px;
    // 		height:640px;
    // 		.con_left{
    // 			float: left;
    // 			div{
    // 				width:702px;
    // 				height: 149px;
    // 				// line-height:149px;
    // 				.leftText{
    // 					font-size:26px;
    // 					font-family:Source Han Sans CN;
    // 					font-weight:bold;
    // 					color:#fff;
    // 					float: left;
    // 					width: 180px;
    // 					line-height: 109px;
    // 					letter-spacing: 4px;
    // 					height: 109px;
    // 					margin-top: 40px;
    // 					box-sizing: border-box;
    // 					padding: 0 40px 0 20px;
    // 					display:inline-block;
    // 					span{
    // 						font-weight:bold;
    // 						line-height: 30px;
    // 					}
    // 				}
    // 				.twospan{
    // 					line-height: 32px;
    // 					padding-top:20px;
    // 					text-align: left;
    // 				}
    // 				.rightText{
    // 					font-size:18px;
    // 					font-family:Source Han Sans CN;
    // 					font-weight:400;
    // 					color:#282828;
    // 					float: left;
    // 					margin-left:40px;
    // 					width:385px;
    // 					height: 110px;
    // 					text-align: left;
    // 					margin-top: 20px;
    // 					line-height: 110px;
    // 					border: 1px solid transparent;
    // 					span{
    // 						display: inline-block;
    // 						line-height: 30px;
    // 						margin-top: 25px;
    // 					}
    // 				}
    // 			}
    // 			.kcys_huang{
    // 				background: url('./asset/images/kcys_huang.png') no-repeat;
    // 				background-size: 100% 100%;
    // 			}
    // 			.kcys_lan{
    // 				background: url('./asset/images/kcys_lan.png') no-repeat;
    // 				background-size: 100% 100%;
    // 			}
    // 		}
    // 		.con_right{
    // 			float: right;
    // 			width: 310px;
    // 			height:546px;
    // 			background: url('./asset/images/kcys_right.png') no-repeat;
    // 			background-size: 100% 100%;
    // 			position: absolute;
    // 			bottom:0;
    // 			right:-20px;
    // 			div{
    // 				width:198px;
    // 				text-align: left;
    // 				position: absolute;
    // 				bottom: 74px;
    // 				right: 30px;
    // 				box-sizing: border-box;
    // 				padding: 0px 18px;
    // 				p{
    // 					font-size:18px;
    // 					font-family:Source Han Sans CN;
    // 					font-style:italic;
    // 					color:#333;
    // 					line-height:30px;
    // 					letter-spacing: 1px;
    // 				}
    // 			}
    // 		}
    // 	}
    // }
    .lpys {
        margin-top: 20px;
        text-align: center;
        .lpysTop {
            color: #333333;
            font-size: 40px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            text-align: left;
            line-height: 57px;
            display: block;
            margin-left: 135px;
            .topNumber {
                color: #fbf1f2;
                width: 36px;
                height: 36px;
                line-height: 36px;
                display: inline-block;
                background: linear-gradient(0deg, rgba(177, 195, 255, 1) 0%, rgba(97, 111, 235, 1) 100%);
                position: relative;
                margin-right: 20px;
                i {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: linear-gradient(0deg, rgba(177, 195, 255, 1) 0%, rgba(97, 111, 235, 1) 100%);
                    opacity: 0.2;
                    position: absolute;
                    bottom: -10px;
                    right: -10px;
                }
            }
            .topText {
                span {
                    font-weight: 700;
                    color: #626feb;
                }
            }
            .topText2 {
                display: block;
                margin-left: 210px;
            }
        }
        .lpysCon {
            width: 1000px;
            height: 188px;
            background: url('./asset/images/kcys_yp.png') no-repeat;
            background-size: 100% 100%;
            text-align: left;
            position: relative;
            margin-top: 17px;
            .conTop {
                width: 860px;
                height: 106px;
                position: absolute;
                top: 60px;
                left: 120px;
                display: flex;
                justify-content: center;
                align-items: center;
                p {
                    width: 715px;
                    font-size: 22px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    font-style: italic;
                    color: #626feb;
                    line-height: 32px;
                }
            }
        }
        .conImage {
            // width: 1036px;
            // height: 637px;
            // background: url('./asset/images/kcys_lpbgc.png') no-repeat;
            // background-size: 100% 100%;
            // position: relative;
            // left: -25px;
            padding-right: 30px;
            ul {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                li {
                    width: 326px;
                    height: 320px;
                    background: url('./asset/images/kcys_lpys.png') no-repeat;
                    box-sizing: border-box;
                    padding: 20px;
                    .lpys_top {
                        height: 80px;
                        .liNum {
                            text-align: left;
                            display: block;
                            float: left;
                            width: 50px;
                            font-size: 40px;
                            font-family: Source Han Sans CN;
                            font-weight: 500;
                            font-style: italic;
                            color: #edb14e;
                            line-height: 90px;
                            margin-left: 15px;
                        }
                        .lpys_topText {
                            float: left;
                            padding: 8px 0 0 0px;
                            line-height: 30px;
                            margin-left: 20px;
                            white-space: pre-wrap;

                            p {
                                font-size: 20px;
                                font-family: Source Han Sans CN;
                                font-weight: bold;
                                color: rgba(255, 255, 255, 1);
                                line-height: 30px;
                                text-shadow: 0px 0px 10px rgba(53, 192, 67, 0.35);
                                width: 160px;
                                text-indent: -1em;
                                margin-left: 1em;
                            }
                            p:nth-child(2) {
                                margin-left: 65px;
                            }
                        }
                    }
                    .lpys_body {
                        white-space: pre-wrap;
                        text-align: left;
                        padding: 40px 30px 0 20px;
                        span {
                            font-size: 16px;
                            font-family: Source Han Sans CN;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                            line-height: 28px;
                        }
                    }
                }
            }
        }
    }
}
</style>
