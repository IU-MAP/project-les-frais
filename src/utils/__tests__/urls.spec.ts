import { getParams } from '../urls';

describe('getParams', () => {
  it('returns correct params', () => {
    expect(getParams({ key: 'value' })).toEqual('key=value&');
  });
});
