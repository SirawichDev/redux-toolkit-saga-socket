export const currencyFormatter = (
  lang = "th-TH",
  currency = "THB",
  displayCurrency = true
) =>
  new Intl.NumberFormat(lang, {
    style: "currency",
    currency,
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 3, // (causes 2500.99 to be printed as $2,501)
  });