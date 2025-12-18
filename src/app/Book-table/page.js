
import BookTable from '../Components/booking/BookTable';

async function getReservations() {
  const res = await fetch('http://localhost:4000/reservations', { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.filter(res => res.table && res.date);
}

export default async function BookTablePage() {
  const reservations = await getReservations();
  return <BookTable reservations={reservations} />;
}
