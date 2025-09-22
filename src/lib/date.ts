import { format } from 'date-fns';

export function formatDate(date: Date) {
  return format(new Date(date), 'MMMM dd, yyyy');
}
