export const objectToQueryString = (obj) => {
  let queryString = '';
  const arr = Object.keys(obj).map((key) =>
    obj[key].length > 0
      ? obj[key]
          .map((value) => `${key}_like=${encodeURIComponent(value)}`)
          .join('&')
      : ''
  );
  if (arr.length > 1) {
    queryString = arr.join('&');
    return queryString;
  }
  if (arr.length === 1) {
    queryString = arr.join('');
    return queryString;
  }
  return queryString;
};
