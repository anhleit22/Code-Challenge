var sum_to_n_a = function (n: number): number {
  var total = 0;
  for (let i = 1; i <= n; i++) {
    total = total + i;
  }
  return total;
};
//should be used because the algorithm difficulty gives shorter time
var sum_to_n_b = function (n: number): number {
  var total = 0;
  total = (n * (n + 1)) / 2;
  return total;
};

var sum_to_n_c = function (n: number): number {
  if (n <= 0) {
    return 0;
  }
  return n + sum_to_n_c(n - 1);
};
