import { Cardinals, CardinalsEnum } from '../types/types.d';

export default function cardinalPoints(deg: number): Cardinals{
    const { E,N, S, O, NE, NOE, SE, SOE}= CardinalsEnum;
    if ((deg >= 337.5 && deg <= 360) || (deg >= 0 && deg < 22.5)) return N;
    if (deg >= 22.5 && deg < 67.5) return NE;
    if (deg >= 67.5 && deg < 112.5) return E;
    if (deg >= 112.5 && deg < 157.5) return SE;
    if (deg >= 157.5 && deg < 202.5) return S;
    if (deg >= 202.5 && deg < 247.5) return SOE;
    if (deg >= 247.5 && deg < 292.5) return O;
    if (deg >= 292.5 && deg < 337.5) return NOE;
    
    return N; // En caso de valores fuera de rango
}

