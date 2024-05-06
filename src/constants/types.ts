export type MealNutritionalPlan = {
  fruits: number;
  vegetables: number;
  grains: number;
  protein: number;
  dairy: number;
  fatsAndOils: number;
  sugarsAndSweets: number;
};

export type FoodGroup = {
  label: string;
  key: keyof MealNutritionalPlan;
};
