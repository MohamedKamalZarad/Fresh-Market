
export interface UserInfo {
  role: string
  active: boolean
  wishlist: string[]
  _id: string
  name: string
  email: string
  phone: string
  password: string
  addresses: Address[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Address {
  _id: string
  details: string
  phone: string
  city: string
  name: string
}
