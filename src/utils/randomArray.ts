const randomArray = <I>(array: I[]) => {
  let randomLength = Math.floor(Math.random() * array.length);
  let res = Array(randomLength)
    .fill(array[0])
    .map(() => {
      return array[Math.floor(Math.random() * array.length)];
    });
  const resSet = new Set(res);
  return [...resSet.values()];
};

export { randomArray };
