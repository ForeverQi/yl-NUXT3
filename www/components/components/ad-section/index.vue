<script lang="jsx">
import '@/api/mcu/api.mcu-07.home-ad-pic.js';
export default {
    name: 'AdSection',
    props: {
        adCode: {
            // 广告码
            type: String,
            default: '',
        },
        projectId: {
            // 项目码
            type: String,
            default: '',
        },
        emptyImg: {
            // 空图片占位符地址
            type: String,
            default: '',
        },
        emptyHide: {
            // 广告为空的时候是否显示
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            retItem: {},
            isLoading: false,
        };
    },
    computed: {
        adItemInfo() {
            const key = this.projectId + this.adCode;
            console.log(key, '@@@@');
            if (this.retItem[key]) {
                // this.$el.parentNode.style.display = '';
                this.adItem();
                return this.retItem[key];
            }
            return {
                adPicture: '',
            };
        },
    },
    watch: {
        projectId(val, oldVal) {
            if (val !== oldVal) {
                this.init();
            }
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (!this.adCode) {
                // adCode 不存在，显示默认图
                return;
            }
            this.getData();
        },
        adItem() {
            const key = this.projectId + this.adCode;
            if (this.retItem[key]) {
                this.$el.parentNode.style.display = '';
                return this.retItem[key];
            }
            return {
                adPicture: '',
            };
        },
        getData() {
            let data = {
                url: 'home/home-ad-pic',
                params: {
                    lytCode: this.adCode,
                    projectId: this.projectId,
                },
                isCustom: false,
            };
            this.isLoading = false;
            const projectId = this.projectId;
            this.httpClient(data)
                .then((res) => {
                    this.isLoading = true;
                    if (Array.isArray(res) && res.length > 0) {
                        this.$set(this.retItem, `${projectId}${this.adCode}`, res[0]);
                        this.$el.parentNode.style.display = '';
                    } else if (this.emptyHide === true && this.$el.parentNode) {
                        this.$el.parentNode.style.display = 'none';
                        this.$set(this.retItem, `${projectId}${this.adCode}`, null);
                    }
                })
                .catch((err) => {
                    this.isLoading = true;
                    if (this.emptyHide === true && this.$el.parentNode) {
                        this.$el.parentNode.style.display = 'none';
                    }
                    console.log(err, 'newWeb');
                });
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
    },
    render() {
        return (
            this.isLoading && (
                <div class="img-wrap">
                    {this.adItemInfo.adPicture && (
                        <a
                            href={this.adItemInfo.adLinkType === 3 ? 'javascript: void(0);' : this.adItem().adLink}
                            target={this.adItemInfo.adLinkType === 3 ? '_self' : '_blank'}
                            onclick={() => {
                                this.$emit('item-click', this.adItemInfo);
                            }}
                        >
                            <img class="img" src={this.$urlUtils.getViewUrl(this.adItemInfo.adPicture)} />
                        </a>
                    )}
                    {!this.adItemInfo.adPicture && (
                        <div class="no-pic">
                            <img class="img" src={this.emptyImg ? this.emptyImg : require('./asset/images/empty.jpg')} />
                        </div>
                    )}
                </div>
            )
        );
    },
};
</script>
<style lang="less" scoped>
.img-wrap {
    height: 100%;
    background-color: transparent;

    .img {
        width: 100%;
        height: 100%;
    }
    .no-pic {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ededee;

        .img {
            max-width: 100%;
            height: auto;
        }
    }
}
</style>
