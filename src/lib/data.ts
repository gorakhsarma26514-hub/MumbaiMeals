import { DiscountStage } from './pricing';

export interface Restaurant {
  id: string;
  name: string;
  area: string;
  address: string;
  cuisine: string;
  rating: number;
  distance: string; // e.g., "1.2 km"
  imageUrl: string;
}

export interface FoodItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  originalPrice: number;
  quantity: number;
  pickupStart: string; // "18:00"
  pickupEnd: string;   // "20:00"
  discountSchedule: DiscountStage[];
  preferences: string[];
  imageUrl: string;
}

// Enforcing No Fake Data Policy: 
// The application must be able to gracefully handle empty data states
// instead of relying on mock data arrays.

export const restaurants: Restaurant[] = [];
export const foodItems: FoodItem[] = [];

export function getFoodWithRestaurantInfo() {
  return foodItems.map(food => {
    const restaurant = restaurants.find(r => r.id === food.restaurantId);
    return {
      ...food,
      restaurantName: restaurant?.name || 'Unknown Restaurant',
      location: restaurant?.area || 'Unknown Area',
      cuisine: restaurant?.cuisine || 'Unknown Cuisine',
      distance: restaurant?.distance || 'Unknown',
      rating: restaurant?.rating || 0,
      restaurantAddress: restaurant?.address || 'Unknown Address',
    };
  });
}
