/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { useReadContract } from 'wagmi';
import OnchainProviders from '@/OnchainProviders';

import useOnchainCoffeeMemos from '../useOnchainCoffeeMemos';
import type { CoffeeMemo } from '../../_components/types';

jest.mock('wagmi', () => ({
  ...jest.requireActual<typeof import('wagmi')>('wagmi'),
  useReadContract: jest.fn(),
}));

describe('useOnchainCoffeeMemos', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return memos', () => {
    const memos: CoffeeMemo[] = [
      {
        message: 'message',
        numCoffees: BigInt(2),
        time: BigInt(1),
        userAddress: '0x1',
        userName: 'userName',
      },
    ];
    (useReadContract as jest.Mock).mockImplementation(() => ({
      status: 'success',
      data: memos,
    }));

    const { result } = renderHook(() => useOnchainCoffeeMemos(), { wrapper: OnchainProviders });

    expect(result.current.memos).toStrictEqual(memos);
  });

  it('if contract read fails, should return empty array', () => {
    const memos: CoffeeMemo[] = [
      {
        message: 'message',
        numCoffees: BigInt(2),
        time: BigInt(1),
        userAddress: '0x1',
        userName: 'userName',
      },
    ];
    (useReadContract as jest.Mock).mockImplementation(() => ({
      status: 'error',
      data: memos,
    }));

    const { result } = renderHook(() => useOnchainCoffeeMemos(), { wrapper: OnchainProviders });

    expect(result.current.memos).toStrictEqual([]);
  });
});
