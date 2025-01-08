// test formatCurrency
import {formatCurrency} from '../scripts/utils/money.js';

console.log('test suite:FormatCurrecy');
//first automated test
console.log(formatCurrency(2095));
console.log('converts cents to dollars');
if(formatCurrency(2095)==='20.95'){
    console.log('passed');
}
else{
    console.log("test failed");
}

console.log('works with 0');
if(formatCurrency(0)==='0.00'){
    console.log('passed');
}
else{
    console.log("test failed");
}

console.log('rounds up to nearest cent');
if(formatCurrency(2000.5)==='20.01'){
    console.log("passed");
}
else{
    console.log("failed");
}