
const images = import.meta.glob('../assets/Images/Articles/*.{jpg,jpeg,png}', { eager: true });

export const articleImages = Object.values(images).map((module, index) => {
  return {
    id: index + 1,
    src: module.default,
    alt: `Article clipping ${index + 1}`
  };
});
