


export const currencyFormatted = (value: number) => {
    return value.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2


    })

}