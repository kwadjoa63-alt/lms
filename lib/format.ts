// Current exchange rate: 1 USD = 12.5 GHS (approximate)
// You can update this rate or fetch it from an API like:
// - https://api.exchangerate-api.com/v4/latest/USD
// - https://api.fixer.io/latest?base=USD&symbols=GHS
// Update this rate regularly for accurate conversions
const USD_TO_GHS_RATE = 12.5;

export const formatPrice = (price: number) => {
    return `₵${price.toFixed(2)}`;
}

export const convertGhsToUsd = (ghsAmount: number): number => {
    return ghsAmount / USD_TO_GHS_RATE;
}

export const convertUsdToGhs = (usdAmount: number): number => {
    return usdAmount * USD_TO_GHS_RATE;
}