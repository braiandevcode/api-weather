// export default function formatCoordinateCustom(value: number): string {
//     const formatted = new Intl.NumberFormat('de-DE', {
//         useGrouping: true, // Aplica el separador de miles
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 10,
//     }).format(value);

//     // Reemplazar el primer punto por un marcador temporal
//     return formatted.replace(/\./, '#').replace(/\./g, '').replace('#', '.');
// }