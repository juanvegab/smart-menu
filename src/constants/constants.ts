import { FoodGroup } from "./types";

export const AI_API_KEY: string = process.env.REACT_APP_OPENAI_API!;
export const FOOD_GROUP_MAP: FoodGroup[] = [
  { label: "fruits", key: "fruits" },
  { label: "vegetables", key: "vegetables" },
  { label: "grains", key: "grains" },
  { label: "protein", key: "protein" },
  { label: "dairy", key: "dairy" },
  { label: "fats And Oils", key: "fatsAndOils" },
  { label: "sugars And Sweets", key: "sugarsAndSweets" },
];
