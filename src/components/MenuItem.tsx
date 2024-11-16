"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaPlusCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Added chevron icons
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import cafe from '../app/images/ly-cafe.jpg';

import MenuModal from './MenuModal'; // Import the existing MenuModal component

// Assuming Product and ModalProps are defined here
interface Product {
  id: number;
  name: string;
  price: number;
  image: StaticImageData;
  category: 'cafe' | 'cake' | 'combo';
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { name, price, image } = product;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
      <div className="flex justify-center mb-4">
        <Image
          className="h-32 w-32 object-cover rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
          src={image}
          alt={name}
          width={128}
          height={128}
        />
      </div>
      <div>
        <h3 className="font-semibold text-lg text-center">{name}</h3>
        <p className="text-gray-500 text-center">{`$${price.toFixed(2)}`}</p>
      </div>
    </div>
  );
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Product 1', price: 29.99, image: cafe, category: 'cafe' },
    { id: 2, name: 'Product 2', price: 39.99, image: cafe, category: 'cake' },
    { id: 3, name: 'Product 3', price: 19.99, image: cafe, category: 'combo' },
    { id: 4, name: 'Product 4', price: 49.99, image: cafe, category: 'combo' },
    { id: 5, name: 'Product 5', price: 24.99, image: cafe, category: 'cake' },
    { id: 6, name: 'Product 6', price: 34.99, image: cafe, category: 'cafe' },
    { id: 7, name: 'Product 7', price: 44.99, image: cafe, category: 'cake' },
    { id: 8, name: 'Product 8', price: 54.99, image: cafe, category: 'combo' },
  ]);

  const [activeCategory, setActiveCategory] = useState<'cafe' | 'cake' | 'combo'>('cafe');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const filteredProducts = products.filter((product) => product.category === activeCategory);
  const indexOfLastProduct = currentPage * rowsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'cafe',
    image: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleModalSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: newItem.name,
      price: parseFloat(newItem.price),
      image: cafe,
      category: newItem.category as 'cafe' | 'cake' | 'combo',
    };
    setProducts([...products, newProduct]);
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Category Filters */}
      <div className="flex justify-center space-x-4 mb-6">
        {['cafe', 'cake', 'combo'].map((category) => (
          <button
            key={category}
            aria-pressed={activeCategory === category}
            className={`py-2 px-6 rounded-lg text-sm font-semibold transition duration-200 transform hover:scale-105 focus:outline-none ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white'
            }`}
            onClick={() => setActiveCategory(category as 'cafe' | 'cake' | 'combo')}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* New Product Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-6 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-500 focus:outline-none transition duration-300 ease-in-out"
        >
          <FaPlusCircle className="mr-2 text-lg" />
          New Product
        </button>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 flex items-center"
        >
          <FaChevronLeft className="mr-2" />
          First
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 flex items-center"
        >
          <FaChevronLeft className="mr-2" />
          Previous
        </button>
        <span className="py-2 px-4 text-gray-800">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 flex items-center"
        >
          Next
          <FaChevronRight className="ml-2" />
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 flex items-center"
        >
          Last
          <FaChevronRight className="ml-2" />
        </button>
      </div>

      {/* Modal */}
      <MenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        handleInputChange={handleInputChange}
        newItem={newItem}
      />
    </div>
  );
};

export default ProductList;
