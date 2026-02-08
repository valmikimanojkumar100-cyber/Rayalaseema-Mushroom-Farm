
import { MushroomVariety, NavItem, StatItem, TrainingModule, ShopProduct } from './types';

// Animation Constants
export const EASE_ORGANIC: [number, number, number, number] = [0.22, 1, 0.36, 1]; // Custom cubic-bezier
export const DURATION_DEFAULT = 0.8;
export const STAGGER_DELAY = 0.12;

const newLocal = 'https://images.unsplash.com/photo-1599599810694-d5ff3a6a4ee0?auto=format&fit=crop&q=80&w=600&h=800';
// Oyster Mushroom Images Gallery
export const OYSTER_MUSHROOM_IMAGES = [
  newLocal,
  'https://images.pexels.com/photos/2478405/pexels-photo-2478405.jpeg',
  'https://images.pexels.com/photos/2478418/pexels-photo-2478418.jpeg',
  'https://images.pexels.com/photos/16732702/pexels-photo-16732702.jpeg',
];

// Button Mushroom Images Gallery
export const BUTTON_MUSHROOM_IMAGES = [
  'https://images.pexels.com/photos/10307853/pexels-photo-10307853.jpeg',
  'https://images.pexels.com/photos/10307856/pexels-photo-10307856.jpeg',
];

// Milky Mushroom Images Gallery
export const MILKY_MUSHROOM_IMAGES = [
  'https://www.dreamstime.com/milky-mushroom-growth-soil-farm-image146889535',
  'https://images.pexels.com/photos/6157043/pexels-photo-6157043.jpeg',
  'https://images.pexels.com/photos/5987623/pexels-photo-5987623.jpeg',
];


export const NAV_ITEMS: NavItem[] = [
  { label: 'Varieties', href: '#varieties' },
  { label: 'Nutrition', href: '#nutrition' },
  { label: 'Training', href: '#training' },
  { label: 'Contact', href: '#footer' },
];

export const MUSHROOMS: MushroomVariety[] = [
  {
    id: '1',
    name: 'Oyster Mushroom',
    scientificName: 'Pleurotus ostreatus',
    description: 'Thick, meaty stems and small caps. A favorite for grilling and vegan scallops.',
    price: '₹89',
    imageUrl: OYSTER_MUSHROOM_IMAGES[0],
    tags: ['Firm Texture', 'Nutty Flavor'],
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Button Mushrooms',
    scientificName: 'Agaricus bisporus',
    description: 'Classic, versatile mushrooms with a mild flavour. Perfect for everyday cooking.',
    price: '₹69',
    imageUrl: BUTTON_MUSHROOM_IMAGES[0],
    tags: ['Mild Flavor', 'Versatile'],
  },
  {
    id: '3',
    name: 'Milky Mushrooms',
    scientificName: 'Calocybe indica',
    description: 'Tender, milky-white caps with a delicate taste. Naturally grown and chemical-free.',
    price: '₹59',
    imageUrl: MILKY_MUSHROOM_IMAGES[0],
    tags: ['Delicate', 'Fresh Harvest'],
  },
];

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'p1',
    name: 'Oyster Mushrooms',
    weight: '200g',
    price: 89,
    image: OYSTER_MUSHROOM_IMAGES[0],
    tag: 'Premium Organic',
    description: 'Rich, meaty texture with a subtle nutty flavor. Perfect for grilling, sautéing, or vegan preparations.',
    benefits: [
      'High in protein and amino acids',
      'Rich in vitamins D and B12',
      'Supports immune system health',
      'Excellent for vegan scallops',
      'Firm texture holds well in cooking'
    ]
  },
  {
    id: 'p2',
    name: 'Milky Mushrooms',
    weight: '200g',
    price: 69,
    image: MILKY_MUSHROOM_IMAGES[0],
    tag: 'Locally Grown',
    description: 'Tender, milky-white caps with a delicate, mild taste. Chemical-free and naturally grown for optimal freshness.',
    benefits: [
      'Tender and easy to digest',
      'Rich in antioxidants and polysaccharides',
      'Boosts metabolic function',
      'Perfect for soups and curries',
      'Gentle flavor for all age groups'
    ]
  },
  {
    id: 'p3',
    name: 'Button Mushrooms',
    weight: '200g',
    price: 79,
    image: BUTTON_MUSHROOM_IMAGES[0],
    tag: 'Fresh Harvest',
    description: 'The most versatile mushroom variety with a mild, pleasant flavor. Ideal for everyday cooking and meal prep.',
    benefits: [
      'Low in calories, high in nutrition',
      'Contains selenium and copper',
      'Supports bone health',
      'Versatile in all cuisines',
      'Great for salads, pasta, and stir-fries'
    ]
  },
  {
    id: 'p4',
    name: 'Fresh Paddy Straw Mushrooms',
    weight: '1kg',
    price: 25,
    image: 'https://images.unsplash.com/photo-1591511792635-01ade8d83d61?auto=format&fit=crop&q=80&w=600&h=800',
    tag: 'Bulk Value',
    description: 'Premium paddy straw mushrooms fresh from our farms. Bulk 1kg pack for families and commercial use.',
    benefits: [
      'Excellent value for money',
      'Perfect for large family meals',
      'Ideal for restaurants and catering',
      'High yield in organic farming',
      'Sustainable farming practice'
    ]
  },
  {
    id: 'p5',
    name: 'Mushroom Spawn (Growing Kit)',
    weight: '1kg',
    price: 100,
    image: 'https://images.unsplash.com/photo-1624206566197-02c45a029753?auto=format&fit=crop&q=80&w=600&h=800',
    tag: 'Grow Your Own',
    description: 'Premium quality spawn substrate to grow your own fresh mushrooms at home. Complete with growth instructions.',
    benefits: [
      'Grow organic mushrooms at home',
      'Educational farming experience',
      'Cost-effective long-term solution',
      'Fresh harvest in 3-4 weeks',
      'Includes detailed growing guide'
    ]
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
