
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  material: string;
  weight: string;
  size: string;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

export const categories = [
  'Кольца',
  'Серьги',
  'Колье и подвески',
  'Браслеты',
  'Броши',
  'Часы',
  'Свадебные украшения',
  'Детские украшения'
];

export const materials = [
  'Золото 585',
  'Золото 750',
  'Серебро 925',
  'Платина',
  'Белое золото',
  'Розовое золото'
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Кольцо с бриллиантом "Сияние"',
    price: 3750,
    originalPrice: 4500,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    category: 'Кольца',
    description: 'Элегантное кольцо из белого золота 750 пробы с центральным бриллиантом весом 0.5 карата. Классический дизайн подчеркивает красоту камня.',
    material: 'Белое золото 750',
    weight: '3.2 г',
    size: '17',
    inStock: true,
    isSale: true,
    discount: 17
  },
  {
    id: '2',
    name: 'Серьги с изумрудами "Весна"',
    price: 2670,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
    category: 'Серьги',
    description: 'Изысканные серьги из желтого золота с натуральными изумрудами и бриллиантами. Идеальное украшение для особого случая.',
    material: 'Золото 585',
    weight: '4.8 г',
    size: '2.5 см',
    inStock: true,
    isNew: true
  },
  {
    id: '3',
    name: 'Колье "Лунная дорожка"',
    price: 2010,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    category: 'Колье и подвески',
    description: 'Нежное колье из белого золота с россыпью бриллиантов, создающих эффект лунной дорожки на воде.',
    material: 'Белое золото 585',
    weight: '5.6 г',
    size: '45 см',
    inStock: true
  },
  {
    id: '4',
    name: 'Браслет "Infinity"',
    price: 1350,
    originalPrice: 1650,
    image: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400',
    category: 'Браслеты',
    description: 'Стильный браслет с символом бесконечности, украшенный мелкими бриллиантами. Символ вечной любви.',
    material: 'Розовое золото 585',
    weight: '6.2 г',
    size: '18 см',
    inStock: true,
    isSale: true,
    discount: 18
  },
  {
    id: '5',
    name: 'Обручальные кольца "Союз"',
    price: 2340,
    image: 'https://images.unsplash.com/photo-1594736797933-d0c6e6c3c543?w=400',
    category: 'Свадебные украшения',
    description: 'Классические обручальные кольца из желтого золота с матовой отделкой. Комплект из двух колец.',
    material: 'Золото 585',
    weight: '8.4 г',
    size: 'Универсальный',
    inStock: true
  },
  {
    id: '6',
    name: 'Часы "Elegance"',
    price: 4680,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400',
    category: 'Часы',
    description: 'Роскошные женские часы с корпусом из белого золота и браслетом, украшенным бриллиантами.',
    material: 'Белое золото 750',
    weight: '45 г',
    size: '26 мм',
    inStock: false
  },
  {
    id: '7',
    name: 'Брошь "Бабочка"',
    price: 1020,
    image: 'https://images.unsplash.com/photo-1588444837495-c6dd99c4e4cb?w=400',
    category: 'Броши',
    description: 'Очаровательная брошь в виде бабочки из серебра с эмалью и цветными камнями.',
    material: 'Серебро 925',
    weight: '12 г',
    size: '4x3 см',
    inStock: true,
    isNew: true
  },
  {
    id: '8',
    name: 'Детские серьги "Звездочки"',
    price: 360,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
    category: 'Детские украшения',
    description: 'Милые детские серьги в форме звездочек из медицинского золота с безопасной застежкой.',
    material: 'Золото 585',
    weight: '0.8 г',
    size: '5 мм',
    inStock: true
  },
  {
    id: '9',
    name: 'Кольцо с сапфиром "Королевское"',
    price: 5940,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400',
    category: 'Кольца',
    description: 'Роскошное кольцо с центральным сапфиром в окружении бриллиантов. Настоящее произведение ювелирного искусства.',
    material: 'Платина',
    weight: '4.7 г',
    size: '16',
    inStock: true,
    isNew: true
  },
  {
    id: '10',
    name: 'Серьги-капли "Росинка"',
    price: 1560,
    originalPrice: 1950,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    category: 'Серьги',
    description: 'Изящные серьги-капли из белого золота с голубыми топазами и россыпью бриллиантов.',
    material: 'Белое золото 585',
    weight: '3.6 г',
    size: '3 см',
    inStock: true,
    isSale: true,
    discount: 20
  }
];

export const promotions = [
  {
    id: '1',
    title: 'Весенняя коллекция',
    description: 'Скидки до 30% на украшения с цветными камнями',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    discount: '30%',
    color: 'from-pink-500 to-purple-600'
  },
  {
    id: '2',
    title: 'Свадебная акция',
    description: 'При покупке обручальных колец - гравировка в подарок',
    image: 'https://images.unsplash.com/photo-1594736797933-d0c6e6c3c543?w=800',
    discount: 'Подарок',
    color: 'from-gold to-yellow-500'
  },
  {
    id: '3',
    title: 'Премиум коллекция',
    description: 'Новые поступления украшений с бриллиантами',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    discount: 'Новинки',
    color: 'from-blue-500 to-indigo-600'
  }
];
