var sum_to_n_a = function (n) {
    var total = 0;
    for (var i = 1; i <= n; i++) {
        total = total + i;
    }
    return total;
};
var sum_to_n_b = function (n) {
    var total = 0;
    total = (n * (n + 1)) / 2;
    return total;
};
var sum_to_n_c = function (n) {
    if (n <= 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
};
console.log(sum_to_n_c(6));
