export const cast = {
  memoizeKeyVal: (val: string, memo: Record<string, string | undefined>) => {
    const isValMatchTemplate = val.includes('=');

    if (isValMatchTemplate) {
      const [key, value] = val.split('=');
      memo[key] = value;
    } else {
      memo[val] = undefined;
    }

    return memo;
  },
};
