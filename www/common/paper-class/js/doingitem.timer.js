let timerRefreshTimePast;
module.exports = {
    //计时开始
    timerstart() {
        var vm = this;
        if (timerRefreshTimePast) return;
        vm.paper.time.duration = Number(vm.paper.time.duration) || 0;
        var t = 1;
        //刷新答题时间
        var fnRefreshTimePast = function () {
            vm.paper.time.duration += t;
            vm.getdurationTimeAll();
            timerRefreshTimePast = setTimeout(fnRefreshTimePast, t * 1000);
        };
        fnRefreshTimePast();
    },

    //计时暂停
    timerpause() {
        if (timerRefreshTimePast) {
            clearTimeout(timerRefreshTimePast);
            timerRefreshTimePast = null;
        }
    },
    wartAndTimepause(vm = this) {
        vm.timerpause();
        vm.show.mk_contibox = true;
    },
    goonTimeStart(vm = this) {
        vm.timerstart();
        vm.show.mk_contibox = false;
    },
    getdurationTime(vm = this) {
        vm.durationTime = vm.$DateUtil.getTimeString(vm.paper.time.duration);
    },
    getdurationTimeAll(vm = this) {
        vm.getdurationTime();
        let remainingsecond = (vm.paper.time.all || 0) * 60 - vm.paper.time.duration;
        vm.remainingTime = vm.$DateUtil.getTimeString(remainingsecond);
    },
    //获取经过时间
    getDurationSecond() {
        return this.pagerDetail.answersheetDurationtime || 0;
    },
};
