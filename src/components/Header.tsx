import { CardHeader } from 'react-bootstrap';
import { FormSearch } from './FormSearch';

// CABECERA
export function Header() {
    return (
        <>
            <CardHeader className='w-100'>
                <FormSearch />
            </CardHeader>
        </>
    );
}