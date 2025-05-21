import { useState } from "react";
import {Link} from 'react-router-dom';
import {useCart} from '../context/CartContext';

const Header=({ activeCategory,setActiveCategory})=>{
    const { cart} =useCart();
    const [mobileMenuOpen,setMobileMenuOpen]=useState(false);

    const cartItemCount=cart.reduce((total,item)=> total+item.quantity,0);
    const categories=[
    { id: 'all', name: 'All Products' },
    { id: 'fruit', name: 'Fruit' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'bakery', name: 'Bakery' },

    ];
    return(
        <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            GroceryShop
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`py-2 hover:text-primary transition-colors ${
                  activeCategory === category.id 
                    ? 'text-primary font-medium border-b-2 border-primary' 
                    : 'text-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
          
          {/* Cart Link */}
          <Link 
            to="/checkout" 
            className="flex items-center space-x-1 text-gray-800 hover:text-primary transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="mt-3 md:hidden space-y-3 pb-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-2 py-2 rounded ${
                  activeCategory === category.id 
                    ? 'bg-primary bg-opacity-10 text-primary font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
        
    );
};
export default Header;