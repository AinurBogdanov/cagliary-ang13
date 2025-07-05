 interface doughType
{
  "type": string,
  "active": boolean,
  "available": boolean
}

interface sizes 
{
  "size": string,
  "weight": string,
  "price": number,
  "active": boolean,
  "available": boolean
}

export interface Product 
{
  "id": string,
  "name": string,
  "description": string,
  "price": number,
  "weight": string,
  "images": {
    "main": string,
    "preview": string
  },
  "nutrition": {},
  "sizes": sizes[],
  "doughTypes": doughType[]
}

export interface fakeApi {
  "timestamp": string,
  "productsCount": number,
  "products": Product[]
} 