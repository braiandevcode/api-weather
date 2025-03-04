import { Cardinals, CardinalsEnum } from '../types/types.d';
// VERIFICAR GRADOS PARA RETORNAR SU PUNTO ARDINAL DEL VIENTO
export default function cardinalPoints(deg: number): Cardinals{
    const { E,N, S, O, NE, NOE, SE, SOE}= CardinalsEnum;

    if ((deg >= 337.5 && deg <= 360) || (deg >= 0 && deg < 22.5)) return N; //NORTE
    if (deg >= 22.5 && deg < 67.5) return NE; //NORESTE
    if (deg >= 67.5 && deg < 112.5) return E; //ESTE
    if (deg >= 112.5 && deg < 157.5) return SE; //SURESTE
    if (deg >= 157.5 && deg < 202.5) return S; //SUR
    if (deg >= 202.5 && deg < 247.5) return SOE; //SUROESTE
    if (deg >= 247.5 && deg < 292.5) return O; //OESTE
    if (deg >= 292.5 && deg < 337.5) return NOE; //NOROESTE
    
    return N; //POR DEFECTO NORTE
}
