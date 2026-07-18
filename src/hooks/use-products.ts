import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/product.service';
import type { ProductFilters } from '@/types';
import { toast } from 'sonner';
const MOCK_PRODUCTS = [
  {
    _id: '1',
    name: 'Classic White T-Shirt',
    description: 'A premium cotton t-shirt for everyday wear. Lightweight, breathable, and designed for a perfect fit.',
    price: 35,
    is_offer_active: false,
    category: { _id: 'c1', name: 'T-Shirts' },
    images: [{ path: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop', public_id: '1' }],
    sizes: [{ size: 'S', stock: 10 }, { size: 'M', stock: 15 }, { size: 'L', stock: 20 }],
    total_stock: 45,
    is_available: true,
    created_by: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: 'Oversized Graphic Tee',
    description: 'Trending oversized t-shirt with a minimalist graphic design. Streetwear inspired.',
    price: 45,
    offer_price: 38,
    is_offer_active: true,
    category: { _id: 'c1', name: 'T-Shirts' },
    images: [{ path: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop', public_id: '2' }],
    sizes: [{ size: 'M', stock: 5 }, { size: 'L', stock: 10 }],
    total_stock: 15,
    is_available: true,
    created_by: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '3',
    name: 'Tailored Chino Pants',
    description: 'Versatile chino pants that can be dressed up or down. Made with a comfortable stretch cotton blend.',
    price: 85,
    is_offer_active: false,
    category: { _id: 'c2', name: 'Pants' },
    images: [{ path: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1994&auto=format&fit=crop', public_id: '3' }],
    sizes: [{ size: '32', stock: 10 }, { size: '34', stock: 15 }],
    total_stock: 25,
    is_available: true,
    created_by: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '4',
    name: 'Relaxed Fit Cargo Pant',
    description: 'Trending cargo pants with multiple utility pockets. Perfect for a casual, rugged look.',
    price: 95,
    is_offer_active: false,
    category: { _id: 'c2', name: 'Pants' },
    images: [{ path: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop', public_id: '4' }],
    sizes: [{ size: '32', stock: 5 }, { size: '34', stock: 5 }],
    total_stock: 10,
    is_available: true,
    created_by: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '5',
    name: 'Elegant Linen Kurta',
    description: 'A beautifully crafted linen kurta, perfect for festive occasions or smart casual gatherings.',
    price: 120,
    offer_price: 99,
    is_offer_active: true,
    category: { _id: 'c3', name: 'Kurtas' },
    images: [{ path: 'https://images.unsplash.com/photo-1597047084897-51e81819a499?q=80&w=2069&auto=format&fit=crop', public_id: '5' }],
    sizes: [{ size: 'M', stock: 8 }, { size: 'L', stock: 12 }],
    total_stock: 20,
    is_available: true,
    created_by: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '6',
    name: 'Minimalist Leather Sneakers',
    description: 'Trending minimalist white leather sneakers. The ultimate versatile shoe for any outfit.',
    price: 150,
    is_offer_active: false,
    category: { _id: 'c4', name: 'Shoes' },
    images: [{ path: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop', public_id: '6' }],
    sizes: [{ size: '9', stock: 20 }, { size: '10', stock: 15 }],
    total_stock: 35,
    is_available: true,
    created_by: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        items: MOCK_PRODUCTS,
        total: MOCK_PRODUCTS.length,
        page: 1,
        pages: 1
      };
    },
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const product = MOCK_PRODUCTS.find(p => p._id === productId);
      if (!product) throw new Error('Product not found');
      return product;
    },
    enabled: !!productId,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => productService.create(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => {
      toast.error(err.message);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      productService.update(id, formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', res.data?._id] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => {
      toast.error(err.message);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => productService.delete(productId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => {
      toast.error(err.message);
    },
  });
};
