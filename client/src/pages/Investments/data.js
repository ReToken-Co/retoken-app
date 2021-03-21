import { v4 as uuid } from 'uuid';

const data = [
  {
    id: uuid(),
    investment: '20,000',
    media: '/images/8VillaEstateRoad.jpg',
    title: '5 Dover Road, Bali 888888',
    asset: '5DR',
    quantity: '40'
  },
  {
    id: uuid(),
    investment: '12,500',
    media: '/images/9NowhereMountainRoad.jpg',
    title: '9 Nowhere Mountain Road, Bali',
    asset: 'NMR',
    quantity: '25'
  },
  {
    id: uuid(),
    investment: '15,000',
    media: '/images/100ChinatownRoad.jpg',
    title: '100 Chinatown Road, Singapore 123456',
    asset: 'CTR',
    quantity: '15'
  },
  {
    id: uuid(),
    investment: '20,000',
    media: '/images/Shophousesgamuda.jpg',
    title: '123 Road to Nowhere, Singapore 123456',
    asset: 'RTN',
    quantity: '20'
  }
];

export default data;