export type Badge = "guarantee" | "super" | "sale";

export type Product = {
  id: string;
  title: string;
  price: number;     
  oldPrice?: number;   
  perMonth?: number; 
  image: string;
  rating?: number;
  reviewsCount?: number;
  badges?: Badge[];     
};
