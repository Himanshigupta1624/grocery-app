import { useState,useEffect } from "react";
import {fetchProducts,searchProsucts} from '../utils/api';
import Header from '../assets/components/Header';
import SearchBar from '../assets/components/SearchBar';
import ProductCard from '../assets/components/ProductCard';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products based on active category
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(activeCategory);
        setProducts(data);
        // Apply any existing search filter to the new products
        if (searchTerm) {
          setFilteredProducts(searchProducts(data, searchTerm));
        } else {
          setFilteredProducts(data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    getProducts();
  }, [activeCategory]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setFilteredProducts(searchProducts(products, term));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center mb-6">Find Your Groceries</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {/* Category Title */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold capitalize">
            {activeCategory === 'all' ? 'All Products' : activeCategory}
          </h2>
        </div>
        
        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md text-center">
            {error}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products found.</p>
            {searchTerm && (
              <p className="mt-2 text-gray-500">
                Try adjusting your search or browse by category.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 GroceryShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;