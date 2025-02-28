export function FormSearch() {
    return (
        <>
            <form className='formSearch'>
                <input type="text" id='filterLocation' placeholder="Buscar..." autoFocus />
                <label htmlFor="filterLocation">Ciudad - Provincia - Pais</label>
            </form>
        </>
    );
}