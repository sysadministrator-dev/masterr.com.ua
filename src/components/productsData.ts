export interface ProductItem {
  id: number;
  title: string;
  primaryImage: string;
  hoverImage: string;
  /** Якщо задано — картка показує "Від {priceFrom} ₴/м²" замість загальної ціни сайту. */
  priceFrom?: number;
}

// Кожна позиція редагується окремо: primaryImage — основне фото, hoverImage — фото при наведенні (плавна заміна за 1с).
export const PRODUCTS: ProductItem[] = [
  {
    id: 1,
    title: "Розсувні решітки на двері",
    primaryImage: "/images/products/1-primary.jpg",
    hoverImage: "/images/products/1-hover.jpg",
  },
  {
    id: 2,
    title: "Розсувні решітки на вікна",
    primaryImage: "/images/products/2-primary.jpg",
    hoverImage: "/images/products/2-hover.jpg",
  },
  {
    id: 3,
    title: "Розсувні решітки в гаражи",
    primaryImage: "/images/products/3-primary.jpg",
    hoverImage: "/images/products/3-hover.jpg",
  },
  {
    id: 4,
    title: "Розсувні решітки на фасадне скління",
    primaryImage: "/images/products/4-primary.jpg",
    hoverImage: "/images/products/4-hover.jpg",
  },
  {
    id: 5,
    title: "Розсувні решітки на горища",
    primaryImage: "/images/products/5-primary.jpg",
    hoverImage: "/images/products/5-hover.jpg",
  },
  {
    id: 6,
    title: "Розсувні решітки для котеджів",
    primaryImage: "/images/products/6-primary.jpg",
    hoverImage: "/images/products/6-hover.jpg",
  },
  {
    id: 7,
    title: "Розсувні решітки особливо малих розмірів",
    primaryImage: "/images/products/7-primary.jpg",
    hoverImage: "/images/products/7-hover.jpg",
    priceFrom: 5500,
  },
  {
    id: 8,
    title: "Розсувні решітки особливо великих розмірів",
    primaryImage: "/images/products/8-primary.jpg",
    hoverImage: "/images/products/8-hover.jpg",
  },
  {
    id: 9,
    title: "Розсувні решітки з врізним замком",
    primaryImage: "/images/products/9-primary.jpg",
    hoverImage: "/images/products/9-hover.jpg",
    priceFrom: 5900,
  },
  {
    id: 10,
    title: "Розсувні решітки в торгівельні приміщення",
    primaryImage: "/images/products/10-primary.jpg",
    hoverImage: "/images/products/10-hover.jpg",
  },
  {
    id: 11,
    title: "Розсувні решітки з верхньою глухою решіткою",
    primaryImage: "/images/products/11-primary.jpg",
    hoverImage: "/images/products/11-hover.jpg",
  },
  {
    id: 12,
    title: "Розсувні решітки різнокольорові",
    primaryImage: "/images/products/12-primary.jpg",
    hoverImage: "/images/products/12-hover.jpg",
    priceFrom: 3600,
  },
];
