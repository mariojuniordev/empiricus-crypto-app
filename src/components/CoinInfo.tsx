import { createTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../services/api";

const CoinInfo = ({ coin }: any) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))

    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <div>
      Coin Info Works!
    </div>
  );
}

export default CoinInfo;