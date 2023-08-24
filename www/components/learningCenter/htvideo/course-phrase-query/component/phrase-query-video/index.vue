<script lang="jsx">
import VideoView from '@/www/components/components/video-view/index.vue';
export default {
    name: 'CoursePlayView',
    props: {
        //视频id
        videoId: {
            type: String,
            default: '',
        },
        //token
        token: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            videoPromise: null,
            videoPromiseResolve: () => {},
        };
    },
    mounted() {
        this.videoPromise = new Promise((resolve) => {
            this.videoPromiseResolve = resolve;
        });
        // this.playCourse();
    },
    methods: {
        init() {},
        videoReady() {
            // 播放器组件初始化
            this.videoPromiseResolve();
        },
        playCourse() {
            this.videoPromise.then(() => {
                this.$refs.videoView.playVid({
                    vid: this.videoId,
                    playsafe: this.token,
                    fullscreenProxy: false,
                });
            });
        },
    },
    render() {
        return (
            <div class="course-play-view">
                <VideoView ref="videoView" onReady={this.videoReady}></VideoView>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.course-play-view {
    width: 100%;
    height: inherit;
}
</style>
