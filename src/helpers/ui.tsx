// export const calculateColumnsUI = (length: number) => {
//     switch (length) {
//         case 1:
//             return '12';
//         case 2:
//             return '6';
//         case 3:
//             return '4';
//         case 4:
//             return '3';
//         default:
//             return 'auto';
//     }
// };

// [
//     fila1 [0,1,2,3], length = 4
//     fila2 [5] length = 1 - 1 = 0
// ]

// export const calculateColumnsUI = (length: number, index: number) => {
//     if (length <= 4) return '3'; // Si hay 4 o menos, que sea col-3
//     if ((index + 1) % 4 === 0) return '3'; // Si está en una fila completa, que sea col-3
//     if (index === length - 1 && length % 4 !== 0) return '12'; // Si es la última y está sola, ocupar todo el ancho
//     return '3';
// };

// export const calculateColumnsUI = (length: number) => {
//     if (length === 2 || length % 4 === 0) return '6'; // Si está en una fila completa, que sea col-6
//     if ((length % length - 1) !== 0) return '12'; // Si es la última y está sola, ocupar todo el ancho
//     return '4';
// };

export const calculateColumnsUI = (length: number, index: number) => {
    if (length === 1) return '12'; // Si hay solo 1 columna, ocupa todo el ancho
    if (length === 2) return '6'; // Si hay 2 columnas, ocupan col-6 cada una
    if (length === 3) return '4'; // Si hay 3 columnas, ocupan col-4 cada una

    // Si hay más de 3 columnas
    const remaining = length % 3; // Cuántas columnas quedan después de filas completas de 3
    const isLast = index === length - 1;

    if (remaining === 1 && isLast) return '12'; // Si queda 1 sola columna en la fila, ocupa todo el ancho
    if (remaining === 2 && (index === length - 1 || index === length - 2)) return '6'; // Si quedan 2 columnas en la fila, ocupan col-6
    return '4'; // Si forma una fila completa de 3 columnas, usa col-4
};
