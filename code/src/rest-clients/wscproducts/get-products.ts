/* eslint-disable @typescript-eslint/no-explicit-any */
/* istanbul ignore file */

export type Products = {
  id: string;
  name: string;
};

const getProducts = async (apiEndpoint: string, method: any): Promise<Products[]> => {
  const endpoint = `${apiEndpoint}/v1/products`;
  const response = (await method(endpoint)).json() as unknown as Products[];
  return response;
};

export default getProducts;
