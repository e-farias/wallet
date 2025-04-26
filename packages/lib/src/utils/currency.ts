export const formatMoneyBRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
})

export const maskMoneyString = (money: string) => {
  const value = money.replaceAll(/\D/g, "")
  const float = Number(value)/100
  const valueFormatted = formatMoneyBRL.format(float)
  return valueFormatted
}

export const convertMoneyNumberToStr = (money: number) => {
  const float = money/100
  const moneyBRL = formatMoneyBRL.format(float)
  return moneyBRL
}

export const convertMoneyStrToNumber = (money: string) => {

  let valueFloatString = money
  const isFloat = valueFloatString.includes(",")

  if (!isFloat) {
    const numberFormat = formatMoneyBRL.format(Number(valueFloatString))
    const numberFormatString = numberFormat.toString()
    valueFloatString = numberFormatString.replaceAll("R$ ", "").replaceAll(".", "") 
  }
  
  const [integerPart, decimalPart] = valueFloatString.split(",")

  let formattedDecimalPart = "00"

  if (decimalPart.length > 0) {
    const decimalPartClear = decimalPart
    if (decimalPartClear.length === 1) {
      formattedDecimalPart = `${decimalPartClear}0`
    } else {
      formattedDecimalPart = decimalPartClear
    }
  }

  const integerPartClear = integerPart.replace(/\D/g, "")
  const formattedValue = Number(`${integerPartClear}${formattedDecimalPart}`)

  return formattedValue
  
}
