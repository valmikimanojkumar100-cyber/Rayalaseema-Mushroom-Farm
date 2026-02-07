
export interface MushroomVariety {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  price: string;
  imageUrl: string;
  tags: string[];
  isBestSeller?: boolean;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  duration: string;
  description: string;
  iconName: 'Sprout' | 'Sun' | 'Droplets' | 'Thermometer';
}

export interface ShopProduct {
  id: string;
  name: string;
  weight: string;
  price: number;
  image: string;
  tag: string;
}

export interface CartItem extends ShopProduct {
  quantity: number;
}
