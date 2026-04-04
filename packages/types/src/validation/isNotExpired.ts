export function isNotExpired(expiryMonth?: number, expiryYear?: number) {
  if (!expiryMonth || !expiryYear) return true;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const now = currentYear * 100 + currentMonth;
  const expiry = expiryYear * 100 + expiryMonth;

  return expiry >= now;
}
