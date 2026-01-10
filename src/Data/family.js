
import familyImg from '../assets/Images/Family/Family.jpeg';
import daughterInLawImg from '../assets/Images/Family/daughterinlaw.jpeg';
import siblingsImg from '../assets/Images/Family/siblings.jpeg';
import sonAndDaughterInLawImg from '../assets/Images/Family/sonand dougtherinlaw.jpeg';
import grandchildrenImg from '../assets/Images/Family/GRANDCHILDRENS.jpeg';
import withSonImg from '../assets/Images/Family/SirWithSon.jpeg';
import wifeWithSonImg from '../assets/Images/Family/sirWifewithSon.jpeg';
import wifeImg1 from '../assets/Images/Family/withwife1.jpeg';
import wifeImg2 from '../assets/Images/Family/withwife2.jpeg';
import wifeImg3 from '../assets/Images/Family/withwife3.jpeg';
import wifeImg4 from '../assets/Images/Family/withwife4.jpeg';
import wifeImg5 from '../assets/Images/Family/withWife5.jpeg';
import grandchildrenImg1 from '../assets/Images/Family/grandchildren.jpeg';
import grandchildrenImg2 from '../assets/Images/Family/grandchildren2.jpeg';
import sonImg from '../assets/Images/Family/son.jpeg';
import wifePushpaImg from '../assets/Images/Family/wife- pushpa.jpeg';
import fatherMotherImg from '../assets/Images/Family/WhatsApp Image 2026-01-07 at 6.54.34 PM (7).jpeg';

export const familyData = [
  {
    id: 'couple',
    title: "Wife",
    thumbnail: wifePushpaImg,
    images: [
      { id: 1, src: wifePushpaImg, alt: "My beloved wife Pushpa", title: "My beloved wife Pushpa." },
      { id: 2, src: wifeImg1, alt: "Memorable moments together", title: "Memorable moments together." },
      { id: 3, src: wifeImg2, alt: "Memorable moments together", title: "Memorable moments together." },
      { id: 4, src: wifeImg3, alt: "Memorable moments together", title: "Memorable moments together." },
      { id: 5, src: wifeImg4, alt: "Memorable moments together", title: "Memorable moments together." },
      { id: 6, src: wifeImg5, alt: "Memorable moments together", title: "Memorable moments together." },
    ]
  },
  {
    id: 'son-family',
    title: "Son",
    thumbnail: sonImg,
    images: [
      { id: 7, src: sonImg, alt: "Portrait of my son", title: "Portrait of my son." },
      { id: 8, src: withSonImg, alt: "Cherished moment with my son", title: "Cherished moment with my son." },
      { id: 9, src: wifeWithSonImg, alt: "Family Time", title: "With my wife and son." },
      { id: 10, src: daughterInLawImg, alt: "My daughter-in-law", title: "My daughter-in-law." },
      { id: 11, src: sonAndDaughterInLawImg, alt: "My son and daughter-in-law", title: "My son and daughter-in-law." },
    ]
  },
  {
    id: 'grandchildren',
    title: "Grandchildren",
    thumbnail: grandchildrenImg,
    images: [
      { id: 12, src: grandchildrenImg, alt: "With my lovely grandchildren", title: "With my lovely grandchildren." },
      { id: 13, src: grandchildrenImg1, alt: "Joyful moments", title: "Joyful moments." },
      { id: 14, src: grandchildrenImg2, alt: "More moments with the little ones", title: "More moments with the little ones." },
    ]
  },
  {
    id: 'complete-family',
    title: "Family",
    thumbnail: familyImg,
    images: [
      { id: 15, src: familyImg, alt: "The complete family", title: "The complete family." },
      { id: 16, src: siblingsImg, alt: "With my siblings", title: "With my siblings." },
    ]
  },
  {
    id: 'father-mother',
    title: "Father & Mother",
    thumbnail: fatherMotherImg,
    images: [
      { id: 17, src: fatherMotherImg, alt: "Father & Mother", title: "Father & Mother" },
    ]
  }
];
