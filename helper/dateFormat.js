// create a function to format the date to "yyyy/mm/dd" format
export default function dateFormat(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}/${month}/${day}`;
}
