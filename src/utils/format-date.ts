const numberToTwoDigits = (num: number|string) => {
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

export default formatDate;
