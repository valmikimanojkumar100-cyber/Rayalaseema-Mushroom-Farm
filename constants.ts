
import { MushroomVariety, NavItem, StatItem, TrainingModule, ShopProduct } from './types';

// Animation Constants
export const EASE_ORGANIC: [number, number, number, number] = [0.22, 1, 0.36, 1]; // Custom cubic-bezier
export const DURATION_DEFAULT = 0.8;
export const STAGGER_DELAY = 0.12;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Varieties', href: '#varieties' },
  { label: 'Nutrition', href: '#nutrition' },
  { label: 'Training', href: '#training' },
  { label: 'Contact', href: '#footer' },
];

export const MUSHROOMS: MushroomVariety[] = [
  {
    id: '1',
    name: 'Royal Oyster',
    scientificName: 'Pleurotus eryngii',
    description: 'Thick, meaty stems and small caps. A favorite for grilling and vegan scallops.',
    price: '$18 / lb',
    imageUrl: 'https://picsum.photos/id/106/600/800',
    tags: ['Firm Texture', 'Nutty Flavor'],
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Lion’s Mane',
    scientificName: 'Hericium erinaceus',
    description: 'Known for cognitive benefits and a unique lobster-like texture when cooked.',
    price: '$24 / lb',
    imageUrl: 'https://picsum.photos/id/292/600/800',
    tags: ['Brain Health', 'Seafood-like'],
  },
  {
    id: '3',
    name: 'Chestnut',
    scientificName: 'Pholiota adiposa',
    description: 'Clusters of earthy, nutty mushrooms that maintain a beautiful crunch.',
    price: '$20 / lb',
    imageUrl: 'https://picsum.photos/id/252/600/800',
    tags: ['Crunchy', 'Earthy'],
  },
];

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'p1',
    name: 'Button Mushrooms',
    weight: '200g',
    price: 69,
    image: 'https://picsum.photos/id/1080/400/400', // Using generic nature IDs as placeholders
    tag: 'Fresh Harvest'
  },
  {
    id: 'p2',
    name: 'Oyster Mushrooms',
    weight: '200g',
    price: 89,
    image: 'https://picsum.photos/id/106/400/400',
    tag: 'Premium Organic'
  },
  {
    id: 'p3',
    name: 'Milky Mushrooms',
    weight: '200g',
    price: 59,
    image: 'https://picsum.photos/id/292/400/400',
    tag: 'Locally Grown'
  },
  {
    id: 'p4',
    name: 'Mushroom Spawn',
    weight: '1kg',
    price: 199,
    image: 'https://picsum.photos/id/252/400/400',
    tag: 'Grow Your Own'
  }
];

export const STATS: StatItem[] = [
  { id: 's1', label: 'Protein Content', value: 3.5, suffix: 'g', description: 'Per 100g serving' },
  { id: 's2', label: 'Varieties Grown', value: 12, suffix: '+', description: 'Rotated seasonally' },
  { id: 's3', label: 'Local Farmers', value: 8, suffix: '', description: 'Community partners' },
];

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: 't1',
    title: 'Substrate Preparation',
    duration: 'Week 1-2',
    description: 'Master the art of pasteurization and nutrient balancing for optimal yields.',
    iconName: 'Sprout',
  },
  {
    id: 't2',
    title: 'Incubation Control',
    duration: 'Week 3-4',
    description: 'Understanding colonization, temperature, and contamination avoidance.',
    iconName: 'Thermometer',
  },
  {
    id: 't3',
    title: 'Fruiting Conditions',
    duration: 'Week 5-6',
    description: 'Dialing in humidity and oxygen exchange for massive, healthy flushes.',
    iconName: 'Droplets',
  },
];
