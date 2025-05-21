import axios from 'axios';
const api=axios.create({
    baseURL:'api/'
});
export const fetchProducts =async(category='all')=>{
    try{
        const response=await api.get(`/products/?category=${category}`);
        return response.data;
    }catch(error){
        console.error('Error Fetching products:',error);
        throw error;
    }
};
export const searchProducts=(products, searchTerm) =>{
    if(!searchTerm || searchTerm.trim()===''){
        return products;
    }
    const lowercaseSearchTerm=searchTerm.toLowerCase().trim();
    return products.filter(product =>
        product.name.toLowerCase().includes(lowercaseSearchTerm)||
        product.description.toLowerCase().includes(lowercaseSearchTerm)
    );
};
export default api;