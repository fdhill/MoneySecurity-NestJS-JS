import { ok } from './response';

describe('response helper', () => {
  it('bungkus data dengan kontrak { success, message, data }', () => {
    expect(ok('halo', { a: 1 })).toEqual({
      success: true,
      message: 'halo',
      data: { a: 1 },
    });
  });

  it('data default null', () => {
    expect(ok('halo')).toEqual({ success: true, message: 'halo', data: null });
  });
});
