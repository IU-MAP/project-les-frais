export const truncateMoney = (amount: number|string): string => {
  const num = parseInt(amount as string, 10);
  if (amount >= 1000 && amount < 10000) return `${Number(num / 1000).toFixed(2)}K`;
  if (amount >= 10000 && amount < 100000) return `${Number(num / 1000).toFixed(1)}K`;
  if (amount >= 100000 && amount < 1000000) return `${Number(num / 1000).toFixed(1)}K`;
  if (amount >= 1000000) return `${Number(num / 1000000).toFixed(2)}M`;

  return amount.toString();
};
