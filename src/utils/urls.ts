export const getParams = (obj: Record<string, string>): string => {
  let url = '';
  Object.entries(obj).forEach(([key, val]) => {
    url += `${key}=${encodeURIComponent(val)}&`;
  });

  return url;
};
