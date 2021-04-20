export const MONTH_NAMES = {
  rus: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  eng: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

export const numberToTwoDigits = (num: number|string) => {
  if (!num) return '00';

  const n = num.toString();
  if (n.length === 1) return `0${n}`;
  return num;
};

const formatDate = (date: string): string => {
  const d: Date|null = new Date(date);

  // If date is invalid, return current date
  if (Number.isNaN(d.getTime())) {
    return formatDate(new Date().toDateString());
  }

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `${year}-${numberToTwoDigits(month)}-${numberToTwoDigits(day)}`;
};

export const monthBoundaries = (month: number, year: number) => {
  const finishYear = month === 12 ? year + 1 : year;
  const finishMonth = month === 12 ? 1 : month + 1;

  return {
    date__gt: `${year}-${numberToTwoDigits(month)}-${numberToTwoDigits(1)}`,
    date__lt: `${finishYear}-${numberToTwoDigits(finishMonth)}-${numberToTwoDigits(1)}`,
  };
};

export default formatDate;
