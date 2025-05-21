import { useCart } from '../context/CartContext';

const CartItem = ({ item, isFreeItem = false }) => {
  const { addToCart, removeFromCart } = useCart();
  
  // Format price to show 2 decimal places
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(item.price);
  
  // Calculate item total
  const itemTotal = item.price * item.quantity;
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(itemTotal);

  return (
    <div className={`flex items-center py-4 border-b ${isFreeItem ? 'bg-green-50' : ''}`}>
      {/* Product Image */}
      <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
        <img 
          src={item.image || "/api/placeholder/64/64"} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Details */}
      <div className="ml-4 flex-grow">
        <h3 className="text-gray-800 font-medium">{item.name}</h3>
        
        {isFreeItem ? (
          <div className="text-sm text-green-600 font-medium mt-1">
            Free item - {item.offerName}
          </div>
        ) : (
          <div className="text-sm text-gray-500 mt-1">
            {formattedPrice} each
          </div>
        )}
      </div>
      
      {/* Quantity Controls */}
      {!isFreeItem ? (
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => removeFromCart(item.id)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M20 12H4" 
              />
            </svg>
          </button>
          
          <span className="w-6 text-center">{item.quantity}</span>
          
          <button 
            onClick={() => addToCart(item)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
            disabled={item.quantity >= item.stock}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <span className="w-6 text-center">{item.quantity}</span>
        </div>
      )}
      
      {/* Item Total */}
      <div className="ml-4 text-right">
        {isFreeItem ? (
          <span className="text-green-600 font-medium">FREE</span>
        ) : (
          <span className="font-medium">{formattedTotal}</span>
        )}
      </div>
    </div>
  );
};

export default CartItem;