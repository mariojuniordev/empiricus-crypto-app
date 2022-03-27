import { CircularProgress, createTheme, ThemeProvider, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../services/api";
import { Line } from "react-chartjs-2";

const CoinInfo = ( { coin } : any) => {
  const [historicData, setHistoricData] = useState<any[]>([]);
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))

    setHistoricData(data.prices);
    console.log(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  
  const useStyles = makeStyles(() => ({ 
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40, 
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          !historicData ? (
            <CircularProgress
              style={{ color: "gold" }}
              size={250}
              thickness={1}
            />
          ) : (
            <>
              <Line 
              data={{
                labels:historicData.map((coin: string) => {
                  let date = new Date(coin[0]);
                  let time = date.getHours() > 12 
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM` 
                  : `${date.getHours()}:${date.getMinutes()} AM`

                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {data: historicData.map((coin: string) => coin[1])}
                ]
              }}              
              />
            </>
          )
        }
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;