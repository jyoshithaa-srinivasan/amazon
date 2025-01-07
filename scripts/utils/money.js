//utilities files related to money
//common / shared codes

export function formatCurrency(priceCents){
    return Math.round((priceCents/100).toFixed(2));
}

export default formatCurrency;