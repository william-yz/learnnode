
function ff (n) {
  if (n == 1) return 1;
  if (n == 2) return 1;
  return ff(n-1) + ff(n-2);
}
function f(n, ret) {
  if (n == 1) ret(1);
  if (n == 2) ret(1);
  if (n > 2) ret(function() {
    f(n-1,ret) + f(n-2, ret);
  });
}

console.log(ff(6));
f(6, function(n) {
  console.log(n);
})