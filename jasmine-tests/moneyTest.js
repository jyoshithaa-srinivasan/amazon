import {formatCurrency} from '../scripts/utils/money.js';

//next create a test suite
describe('test suite: formatCurrency',()=>{
    //create a test
    it('convertes cents into dollars',()=>{
        //code inside a test
        expect(formatCurrency(2095)).toEqual('20.95');

    });

    it('works with zero',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent',()=>{
        expect(formatCurrency(20.05) ).toEqual('20.01');
    });
});