export const numberToTwoDigits = (num: number|string) => {
  if (!num) return '00';

  const n = num.toString();
  if (n.length === 1) return `0${n}`;
  return num;
};

const formatDate = (date: string): string => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `${year}-${numberToTwoDigits(month)}-${numberToTwoDigits(day)}`;
};

export const monthBoundaries = (month: number, year: number) => {
  const finishYear = month === 12 ? year + 1 : year;
  const finishMonth = month === 12 ? 0 : month + 1;

  return {
    date__gt: `${year}-${numberToTwoDigits(month)}-${numberToTwoDigits(1)}`,
    date__lt: `${finishYear}-${numberToTwoDigits(finishMonth)}-${numberToTwoDigits(1)}`,
  };
};

export default formatDate;
