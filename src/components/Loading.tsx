export function Loading (){
    return(
        <>
            <div className="container-loading">
                <h3>Cargando...</h3>
                <img  className='container-loading__loading' src="./src/assets/images/loader.svg" alt="Loading"/>
            </div>
        </>
    );
}