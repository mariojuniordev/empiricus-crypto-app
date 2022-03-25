import { createContext, useContext, useEffect, useState } from "react";

interface ContextProviderProps {
  children: React.ReactNode;
}

interface CurrencyProps {
  currency: string;
  symbol: string;
  setCurrency: (param: string) => void;
}

const Crypto = createContext<CurrencyProps>({} as CurrencyProps);

const CryptoContext = ({ children }: ContextProviderProps) => {
  const [currency, setCurrency] = useState("BRL");
  const [symbol, setSymbol] = useState("R$");

  useEffect(() => {
    if (currency === "BRL") setSymbol("R$");
    else if (currency === "USD") setSymbol("US$")
  }, [currency])

  return (
      <Crypto.Provider value={{ currency, symbol, setCurrency }}>
        {children}
      </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};