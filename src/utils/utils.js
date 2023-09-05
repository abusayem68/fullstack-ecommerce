export const objectToQueryString = (obj) => {
  const queryString = Object.keys(obj)
    .map((key) =>
      obj[key]
        .map((value) => `${key}_like=${encodeURIComponent(value)}`)
        .join('&')
    )
    .join('&');

  return queryString;
};
