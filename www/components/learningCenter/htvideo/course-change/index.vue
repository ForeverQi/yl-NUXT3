<script lang="jsx">
import { mapMutations, mapState } from 'vuex';
export default {
    computed: {
        ...mapState('course/division', {
            divisionType: 'type',
        }),
        ...mapState('course/info', {
            showHandoutMax: 'showHandoutMax',
        }),
    },
    methods: {
        ...mapMutations('course/division', {
            setType: 'setType',
        }),
        ...mapMutations('course/info', {
            doChangeVideo: 'doChangeVideo',
        }),
    },
    render() {
        return (
            <div
                class="change"
                onClick={() => {
                    this.doChangeVideo();
                    this.$nextTick(() => {
                        if (this.showHandoutMax === true) {
                            this.setType(3);
                        } else {
                            this.setType(2);
                        }
                    });
                }}
            >
                <img src={require('./asset/images/change.png')} class="img" />
                <div class="txt">{this.showHandoutMax === true ? '切换视频' : '切换讲义'}</div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.change {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    cursor: pointer;

    .img {
        width: 25px;
        height: 25px;
    }
    .txt {
        padding-top: 3px;
        width: 56px;
        height: 19px;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #ffffff;
        line-height: 19px;
    }
}
</style>
