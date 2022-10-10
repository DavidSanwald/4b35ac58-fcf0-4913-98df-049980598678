function compose<T1, T2>(a: (t1: T1) => T2): (t1: T1) => T2;
function compose<T1, T2, T3>(
  a: (t1: T1) => T2,
  b: (t2: T2) => T3
): (t1: T1) => T3;
function compose<T1, T2, T3, T4>(
  a: (t1: T1) => T2,
  b: (t2: T2) => T3,
  c: (t2: T3) => T4
): (t1: T1) => T4;
function compose(...funcs: Array<(input: any) => any>) {
  return (input: any) => {
    return funcs.reduce((acc, fn) => fn(acc), input);
  };
}

export { compose };
