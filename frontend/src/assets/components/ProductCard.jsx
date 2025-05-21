import {useCart} from '../context/CartContext';
const ProductCard =({ product}) =>{
    const{ addToCart} =useCart();
    const formattedPrice=new Intl.NumberFormat('en-US',{
        style:"currency",
        currency:'USD',
    }).format(product.price);
    const stockDisplay=product.stock>=10
    ?<span className='text-success'>Available</span>
    :<span className='text-warning'>{product.stock} in stock</span>;
    return (
        <div className="card bg-white rounded-lg shadow-md overflow-hidden">
      {/* Product Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img 
          src={product.image || "/api/placeholder/200/200"} 
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm h-12 overflow-hidden">{product.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <div className="text-lg font-bold text-primary">{formattedPrice}</div>
            <div className="text-sm mt-1">{stockDisplay}</div>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className={`btn btn-primary flex items-center ${
              product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-1" 
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
            Add
          </button>
        </div>
      </div>
    </div>
        
    );
};
export default ProductCard;