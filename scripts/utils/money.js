//utilities files related to money
//common / shared codes

export function formatCurrency(priceCents){
    return (priceCents/100).toFixed(2);
}

export default formatCurrency;