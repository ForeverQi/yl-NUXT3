function EventCall() {
    this.EventCallMap = {};
    this.hasCallMap = {};
}
EventCall.prototype.watch = function (k, callback) {
    this.EventCallMap[k] = this.EventCallMap[k] || [];
    this.EventCallMap[k].push(callback);
    if (this.hasCallMap[k]) callback();
};
EventCall.prototype.call = function (k) {
    this.hasCallMap[k] = true;
    this.EventCallMap[k] = this.EventCallMap[k] || [];
    for (var i = 0; i < this.EventCallMap[k].length; i++) {
        let callback = this.EventCallMap[k][i];
        callback();
    }
};
let EventUtil = {
    getEventCall() {
        return new EventCall();
    },
};
module.exports = EventUtil;
