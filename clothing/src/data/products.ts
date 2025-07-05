export interface ProductType {
  id: string;
  name: string;
  category: string;
  price: number;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  featured?: boolean;
  newArrival?: boolean;
  discount?: number;
}

export const products: ProductType[] = [
  {
    id: 'p1',
    name: 'Silk Maxi Dress',
    category: 'Women',
    price: 280,
    colors: ['#F8F0E5', '#000000', '#EAAC99'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7139730/pexels-photo-7139730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7139585/pexels-photo-7139585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Elegant silk maxi dress with a flowing silhouette. Handcrafted from 100% natural silk for an effortlessly luxurious look.',
    featured: true,
  },
  {
    id: 'p2',
    name: 'Tailored Wool Blazer',
    category: 'Men',
    price: 390,
    colors: ['#1E1E1E', '#2C3E50', '#34495E'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Premium Italian wool blazer with a tailored fit. Features internal pockets and artisanal button detailing.',
    featured: true,
  },
  {
    id: 'p3',
    name: 'Oversized Cashmere Sweater',
    category: 'Women',
    price: 320,
    colors: ['#D7CCC8', '#EFEBE9', '#F5F5F5'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9771138/pexels-photo-9771138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9218602/pexels-photo-9218602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Luxuriously soft oversized cashmere sweater. Perfect for layering with a relaxed fit and ribbed cuffs.',
    newArrival: true,
  },
  {
    id: 'p4',
    name: 'Linen Summer Shirt',
    category: 'Men',
    price: 150,
    colors: ['#FFFFFF', '#ECEFF1', '#CFD8DC'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/2826131/pexels-photo-2826131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Breathable pure linen shirt with a relaxed cut. Ideal for warm weather with its natural cooling properties.',
    newArrival: true,
  },
  {
    id: 'p5',
    name: 'Leather Crossbody Bag',
    category: 'Accessories',
    price: 230,
    colors: ['#5D4037', '#3E2723', '#000000'],
    sizes: ['One Size'],
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1306248/pexels-photo-1306248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Handcrafted Italian leather crossbody bag with adjustable strap and custom gold hardware.',
    featured: true,
  },
  {
    id: 'p6',
    name: 'Pleated Midi Skirt',
    category: 'Women',
    price: 190,
    colors: ['#EFEBE9', '#000000', '#B0BEC5'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.pexels.com/photos/4428388/pexels-photo-4428388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6311368/pexels-photo-6311368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Elegant pleated midi skirt with a fluid drape. Features a high waist and hidden side zipper.',
    discount: 15,
  },
  {
    id: 'p7',
    name: 'Merino Wool Sweater',
    category: 'Men',
    price: 210,
    colors: ['#37474F', '#455A64', '#607D8B'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/6975645/pexels-photo-6975645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6975496/pexels-photo-6975496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6975631/pexels-photo-6975631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Premium merino wool sweater with ribbed collar and cuffs. Expertly knitted for warmth without bulk.',
    discount: 20,
  },
  {
    id: 'p8',
    name: 'High-Rise Tailored Pants',
    category: 'Women',
    price: 240,
    colors: ['#000000', '#263238', '#ECEFF1'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/10041153/pexels-photo-10041153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/8485738/pexels-photo-8485738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/8485778/pexels-photo-8485778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Sophisticated high-rise pants with a tailored leg. Features front pleats and side pockets.',
    newArrival: true,
  },
];

export const testimonials = [
  {
    id: 't1',
    name: 'Emma Thompson',
    role: 'Fashion Influencer',
    text: 'The quality of ELYSIAN pieces is unmatched. Each garment feels thoughtfully designed and made to last.',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 't2',
    name: 'Michael Chen',
    role: 'Style Editor',
    text: 'ELYSIAN has redefined luxury fashion with their sustainable approach and timeless aesthetic.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 't3',
    name: 'Sophia Rodriguez',
    role: 'Fashion Blogger',
    text: 'I\'ve never worn pieces that receive as many compliments as my ELYSIAN collection. True statement pieces.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const instagramPosts = [
  {
    id: 'i1',
    image: 'https://images.pexels.com/photos/9771982/pexels-photo-9771982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
    productId: 'p3',
  },
  {
    id: 'i2',
    image: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
    productId: 'p2',
  },
  {
    id: 'i3',
    image: 'https://images.pexels.com/photos/2703181/pexels-photo-2703181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
    productId: 'p5',
  },
  {
    id: 'i4',
    image: 'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
    productId: 'p1',
  },
];

export const collections = [
  {
    id: 'c1',
    name: 'Women',
    image: 'https://images.pexels.com/photos/7139691/pexels-photo-7139691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
  },
  {
    id: 'c2',
    name: 'Men',
    image: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
  },
  {
    id: 'c3',
    name: 'New Arrivals',
    image: 'https://images.pexels.com/photos/5641028/pexels-photo-5641028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
  },
  {
    id: 'c4',
    name: 'Sale',
    image: 'https://images.pexels.com/photos/4427888/pexels-photo-4427888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
  },
];

export const lookbookSlides = [
  {
    id: 'lb1',
    title: 'Summer Serenity',
    description: 'Ethereal pieces in lightweight fabrics for effortless summer styling.',
    image: 'https://images.pexels.com/photos/9218667/pexels-photo-9218667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'lb2',
    title: 'Urban Minimalism',
    description: 'Clean lines and monochromatic palettes for the modern urbanite.',
    image: 'https://images.pexels.com/photos/9771195/pexels-photo-9771195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'lb3',
    title: 'Artisanal Heritage',
    description: 'Celebrating craftsmanship with timeless silhouettes and intricate details.',
    image: 'https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];