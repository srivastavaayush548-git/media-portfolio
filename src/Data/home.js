import home1Image from '../assets/n.jpg';
import home2Image from '../assets/praksh.jpg';

export const homeMenu = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about-me' },
  {
    label: 'Family',
    submenu: [
      { label: 'Parents', path: '/family/parents' },
      { label: 'Sibling', path: '/family/sibling' },
      { label: 'Wife', path: '/family/wife' },
      { label: 'Son', path: '/family/son' },
      { label: 'GrandChildren', path: '/family/grandchildren' },
    ]
  },
  { label: 'Career', path: '/career' },
  {
    label: 'Awards',
    submenu: [
      { label: 'Padmabhushan', path: '/awards/padmabhushan' },
      { label: 'Rajyotsava Award', path: '/awards/rajyotsava-award' },
    ]
  },
  { label: 'Interview', path: '/interview' },
  { label: 'Article', path: '/article' },
  { label: 'Books', path: '/books' },
  { label: "VIP's", path: '/vips' },
];

export const homeSocialLinks = [
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'twitter', label: 'Twitter / X', href: '#' },
];

export const homeFooterLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
];

export const homeImages = [
  {
    id: 1,
    src: home1Image,
    alt: 'Main hero image',
  },
  {
    id: 2,
    src: home2Image,
    alt: 'Audience enjoying the show',
  },
  {
    id: 3,
    src: home1Image,
    alt: 'Host speaking on stage',
  },
  {
    id: 4,
    src: home2Image,
    alt: 'Award presentation moment',
  },
  {
    id: 5,
    src: home1Image,
    alt: 'Stage with spectacular lights',
  },
];


