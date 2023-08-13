export const getProducts = async (hasMoroe, page) => {
  console.log(page);
  const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${10}`);
  const data = await res.json();
  return data;
};
