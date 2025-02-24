export interface IUserData {
  email?: string;
  name?: string;
  password?: string;
}

export interface IIngredientData {
  type: string;
  name: string;
  price: number;
  image: string;
  image_large: string;
  _id: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}