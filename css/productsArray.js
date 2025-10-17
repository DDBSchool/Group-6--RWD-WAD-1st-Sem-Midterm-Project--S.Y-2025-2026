// Data for menu
const drinks = [
  {
    name: 'Caffe Latte',
    img: 'https://images.unsplash.com/photo-1464306076886-debede14d7b1?auto=format&fit=crop&w=800&q=80',
    desc: 'Rich espresso with steamed milk and a light layer of foam',
    price: 150,
    sizes: [
      { label: 'Small', price: 150 },
      { label: 'Medium', price: 180 },
      { label: 'Large', price: 210 }
    ],
    addons: [
      { name: 'Vanilla Syrup', price: 20 },
      { name: 'Hazelnut Syrup', price: 20 },
      { name: 'Caramel Syrup', price: 20 }
    ],
    condiments: ['White Sugar', 'Brown Sugar']
  },
  {
    name: 'Cappuccino',
    img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    desc: 'Classic Italian coffee with equal parts espresso, steamed milk, and foam',
    price: 160,
    sizes: [
      { label: 'Small', price: 160 },
      { label: 'Medium', price: 190 },
      { label: 'Large', price: 220 }
    ],
    addons: [
      { name: 'Vanilla Syrup', price: 20 },
      { name: 'Hazelnut Syrup', price: 20 },
      { name: 'Caramel Syrup', price: 20 }
    ],
    condiments: ['White Sugar', 'Brown Sugar']
  },
  {
    name: 'Espresso',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    desc: 'Bold and intense shot of pure coffee perfection',
    price: 120,
    sizes: [
      { label: 'Single', price: 120 },
      { label: 'Double', price: 150 }
    ],
    addons: [
      { name: 'Vanilla Syrup', price: 20 },
      { name: 'Hazelnut Syrup', price: 20 }
    ],
    condiments: ['White Sugar', 'Brown Sugar']
  }
];

const pastries = [
  {
    name: 'Croissant',
    img: 'https://images.unsplash.com/photo-1505250461400-81d3c8f9c8b4?auto=format&fit=crop&w=800&q=80',
    desc: 'Buttery, flaky pastry',
    price: 95,
    sizes: [{ label: 'Regular', price: 95 }],
    addons: [{ name: 'Chocolate', price: 25 }],
    condiments: []
  },
  {
    name: 'Blueberry Muffin',
    img: 'https://images.unsplash.com/photo-1464306076886-debede14d7b1?auto=format&fit=crop&w=800&q=80',
    desc: 'Sweet muffin loaded with blueberries',
    price: 85,
    sizes: [{ label: 'Regular', price: 85 }],
    addons: [{ name: 'Extra Blueberry', price: 20 }],
    condiments: []
  },
  {
    name: 'Pain au Chocolat',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    desc: 'Flaky pastry filled with rich chocolate',
    price: 110,
    sizes: [{ label: 'Regular', price: 110 }],
    addons: [],
    condiments: []
  }
];
