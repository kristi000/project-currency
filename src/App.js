import { useEffect, useState } from "react"
import "./App.css"
import CurrencyRow from "./CurrencyRow"

const BASE_URL = `https://api.apilayer.com/exchangerates_data/symbols`

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [fromExchangeRate, setFromExchangeRate] = useState()
  const [toExchangeRate, setToExchangeRate] = useState()

  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState()

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * fromExchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / fromExchangeRate
  }

  useEffect(() => {
    const myHeaders = new Headers()
    myHeaders.append("apikey", "lMouydPHMe5vtC9WtDr9gjDFdGMKEWKJ")
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    }
    fetch(BASE_URL, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const firstcurrency = Object.keys(data.symbols)[2]
        const secondcurrency = Object.keys(data.symbols)[3]

        setFromCurrency(firstcurrency)
        setToCurrency(secondcurrency)

        setCurrencyOptions([data.symbol, ...Object.keys(data.symbols)])
      })
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    let amount = 1
    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAmountInFromCurrency(9)
      })
  }, [fromCurrency, toCurrency])

  return (
    <>
      <h1>Currency</h1>
      <CurrencyRow
        amount={fromAmount}
        onChangeAmount={setAmount}
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
      />

      <div className="equals">=</div>

      <CurrencyRow
        amount={toAmount}
        onChangeAmount={setAmount}
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
      />
    </>
  )
}

export default App
