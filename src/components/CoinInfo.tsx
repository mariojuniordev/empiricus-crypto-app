import { CircularProgress, createTheme, ThemeProvider, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../services/api";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


const CoinInfo = ( { coin }: any ) => {
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
              <Chart 
                  type="line"
                  style={{ marginBottom: 25 }}
                  data={{
                    labels: historicData.map((coin) => {
                      let date = new Date(coin[0]);
                      let time = date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;

                      return days === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [{
                      data: historicData.map((coin: any) => coin[1]),
                      label: `Price ( Last ${days} Days ) in ${currency}`,
                      borderColor: "gold",
                    },
                    ],
                  }}    
                  options={{
                    elements: {
                      point: {
                        radius: 1,
                      },
                    },
                  }}             
                />
                <div>
                {
                  chartDays.map(day => (
                    <SelectButton
                      key={day.value}
                      onClick={() => setDays(day.value)}
                      selected={day.value === days }
                    >
                      {day.label}
                    </SelectButton>
                  ))
                }
                </div>
            </>
          )
        }
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;