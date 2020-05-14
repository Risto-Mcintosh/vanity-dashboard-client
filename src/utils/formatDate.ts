import moment from 'moment';

function formatDate(date: Date | null | undefined) {
  if (!date) return 'n/a';
  return moment(date).format('DD MMM YYYY');
}
export default formatDate;
