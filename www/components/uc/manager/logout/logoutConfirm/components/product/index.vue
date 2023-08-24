<template>
    <div class="product-wrap">
        <div class="divider">
            <p class="title">优路通用账号包含但不限于以下产品</p>
            <i class="line"></i>
        </div>
        <ul class="product">
            <li>
                <img src="./asset/images/yl-jiaoyu.png" alt="" />
                <p>优路教育</p>
            </li>
            <li>
                <img src="./asset/images/yl-jiangong.png" alt="" />
                <p>优路建工</p>
            </li>
            <li>
                <img src="./asset/images/yl-xiaoan.png" alt="" />
                <p>优路消安</p>
            </li>
            <li>
                <img src="./asset/images/yl-jiaozi.png" alt="" />
                <p>优路教师</p>
            </li>
            <li>
                <img src="./asset/images/yl-fakao.png" alt="" />
                <p>优路法考</p>
            </li>
            <li>
                <img src="./asset/images/yl-yiwei.png" alt="" />
                <p>优路医考</p>
            </li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
.product-wrap {
    margin-top: 20px;
    .divider {
        width: 305px;
        height: 16px;
        margin: 0 auto;
        position: relative;
        .title {
            width: 192px;
            color: #99a1af;
            font-size: 12px;
            padding: 0 16px;
            margin: 0 auto;
            background: #fff;
            position: absolute;
            top: 0px;
            left: 50%;
            margin-left: -112px;
            z-index: 1;
        }
        .line {
            width: 100%;
            height: 1px;
            background: #eee;
            display: block;
            position: absolute;
            top: 9px;
            z-index: 0;
        }
    }
    .product {
        overflow: hidden;
        width: 432px;
        margin: 8px auto 0;
        li {
            float: left;
            margin: 0 12px;
            img {
                width: 48px;
                height: 48px;
            }
            p {
                font-size: 12px;
                color: #99a1af;
                margin-top: 4px;
            }
        }
    }
}
</style>
