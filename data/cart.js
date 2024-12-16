// we will not store the products image/ price . we  ll use it from the products.js using product id
//no need to save the data twice
//this technique is re-duplicating the data/ normalizing the data

//  instead of default value , get the values from localstorage

export let cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){

    cart=[ {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,

} ,
{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,

}];

}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
    //localstorage can save only strings
}

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

           saveToStorage();

}

export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((cartItem)=>{
        if(productId !== cartItem.productId){
            newCart.push(cartItem);
        }
    });

    cart=newCart;
    saveToStorage();

}

    