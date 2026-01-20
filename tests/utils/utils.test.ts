import { cast } from 'src/utils';

describe('Util test', () => {
  it('[memoizeKeyVal] can memoize keyval if keyval is valid', () => {
    const result = cast.memoizeKeyVal('endpoint=http://localhost:3000', {});

    expect(result).toHaveProperty('endpoint', 'http://localhost:3000');
  });

  it('[memoizeKeyVal] can memoize keyval if keyval is not valid', () => {
    const result = cast.memoizeKeyVal('endpoint', {});

    expect(result).toHaveProperty('endpoint', undefined);
  })
});
