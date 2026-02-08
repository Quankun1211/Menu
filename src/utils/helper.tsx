export const formatVND = (price: number | string) => {
  return (
    new Intl.NumberFormat("vi-VN").format(Number(price)) + "đ"
  );
};

export const calcSalePrice = (
  price: number,
  salePercent?: number | null
): number => {
  if (!salePercent || salePercent <= 0) return price

  return Math.round(price * (100 - salePercent) / 100)
}
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatStepTime = (dateString: string | undefined) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};