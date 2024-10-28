"use client";
import React, { useState } from 'react';
import Image from 'next/image';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'cafe' | 'cake' | 'combo';
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg bg-white p-2 transition-transform duration-200 ease-in-out hover:scale-105">
      <div className="flex justify-center">
      <Image
          className="h-32 object-cover" 
          src={product.image} 
          alt={product.name} 
          width={128} 
          height={128} 
        />
      </div>
      <div className="py-4">
        <div className="font-bold text-xl">{product.name}</div>
        <div className="flex justify-between items-center">
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
      price: 29.99,
      image: 'https://via.placeholder.com/150',
      category: 'cafe',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 39.99,
      image: 'https://via.placeholder.com/150',
      category: 'cake',

    },
    {
      id: 3,
      name: 'Product 3',
      price: 19.99,
      image: 'https://via.placeholder.com/150',
      category: 'combo',
    },
    {
      id: 4,
      name: 'Product 4',
      price: 49.99,
      image: 'https://via.placeholder.com/150',
      category: 'combo',
    },
    {
      id: 5,
      name: 'Product 5',
      price: 24.99,
      image: 'https://via.placeholder.com/150',
      category: 'cake',
    },
    {
      id: 6,
      name: 'Product 6',
      price: 34.99,
      image: 'https://via.placeholder.com/150',
      category: 'cafe',
    },
    {
      id: 7,
      name: 'Product 7',
      price: 44.99,
      image: 'https://via.placeholder.com/150',
      category: 'cake',
    },
    {
      id: 8,
      name: 'Product 8',
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
          className={`py-2 px-4 font-semibold rounded-lg transition duration-200 transform hover:scale-105 hover:bg-blue-400 focus:outline-none active:scale-95 ${
            activeCategory === 'cafe' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveCategory('cafe')}
        >
          Cafe
        </button>
        <button
          className={`py-2 px-4 font-semibold rounded-lg transition duration-200 transform hover:scale-105 hover:bg-blue-400 focus:outline-none active:scale-95 ${
            activeCategory === 'cake' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveCategory('cake')}
        >
          Cake
        </button>
        <button
          className={`py-2 px-4 font-semibold rounded-lg transition duration-200 transform hover:scale-105 hover:bg-blue-400 focus:outline-none active:scale-95 ${
            activeCategory === 'combo' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
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
