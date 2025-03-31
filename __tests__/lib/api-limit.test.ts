import { increaseApiLimit, checkApiLimit, getApiLimitCount } from '@/lib/api-limit';
import prismadb from '@/lib/prismadb';
import { MAX_FREE_COUNTS } from '@/constants';
import { auth } from '@clerk/nextjs/server';

// Mock dependencies
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}));

jest.mock('@/lib/prismadb', () => ({
  userApiLimit: {
    findUnique: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
}));

describe('API Limit Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('increaseApiLimit', () => {
    it('should do nothing if no userId is found', async () => {
      (auth as jest.Mock).mockReturnValue({ userId: null });
      
      await increaseApiLimit();
      
      expect(prismadb.userApiLimit.findUnique).not.toHaveBeenCalled();
      expect(prismadb.userApiLimit.update).not.toHaveBeenCalled();
      expect(prismadb.userApiLimit.create).not.toHaveBeenCalled();
    });

    it('should update count if user exists', async () => {
      const mockUserId = 'user123';
      const mockUserApiLimit = { userId: mockUserId, count: 3 };
      
      (auth as jest.Mock).mockReturnValue({ userId: mockUserId });
      (prismadb.userApiLimit.findUnique as jest.Mock).mockResolvedValue(mockUserApiLimit);
      
      await increaseApiLimit();
      
      expect(prismadb.userApiLimit.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUserId }
      });
      expect(prismadb.userApiLimit.update).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        data: { count: mockUserApiLimit.count + 1 }
      });
      expect(prismadb.userApiLimit.create).not.toHaveBeenCalled();
    });

    it('should create new record if user does not exist', async () => {
      const mockUserId = 'user123';
      
      (auth as jest.Mock).mockReturnValue({ userId: mockUserId });
      (prismadb.userApiLimit.findUnique as jest.Mock).mockResolvedValue(null);
      
      await increaseApiLimit();
      
      expect(prismadb.userApiLimit.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUserId }
      });
      expect(prismadb.userApiLimit.update).not.toHaveBeenCalled();
      expect(prismadb.userApiLimit.create).toHaveBeenCalledWith({
        data: { userId: mockUserId, count: 1 }
      });
    });
  });

  describe('checkApiLimit', () => {
    it('should return false if no userId is found', async () => {
      (auth as jest.Mock).mockReturnValue({ userId: null });
      
      const result = await checkApiLimit();
      
      expect(result).toBe(false);
      expect(prismadb.userApiLimit.findUnique).not.toHaveBeenCalled();
    });

    it('should return true if user does not exist', async () => {
      const mockUserId = 'user123';
      
      (auth as jest.Mock).mockReturnValue({ userId: mockUserId });
      (prismadb.userApiLimit.findUnique as jest.Mock).mockResolvedValue(null);
      
      const result = await checkApiLimit();
      
      expect(result).toBe(true);
      expect(prismadb.userApiLimit.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUserId }
      });
    });

    it('should return true if user count is below MAX_FREE_COUNTS', async () => {
      const mockUserId = 'user123';
      const mockUserApiLimit = { userId: mockUserId, count: MAX_FREE_COUNTS - 1 };
      
      (auth as jest.Mock).mockReturnValue({ userId: mockUserId });
      (prismadb.userApiLimit.findUnique as jest.Mock).mockResolvedValue(mockUserApiLimit);
      
      const result = await checkApiLimit();
      
      expect(result).toBe(true);
      expect(prismadb.userApiLimit.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUserId }
      });
    });

    it('should return false if user count equals or exceeds MAX_FREE_COUNTS', async () => {
      const mockUserId = 'user123';
      const mockUserApiLimit = { userId: mockUserId, count: MAX_FREE_COUNTS };
      
      (auth as jest.Mock).mockReturnValue({ userId: mockUserId });
      (prismadb.userApiLimit.findUnique as jest.Mock).mockResolvedValue(mockUserApiLimit);
      
      const result = await checkApiLimit();
      
      expect(result).toBe(false);
      expect(prismadb.userApiLimit.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUserId }
      });
    });
  });

  describe('getApiLimitCount', () => {
    it('should return 0 if no userId is found', async () => {
      (auth as jest.Mock).mockReturnValue({ userId: null });
      
      const result = await getApiLimitCount();
      
      expect(result).toBe(0);
      expect(prismadb.userApiLimit.findUnique).not.toHaveBeenCalled();
    });

    it('should return 0 if user does not exist', async () => {
      const mockUserId = 'user123';
      
      (auth as jest.Mock).mockReturnValue({ userId: mockUserId });
      (prismadb.userApiLimit.findUnique as jest.Mock).mockResolvedValue(null);
      
      const result = await getApiLimitCount();
      
      expect(result).toBe(0);
      expect(prismadb.userApiLimit.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUserId }
      });
    });

    it('should return user count if user exists', async () => {
      const mockUserId = 'user123';
      const mockUserApiLimit = { userId: mockUserId, count: 3 };
      
      (auth as jest.Mock).mockReturnValue({ userId: mockUserId });
      (prismadb.userApiLimit.findUnique as jest.Mock).mockResolvedValue(mockUserApiLimit);
      
      const result = await getApiLimitCount();
      
      expect(result).toBe(3);
      expect(prismadb.userApiLimit.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUserId }
      });
    });
  });
});