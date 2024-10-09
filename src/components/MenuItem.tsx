"use client";
import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'cafe' | 'cake' | 'combo';
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg bg-white p-2">
      <div className="flex justify-center">
        <img className="h-32 object-cover" src={product.image} alt={product.name} />
      </div>
      <div className="py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-900 font-bold text-xl">{`$${product.price.toFixed(2)}`}</span>
        </div>
      </div>
    </div>
  );
};

const ProductList: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is a description for Product 1.',
      price: 29.99,
      image: 'https://via.placeholder.com/150',
      category: 'cafe',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is a description for Product 2.',
      price: 39.99,
      image: 'https://via.placeholder.com/150',
      category: 'cake',

    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is a description for Product 3.',
      price: 19.99,
      image: 'https://via.placeholder.com/150',
      category: 'combo',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'This is a description for Product 4.',
      price: 49.99,
      image: 'https://via.placeholder.com/150',
      category: 'combo',
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'This is a description for Product 5.',
      price: 24.99,
      image: 'https://via.placeholder.com/150',
      category: 'cake',
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'This is a description for Product 6.',
      price: 34.99,
      image: 'https://via.placeholder.com/150',
      category: 'cafe',
    },
    {
      id: 7,
      name: 'Product 7',
      description: 'This is a description for Product 7.',
      price: 44.99,
      image: 'https://via.placeholder.com/150',
      category: 'cake',
    },
    {
      id: 8,
      name: 'Product 8',
      description: 'This is a description for Product 8.',
      price: 54.99,
      image: 'https://via.placeholder.com/150',
      category: 'combo',
    },
  ];

  const [activeCategory, setActiveCategory] = useState<'cafe' | 'cake' | 'combo'>('cafe');

  const filteredProducts = products.filter(product => product.category === activeCategory);

  return (
    <div>

      <div className="flex justify-left space-x-2 p-4">
        <button
          className={`py-2 px-4 font-semibold rounded-lg ${activeCategory === 'cafe' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveCategory('cafe')}
        >
          Cafe
        </button>
        <button
          className={`py-2 px-4 font-semibold rounded-lg ${activeCategory === 'cake' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveCategory('cake')}
        >
          Cake
        </button>
        <button
          className={`py-2 px-4 font-semibold rounded-lg ${activeCategory === 'combo' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveCategory('combo')}
        >
          Combo
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 p-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
