import { createContext,useContext,useState,useEffect } from "react";
const OFFER_RULES ={
    COCA_COLA_OFFER:{
        requiredProductId : 'coca-cola',
        requiredQuantity : 6,
        freeProductId : 'coca-cola',
        freeQuantity : 1,
        name : 'Buy 6 cans of Coca-Cola ,get 1 free'
    },
    CROISSANT_COFFEE_OFFER: {
    requiredProductId: 'croissant', 
    freeProductId: 'coffee', 
    freeQuantity: 1,
    name: 'Buy 3 croissants, get a free coffee'
    }

};

const CartContext=createContext();
export const useCart = () => {
    return useContext(CartContext);
};
export const CartProvider =({children}) => {
    const [cart, setCart] =useCart([]);
    const [freeItems, setFreeItems] =useState([]);
    const [subtotal, setSubtotal]= useState(0);
    const [discount, setDiscount] = useState (0);
    const [total, setTotal] =useState(0);

    const addToCart =(product) =>{
        setCart(prevCart => {
            const existingProductIndex =prevCart.findIndex(item => item.id === product.id);
            if (existingProductIndex >= 0){
                // update quantity of existing cart
                const updatedCart =[...prevCart];
                const currentQuantity =updatedCart[existingProductIndex].quantity;

                if (currentQuantity<product.stock){
                    updatedCart[existingProductIndex]={
                        ...updatedCart[existingProductIndex],
                        quantity: currentQuantity +1
                    };
                    return updatedCart;
                } else{
                    alert(`Sorry, only ${product.stock} units available for ${product.name}`);
                    return prevCart;
                }
            }else{
                return[...prevCart,{ ...product,quantity:1}];
            }
        });
    };
    const removeFromCart =(productId) => {
        setCart(prevCart => {
            const existingProductIndex=prevCart.findIndex(item => item.id ===productId);
            if (existingProductIndex >=0){
                const updatedCart=[...prevCart];
                if(updatedCart[existingProductIndex].quantity >1){
                    updatedCart[existingProductIndex]={
                        ...updatedCart[existingProductIndex],
                        quantity : updatedCart[existingProductIndex].quantity -1
                    };
                    return updatedCart;
                }else{
                    return prevCart.filter(item => item.id!==productId);
                }
            }
            return prevCart;
        });
    };
    const clearCart =()=>{
        setCart([]);
        setFreeItems([]);
    };
    const applyOffers =() =>{
        let newFreeItems =[];
        let totalDiscount =0;
        const cocaColaRule=OFFER_RULES.COCA_COLA_OFFER;
        const cocaCola=cart.find(item=> item.id ===cocaColaRule.requiredProductId);
        if(cocaCola && cocaCola.quantity >=cocaColaRule.requiredQuantity){
            const freeQuantity=Math.floor(cocaCola.quantity/cocaColaRule.requiredQuantity) * cocaColaRule.freeQuantity;
            if(freeQuantity>0){
                newFreeItems.push({
                    ...cocaCola,
                    quantity:freeQuantity,
                    offerName:cocaColaRule.name,
                    freeItems: true
                });
                totalDiscount+=freeQuantity * cocaCola.price;
            }
        }
    
    const croissantRule = OFFER_RULES.CROISSANT_COFFEE_OFFER;
    const croissant = cart.find(item => item.id === croissantRule.requiredProductId);
    
    if (croissant && croissant.quantity >= croissantRule.requiredQuantity) {
      // Find coffee product in the cart or assume a standard price
      const coffee = cart.find(item => item.id === croissantRule.freeProductId);
      
      if (coffee) {
        // Calculate how many free coffees are applicable
        const freeQuantity = Math.floor(croissant.quantity / croissantRule.requiredQuantity) * croissantRule.freeQuantity;
        
        if (freeQuantity > 0) {
          newFreeItems.push({
            ...coffee,
            quantity: freeQuantity,
            offerName: croissantRule.name,
            freeItem: true
          });
          
          // Calculate discount value (price of free items)
          totalDiscount += freeQuantity * coffee.price;
        }
      }
    }
    
    setFreeItems(newFreeItems);
    setDiscount(totalDiscount);
  };

  // Calculate totals
  useEffect(() => {
    // Calculate subtotal from cart items
    const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    setSubtotal(cartSubtotal);
    
    // Apply offers based on current cart
    applyOffers();
    
    // Total is subtotal minus discount
    setTotal(subtotal - discount);
  }, [cart, subtotal, discount]);

  const value = {
    cart,
    freeItems,
    subtotal,
    discount,
    total,
    addToCart,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
