import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../assets/components/CartItem';
import OfferBadge from '../assets/components/OfferBadge';

const Checkout = () => {
  const { cart, freeItems, subtotal, discount, total, clearCart } = useCart();

  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  // Check if cart is empty
  const isCartEmpty = cart.length === 0;

  // Group active offers
  const activeOffers = [...new Set(freeItems.map(item => item.offerName))];

  // Handle checkout completion
  const handleCheckout = () => {
    alert('Thank you for your order!');
    clearCart();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              GroceryShop
            </Link>
            <h1 className="text-xl font-semibold">Checkout</h1>
            <div className="w-24">
              {/* Empty div for balanced layout */}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isCartEmpty ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-24 w-24 mx-auto" 
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
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              to="/" 
              className="btn btn-primary px-6 py-3"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:flex lg:space-x-8">
            {/* Cart Items Section */}
            <div className="lg:w-2/3">
              <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                {/* Cart Items */}
                <div>
                  {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                
                {/* Free Items from Offers */}
                {freeItems.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-dashed">
                    <h3 className="text-lg font-medium mb-4">Special Offers Applied</h3>
                    
                    <div className="space-y-2 mb-4">
                      {activeOffers.map((offer, index) => (
                        <OfferBadge key={index} offerName={offer} />
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      {freeItems.map((item, index) => (
                        <CartItem key={`free-${item.id}-${index}`} item={item} isFreeItem={true} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <Link to="/" className="text-primary hover:underline flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                    />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary Section */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discounts</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full btn btn-primary py-3 mt-6 text-center"
                >
                  Complete Order
                </button>
              </div>
            </div>
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

export default Checkout;