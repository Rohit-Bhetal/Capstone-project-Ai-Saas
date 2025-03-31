import { PrismaClient } from '@prisma/client';

// Mock PrismaClient
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        // Mock any Prisma methods you need to test
      };
    }),
  };
});

describe('PrismaDB', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the module registry before each test
    jest.resetModules();
    // Clear the global prisma instance
    if (global.prisma) {
      global.prisma = undefined;
    }
  });

  it('should create a new PrismaClient instance when none exists', () => {
    // Import the module after resetting
    const prismadb = require('@/lib/prismadb').default;
    
    expect(PrismaClient).toHaveBeenCalledTimes(1);
    expect(prismadb).toBeDefined();
  });

  it('should reuse the existing PrismaClient instance when one exists', () => {
    // First import to create the instance
    const prismadb1 = require('@/lib/prismadb').default;
    
    // Reset the mock to check if it's called again
    (PrismaClient as jest.Mock).mockClear();
    
    // Second import should reuse the instance
    const prismadb2 = require('@/lib/prismadb').default;
    
    expect(PrismaClient).not.toHaveBeenCalled();
    expect(prismadb1).toBe(prismadb2);
  });

  it('should set globalThis.prisma in non-production environment', () => {
    // Save original NODE_ENV
    const originalNodeEnv = process.env.NODE_ENV;
    
    // Set to development
    
    
    // Import the module
    const prismadb = require('@/lib/prismadb').default;
    
    expect(global.prisma).toBeDefined();
    expect(global.prisma).toBe(prismadb);
    
    // Restore original NODE_ENV
    
  });

  it('should not set globalThis.prisma in production environment', () => {
    // Save original NODE_ENV
    const originalNodeEnv = process.env.NODE_ENV;
    
    // Set to production
    
    
    // Clear the global prisma instance
    global.prisma = undefined;
    
    // Import the module
    require('@/lib/prismadb').default;
    
    expect(global.prisma).toBeUndefined();
    
    
  });
});