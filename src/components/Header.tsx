import { CardHeader } from 'react-bootstrap';
import { FormSearch } from './FormSearch';

// COMPONENTE HEADER
export function Header() {
  return (
    <CardHeader className="w-100">
      <FormSearch />
    </CardHeader>
  );
}
