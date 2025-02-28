import { DataHumFeels } from './DataHumFeels';
import { DataImageName } from './DataImageName';
import { DataMinMax } from './DataMinMax';
import { DataWind } from './DataWind';

export function ArticleData() {
    return (
        <>
            <article className='sectionCountry__article'>
                <DataImageName />
                <DataMinMax />
                <DataWind />
                <DataHumFeels />
            </article>
        </>
    );
}