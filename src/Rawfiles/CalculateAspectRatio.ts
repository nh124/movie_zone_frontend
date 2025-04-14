const CalculateAspectRatio = () => {
  const screenWidth = window.innerWidth;
  let width: number;

  if (screenWidth <= 640) {
    // Mobile (sm)
    width = screenWidth - 20;
  } else if (screenWidth <= 1024) {
    // Tablet (md)
    width = screenWidth - 100;
  } else if (screenWidth <= 1440) {
    // Small desktop (lg)
    width = screenWidth - 200;
  } else {
    // Large desktop (xl+)
    width = 1280;
  }
  const height = (width / 16) * 9;
  return {
    width,
    height,
  };
};

export default CalculateAspectRatio;
