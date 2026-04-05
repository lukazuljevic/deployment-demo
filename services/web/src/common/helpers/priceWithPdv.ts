const priceWithoutPDV = (price: number) => {
  const vatRate = 0.25;
  return price / (1 + vatRate);
};

export default priceWithoutPDV;
