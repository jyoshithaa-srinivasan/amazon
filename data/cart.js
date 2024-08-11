export const cart=[];

export function addToCart(productId){
    let AddQuantity=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
           //converting to number since Dom values are strings by default


           //initially will be undefined 
           let matchingItem;

           //checking if already is in cart 
           cart.forEach((cartItem)=>{
            if(productId===cartItem.productId){
                matchingItem=cartItem;

            }
            
           });
           if(matchingItem){
                 matchingItem.quantity+=AddQuantity;
           }
           else{
            cart.push({
                productId:productId,
                quantity:AddQuantity
                // productId,
                // quantity
               });

           }

}