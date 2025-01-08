import {calculateCartQuantity, cart, removeFromCart,updateQuantity,updateDeliveryOption} from '../../data/cart.js';
import { products,getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
//. means current folder--> so will be present at scripts folder
//.. means folder outside the current folder----> will be present at main folder
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

import {deliveryOptions,getDeliveryOption,calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';


export function renderOrderSummary(){
  let cartSummaryHTML='';

cart.forEach((cartItem)=>{
    const productId=cartItem.productId;

    const matchingProduct=getProduct(productId);

    const deliveryOptionId=cartItem.
    deliveryOptionId;

    const deliveryOption=getDeliveryOption(deliveryOptionId);

    const dateString=calculateDeliveryDate(deliveryOption);

    cartSummaryHTML+=


    `
              <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                   <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
                <span class="js-quantity-validator-${matchingProduct.id} quantity-validation-msg">Quantity must be greater than 0 and less than 1000</span>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                ${deliveryOptionsHTML(matchingProduct,cartItem)}
                
              </div>
            </div>
          </div>

         
          
    `;
});

function deliveryOptionsHTML(matchingProduct,cartItem){
  let html='';

  deliveryOptions.forEach((deliveryOption)=>{

   const dateString=calculateDeliveryDate(deliveryOption);

    const priceString=deliveryOption.priceCents
    ===0
      ?'free'
      :`$${formatCurrency(deliveryOption.priceCents)} -`;


    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

   html += ` <div class="delivery-option js-delivery-option"
              data-product-id="${matchingProduct.id}"
              data-delivery-option-id="${deliveryOption.id}">
      <input type="radio"
        ${isChecked ?'checked':''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
    </div>
    `;

    

  });
  return html;
}

document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link)=>{

  link.addEventListener('click',()=>{

    const {productId}=link.dataset;
    
    //delete from cart
    removeFromCart(productId);  //updates the data when we click delete
    console.log(cart);

    const container=document.querySelector(`.js-cart-item-container-${productId}`);

    renderCheckoutHeader();

    //delete the html
    // container.remove();
    //or regenerate the html
    renderOrderSummary();

    renderPaymentSummary(); //regenerate html

    updateCartQuantity();




  })
});

document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener('click',()=>{

      const {productId,deliveryOptionId}=element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();

    })
  });

document.querySelectorAll('.js-update-link').forEach((link)=>{
  link.addEventListener('click',()=>{

    const {productId}=link.dataset;


    console.log(productId);

    const container=document.querySelector(`.js-cart-item-container-${productId}`);

    container.classList.add('is-editing-quantity');


    

  })
});
 

function updateCartQuantity(){
  
  const cartQuantity=calculateCartQuantity(); 

document.querySelector('.js-return-to-home-link')
.innerHTML=`${cartQuantity} items`;

}

document.querySelectorAll('.js-save-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);

      const quantityValidator = document.querySelector(`.js-quantity-validator-${productId}`);

      if (newQuantity <= 0 || newQuantity > 1000) {
        quantityValidator.classList.add('show'); // Show validation message
      } else {
        quantityValidator.classList.remove('show'); // Hide validation message

        updateQuantity(productId, newQuantity);
        updateCartQuantity();

        const quantityLabel = container.querySelector('.quantity-label');
        quantityLabel.textContent = newQuantity;
      }
      renderPaymentSummary();
    });
  });

updateCartQuantity();


}





