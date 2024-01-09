const DateConverter = (date: string | undefined) => {
  if (date === undefined) return;
  function formatDate(inputDate: string) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const [year, month, day] = inputDate.split("-");
    const formattedDate = `${months[parseInt(month, 10) - 1]} ${parseInt(
      day,
      10
    )}, ${year}`;

    return formattedDate;
  }

  return formatDate(date);
};

export default DateConverter;
