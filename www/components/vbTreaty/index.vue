<!--
 * @Author: Li
 * @Date: 2021-09-14 18:07:14
 * @LastEditors: Li
 * @LastEditTime: 2021-09-14 18:07:54
 * @Description: 
-->
<template>
    <div v-html="html" class="vbtreaty"></div>
</template>

<script>
export default {
    name: 'vbTreaty',
    props: {
        html: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="less">
.vbtreaty {
    font-size: 0.875rem;
    font-family: MicrosoftYaHei;
    padding: 10px 25px 10px 30px;
    /*padding: 0.625rem 3%;*/
    /*background: #fff;*/
    overflow: auto;
    letter-spacing: 0.5px;
    p:first-child {
        font-weight: bold;
    }
    strong {
        color: #333;
        font-weight: bold;
    }
    b {
        color: #333;
        font-weight: 400;
    }
    strong p,
    b p:first-child {
        color: #333;
        // font-weight: bold;
        font-weight: 400;
    }
    p b {
        font-weight: bold;
    }
    & p {
        line-height: 30px;
        font-size: 16px;
        color: #333;
        padding: 5px 0;
        &.center {
            color: #333333;
            font-size: 24px;
            text-align: center;
        }
    }
    & ol {
        font-size: 0.875rem;
        color: #333;
        list-style-type: decimal;
        padding: 0 15px;
        & > ol {
            padding: 0 20px;
            margin: 0 20px;
        }
        li {
            line-height: 1.5625rem;
            list-style: decimal;
            display: list-item;
            text-align: -webkit-match-parent;
        }
    }
}
</style>
