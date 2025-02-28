export function kelvinToCelsius(kelvin: number) {
    return kelvin - 273.15;
}

export function kelvinToFahrenheit(kelvin: number) {
    return (kelvin - 273.15) * 9 / 5 + 32;
}