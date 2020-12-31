export function giftPriceExists(gift) {
  return !(gift.price_cents === undefined || gift.price_cents === null || gift.price_cents === '')
}