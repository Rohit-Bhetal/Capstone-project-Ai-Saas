import { checkSubscription } from '@/lib/subscription';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';

// Mock dependencies
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}));

jest.mock('@/lib/prismadb', () => ({
  userSubscription: {
    findUnique: jest.fn(),
  },
}));

describe('Subscription Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkSubscription', () => {
    it('should return false if no userId is found', async () => {
      (auth as jest.Mock).mockReturnValue({ userId: null });
      
      const result = await checkSubscription();
      
      expect(result).toBe(false);
      expect(prismadb.userSubscription.findUnique).not.toHaveBeenCalled();
    });

    it('should return false if user subscription does not exist', async () => {
      const mockUserId = 'user123';
      
      (auth as jest.Mock).mockReturnValue({ userId: mockUserId });
      (prismadb.userSubscription.findUnique as jest.Mock).mockResolvedValue(null);
      
      const result = await checkSubscription();
      
      expect(result).toBe(false);
      expect(prismadb.userSubscription.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        select: {
          stripeSubscriptionId: true,
          stripeCurrentPeriodEnd: true,
          stripeCustomerId: true,
          stripePriceId: true
        }
      });
    });

    it('should return false if subscription is not valid (no price ID)', async () => {
      const mockUserId = 'user123';
      const mockSubscription = {
        stripeSubscriptionId: 'sub_123',
        stripeCurrentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days in the future
        stripeCustomerId: 'cus_123',
        stripePriceId: null
      };
      
      (auth as jest.Mock).mockReturnValue({ userId: mockUserId });
      (prismadb.userSubscription.findUnique as jest.Mock).mockResolvedValue(mockSubscription);
      
      const result = await checkSubscription();
      
      expect(result).toBe(false);
    });

    it('should return false if subscription period has ended', async () => {
      const mockUserId = 'user123';
      const mockSubscription = {
        stripeSubscriptionId: 'sub_123',
        stripeCurrentPeriodEnd: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day in the past
        stripeCustomerId: 'cus_123',
        stripePriceId: 'price_123'
      };
      
      (auth as jest.Mock).mockReturnValue({ userId: mockUserId });
      (prismadb.userSubscription.findUnique as jest.Mock).mockResolvedValue(mockSubscription);
      
      const result = await checkSubscription();
      
      expect(result).toBe(false);
    });

    it('should return true if subscription is valid', async () => {
      const mockUserId = 'user123';
      const mockSubscription = {
        stripeSubscriptionId: 'sub_123',
        stripeCurrentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days in the future
        stripeCustomerId: 'cus_123',
        stripePriceId: 'price_123'
      };
      
      (auth as jest.Mock).mockReturnValue({ userId: mockUserId });
      (prismadb.userSubscription.findUnique as jest.Mock).mockResolvedValue(mockSubscription);
      
      const result = await checkSubscription();
      
      expect(result).toBe(true);
    });
  });
});