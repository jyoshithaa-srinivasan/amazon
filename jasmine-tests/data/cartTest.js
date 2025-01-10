//test the addtocart function
import {addToCart,cart,loadFromStorage} from '../../data/cart.js';

describe('test suite: addTOcART',()=>{

    //if condn test
    it('ADDS AN EXISITIN PRODUCT TO CART',()=>{

        spyOn(localStorage,'setItem');


        spyOn(localStorage,'getItem').and.callFake(()=>{

            //inside this function we will overwrite the original function 
            // we are mocking on

            return JSON.stringify([{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId:'1'

        }]); // so when we load from localstorage , it will give this is starting cart

        });

        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes();
        //how many time localstorage.setitem has been called

        //check productid
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        //check quantity ( the quantity ll increase if it is the same product right)
        expect(cart[0].quantity).toEqual(2);

    });

    //else condn test
    it('adds a new product to the cart',()=>{

        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{

            //inside this function we will overwrite the original function 
            // we are mocking on

            return JSON.stringify([]); //return an empty array
        });

        loadFromStorage();
        console.log(localStorage.getItem('cart'));


        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes();
        //how many time localstorage.setitem has been called

        //check productid
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        //check quantity
        expect(cart[0].quantity).toEqual(1);

    });
});