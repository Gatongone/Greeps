export const coroutine = {};
coroutine.enumerators = [];
coroutine.count = 0;
coroutine.register = function (enumerator, verify) {

    this.enumerators.push([enumerator, verify]);
    this.count++;
};
coroutine.reason = function () {
    for (var i = this.enumerators.length - 1; i >= 0; i--) {
        var success = this.enumerators[i][1]();
        if (success) {
            this.enumerators[i][0]();
            this.enumerators.splice(i, 1);
        }
    }
}