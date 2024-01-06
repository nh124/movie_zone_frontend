const TimeConverter = (time: string) => {
  const timeInNumber = parseInt(time, 10);
  const hours = Math.round(timeInNumber / 60);
  const minutes = timeInNumber - 60 * hours;

  return `${hours}h ${minutes}m`;
};

export default TimeConverter;
