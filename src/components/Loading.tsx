
// LOADER
export function Loading() {
    return (
        <>
            <div className="container-loading">
                <div>
                    <h3>Cargando...</h3>
                </div>
                <img className='container-loading__loading' src="./src/assets/images/loader.svg" alt="Loading" />
            </div>
        </>
    );
}