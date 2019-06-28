const cast = {
  memoizeKeyVal: (val, memo) => {
    const isValMatchTemplate = val.includes('=');

    if (isValMatchTemplate) {
      const [key, value] = val.split('=');
      memo[key] = value;
    } else {
      memo[val] = undefined;
    }

    return memo;
  },
}

module.exports = {
  cast,
}