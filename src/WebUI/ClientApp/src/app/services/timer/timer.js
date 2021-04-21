"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcTotalSeconds = exports.timeToHHMMSS = exports.Time = exports.defaultTime = void 0;
exports.defaultTime = "00:00:00";
var Time = /** @class */ (function () {
    function Time(timeString) {
        var timeArray = timeString.split(":");
        this.hours = parseInt(timeArray[0]),
            this.minutes = parseInt(timeArray[1]),
            this.seconds = parseInt(timeArray[2]);
    }
    return Time;
}());
exports.Time = Time;
function timeToHHMMSS(time) {
    var totalSeconds = calcTotalSeconds(time.hours, time.minutes, time.seconds);
    return toHHMMSS(totalSeconds);
}
exports.timeToHHMMSS = timeToHHMMSS;
function calcTotalSeconds(hours, minutes, seconds) {
    var o_totalSeconds = 0;
    o_totalSeconds += hours * 3600;
    o_totalSeconds += minutes * 60;
    o_totalSeconds += seconds;
    return o_totalSeconds;
}
exports.calcTotalSeconds = calcTotalSeconds;
function toHHMMSS(secs) {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;
    return [hours, minutes, seconds]
        .map(function (v) { return v < 10 ? "0" + v : v; })
        .join(":");
}
//# sourceMappingURL=timer.js.map