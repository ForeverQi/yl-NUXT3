<template>
    <div class="image-text" :class="{ student: role === 'student' }">
        <div class="logo">
            <img src="../asset/images/teacher.png" v-if="role === 'teacher'" class="img" />
            <img src="../asset/images/zj.png" v-else-if="role === 'assistent'" class="img" />
            <img src="../asset/images/student.png" v-else-if="role === 'student'" class="img" />
        </div>
        <div class="content">
            <div class="name">
                {{ role === 'student' ? '' : itemData.roleName }}
            </div>
            <div class="wrap">
                {{ itemData.content }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        role: {
            type: String,
            default: 'teacher',
        },
        itemData: {
            type: Object,
            default() {
                return {
                    content: '',
                    roleName: '',
                };
            },
        },
    },
    data() {
        return {};
    },
};
</script>
<style lang="less" scoped>
.image-text {
    padding-top: 24px;
    display: flex;

    &.student {
        flex-direction: row-reverse;

        .logo {
            margin-right: 0;
            margin-left: 12px;
        }
        .content {
            .name {
                text-align: right;
                height: 1px;
            }

            .wrap {
                background: #cdd9ef;
                border: 1px solid rgba(0, 0, 0, 0.02);
                box-shadow: 0px 2px 4px 1px rgba(11, 42, 113, 0.05);
                &::before {
                    left: auto;
                    right: -5px;
                    background-color: #cdd9ef;
                }
            }
        }
    }

    .logo {
        width: 36px;
        height: 36px;
        margin-right: 12px;
        .img {
            width: 100%;
            height: 100%;
        }
    }

    .content {
        .name {
            font-size: 12px;
            color: #fff;
            text-align: left;
            line-height: 16px;
            margin-bottom: 5px;
            margin-top: 5px;
            padding-left: 3px;
        }
    }
    .wrap {
        position: relative;
        max-width: 580px;
        padding: 14px 20px;
        font-size: 14px;
        text-align: left;
        color: #3a3d4b;
        line-height: 22px;
        border-radius: 4px;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.02);
        word-break: break-all;
        box-shadow: 0px 2px 4px 1px rgba(11, 42, 113, 0.05);

        &::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #fff;
            position: absolute;
            top: 6px;
            left: -4px;
            transform: rotate(45deg);
        }
    }
}
</style>
