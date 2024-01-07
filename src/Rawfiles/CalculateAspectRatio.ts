const CalculateAspectRatio = () => {
  const maxWidths = {
    small: window.innerWidth - 20,
    medium: window.innerWidth - 600,
    large: window.innerWidth - 1500,
  };

  const maxWidth =
    window.innerWidth <= 500
      ? maxWidths.small
      : window.innerWidth <= 1920
      ? maxWidths.medium
      : maxWidths.large;

  const width = Math.min(maxWidth, window.innerWidth);
  const height = (width / 16) * 9;
  return {
    width,
    height,
  };
};

export default CalculateAspectRatio;
