function computed(AllList) {
  const PositiveList = AllList.filter((item) => item >= 0);
  const NegativeList = AllList.filter((item) => item <= 0);
  const AllPositive = AllList.every((item) => item >= 0);
  const AllNegative = AllList.every((item) => item <= 0);
  if (AllNegative) {
    return Math.min(...AllList);
  } else if (AllPositive) {
    return Math.max(...AllList);
  } else {
    const maxPositive = Math.max(...PositiveList);
    const minNegative = Math.min(...NegativeList);
    return maxPositive + minNegative;
  }
}

console.log(computed([100, 10, -20]));
