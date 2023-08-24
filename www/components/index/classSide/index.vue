<script lang="jsx">
import { mapActions } from 'vuex';
import QbOnline from '@/www/components/components/qb-online/index.vue';
import MeansSection from '@/www/components/index/means-section/index.vue';
export default {
    data() {
        return {
            projectList: [],
            currentIndex: 0,
        };
    },
    mounted() {
        this.getRecommendProjectList().then((list) => {
            this.projectList = list.slice(0, 7);
        });
    },
    methods: {
        ...mapActions('common/recommend-project', {
            getRecommendProjectList: 'getProjectList',
        }),
    },
    render() {
        return (
            <div class="side">
                <div class="title-wrap">
                    <div
                        class={['title', this.currentIndex === 0 ? 'this' : '']}
                        onClick={() => {
                            this.currentIndex = 0;
                        }}
                    >
                        在线题库
                    </div>
                    <div class="split"></div>
                    <div
                        class={['title', this.currentIndex === 1 ? 'this' : '']}
                        onClick={() => {
                            this.currentIndex = 1;
                        }}
                    >
                        干货资料
                    </div>

                    <nuxt-link to="/exam/index" target="_blank" class="more" style={{ display: this.currentIndex === 0 ? 'block' : 'none' }}>
                        更多
                    </nuxt-link>
                    <nuxt-link to="/ziliao" target="_blank" class="more" style={{ display: this.currentIndex === 1 ? 'block' : 'none' }}>
                        更多
                    </nuxt-link>
                </div>
                <div class="section-content">
                    {/* 背景图片 */}
                    <div class="article-bgc">
                        <img src={require('./asset/images/information-bgc.png')} />
                    </div>
                    <QbOnline list={this.projectList} style={this.currentIndex === 0 ? '' : 'display: none'} />
                    <MeansSection style={this.currentIndex === 1 ? '' : 'display: none'} />
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.more {
    position: absolute;
    background-image: url(./asset/images/more.png);
    background-repeat: no-repeat;
    background-size: 10px 11px;
    background-position: right 3px;
    padding-right: 16px;
    line-height: 1;
    font-size: 14px;
    color: #77798d;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);

    &:hover {
        color: #ff2e30;
    }
}
.side {
    width: 335px;
    height: 100%;

    .title-wrap {
        position: relative;
        width: 335px;
        height: 61px;
        padding-left: 20px;
        line-height: 61px;
        .title {
            display: inline-block;
            font-size: 22px;
            text-align: left;
            color: #99a1af;
            font-weight: 500;
            cursor: pointer;

            &.this {
                color: #3a3d4b;
            }
        }
        .split {
            display: inline-block;
            width: 1px;
            height: 16px;
            background: #d5d9d9;
            margin: 0 20px;
        }
    }

    .section-content {
        margin-top: 12px;
        border-radius: 8px;
        height: 575px;
        overflow: hidden;
        position: relative;
        background: linear-gradient(180deg, #fff5f2, #ffffff 16%);
        .article-bgc {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 120px;
            z-index: 1;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
