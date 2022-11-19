export const calculateAge = (date: any): number => {
  const birthday_arr = date.split('-');
  const birthday_date = new Date(
    birthday_arr[2],
    birthday_arr[1] - 1,
    birthday_arr[0],
  );
  const ageDifMs = Date.now() - birthday_date.getTime();
  const ageDate = new Date(ageDifMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
