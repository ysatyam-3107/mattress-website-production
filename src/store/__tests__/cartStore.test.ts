import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore, useCartTotalPrice, useCartTotalItems } from '../cartStore';
import { Product } from '@/data/products';

const mockProduct: Product = {
  id: 'test-1',
  slug: 'test-mattress',
  name: 'Test Mattress',
  price: 15000,
  originalPrice: 20000,
  type: 'memory-foam',
  rating: 4.5,
  reviews: 100,
  image: 'test.jpg',
  sizes: ['Single', 'Double'],
  firmness: 'medium',
  features: [],
  description: 'Test description',
  thickness: '8 Inches',
  warranty: '10 Years',
  layers: 3,
  trialPeriod: '100 Nights'
};

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [],
      wishlist: [],
      isCartOpen: false,
    });
  });

  it('should start with an empty cart', () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.items.length).toBe(0);
  });

  it('should add an item to the cart', () => {
    useCartStore.getState().addToCart(mockProduct, 'Single');
    const state = useCartStore.getState();
    
    expect(state.items.length).toBe(1);
    expect(state.items[0].product.id).toBe('test-1');
    expect(state.items[0].quantity).toBe(1);
    expect(state.items[0].size).toBe('Single');
    expect(state.isCartOpen).toBe(true);
  });

  it('should increment quantity when adding the same item size', () => {
    useCartStore.getState().addToCart(mockProduct, 'Single');
    useCartStore.getState().addToCart(mockProduct, 'Single');
    
    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should create separate entries for different sizes of the same product', () => {
    useCartStore.getState().addToCart(mockProduct, 'Single');
    useCartStore.getState().addToCart(mockProduct, 'Double');
    
    const state = useCartStore.getState();
    expect(state.items.length).toBe(2);
  });

  it('should update item quantity', () => {
    useCartStore.getState().addToCart(mockProduct, 'Single');
    useCartStore.getState().updateQuantity('test-1', 'Single', 5);
    
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('should remove item when quantity is updated to less than 1', () => {
    useCartStore.getState().addToCart(mockProduct, 'Single');
    useCartStore.getState().updateQuantity('test-1', 'Single', 0);
    
    expect(useCartStore.getState().items.length).toBe(0);
  });

  it('should completely remove an item on removeFromCart', () => {
    useCartStore.getState().addToCart(mockProduct, 'Single');
    useCartStore.getState().addToCart(mockProduct, 'Double');
    useCartStore.getState().removeFromCart('test-1', 'Single');
    
    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].size).toBe('Double');
  });

  it('should clear all items', () => {
    useCartStore.getState().addToCart(mockProduct, 'Single');
    useCartStore.getState().clearCart();
    
    expect(useCartStore.getState().items.length).toBe(0);
  });

  it('should calculate total items correctly', () => {
    useCartStore.getState().addToCart(mockProduct, 'Single');
    useCartStore.getState().addToCart(mockProduct, 'Single');
    useCartStore.getState().addToCart(mockProduct, 'Double');

    // Total should be 3 items (2 single, 1 double)
    expect(useCartTotalItems()).toBe(3);
  });

  it('should calculate total price correctly', () => {
    useCartStore.getState().addToCart(mockProduct, 'Single');
    useCartStore.getState().addToCart(mockProduct, 'Double');

    // Each is 15000, 2 items = 30000
    expect(useCartTotalPrice()).toBe(30000);
  });
});
