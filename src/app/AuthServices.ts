import { ApiConfig } from "./ApiConfig"

const AuthServices = {

GetProduct: function (
  searchTerm: string,
  order: string,
  page: number,
  limit: number
): Promise<any> {

  const skip = (page - 1) * limit;

  const url =
    `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.PRODUCTS}/search?q=${searchTerm}&limit=${limit}&skip=${skip}&sortBy=title&order=${order}`;

  return fetch(url).then((res) => {
    if (!res.ok) {
      return res.json().then((serverError) => {
        throw new Error(serverError.message);
      });
    }
    return res.json();
  });
},

    GetCategory:function(): Promise<any> {
        const url=`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.CATEGORY}`
        return fetch(url)
        .then((res)=>{
            if(!res.ok){
                return res.json().then((serverError)=>{
                    throw new Error(serverError.message)
                })
            }
            return res.json()
        })

    },
   GetByCAt: function (slug: string): Promise<any> {
        const url=`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.PRODUCT_BY_CAT}/${slug}`
        return fetch(url)
        .then((res)=>{
            if(!res.ok){
                return res.json().then((serverError)=>{
                    throw new Error(serverError.message)
                })
            }
            return res.json()
        })

    },
    


}

export default AuthServices