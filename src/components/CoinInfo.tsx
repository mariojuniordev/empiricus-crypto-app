import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  TextField,
} from "@material-ui/core";
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
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }: any) => {
  const [historicData, setHistoricData] = useState<any[]>([]);
  const [days, setDays] = useState(1);
  const [filter, setFilter] = useState(0);
  const [investmentData, setInvestmentData] = useState<any[]>([]);

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
    if (!filter) {
      setInvestmentData(data.prices);
    } else {
      let newValues = [];

      let newValue: number;
      
      for (let i = 0; i < data.prices.length - 1; i++) {
        if (i === 0) {
          newValue = (data.prices[i + 1][1] / data.prices[i][1]) * filter;
        } else {
          newValue = (data.prices[i + 1][1] / data.prices[i][1]) * newValues[i - 1];
        }
    
        newValues.push(newValue)
      }

      setInvestmentData(newValues);
    }

  };

  function formatPercentage(initialValue: number, finalValue: number) {
    let percentage = (finalValue - initialValue) / initialValue;

    if (percentage > 0) {
      return `+${(percentage*100).toFixed(2)}%`;
    }

    return `${(percentage*100).toFixed(2)}%`;
  }

  function isPercentagePositive(initialValue: number, finalValue: number) {
    let percentage = (finalValue - initialValue) / initialValue;

    if (percentage > 0) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days, filter]);

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
  
  const formattedPercentage = formatPercentage(filter, investmentData[investmentData.length - 1])
  const isNumberPositive  = isPercentagePositive(filter, investmentData[investmentData.length - 1])

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
              {typeof filter === 'number' && 
              typeof investmentData[investmentData.length - 1] === 'number' &&
              <div>
                <h2>Your Investment Results</h2>
                <h1 style={{marginBottom: 15, textAlign: 'center', color: isNumberPositive ? 'green' : 'red'}}>
                  {formattedPercentage}
                </h1>
              </div>
              }
              
            {/* INVESTMENT SIMULATION */}            
            <TextField
              label="Type a value to simulate an investment"
              variant="outlined"
              style={{ marginBottom: 20, width: "100%" }}
              onChange={(e) => setFilter(Number(e.target.value))}
            />  

            <h1>Investment Simulation</h1>
            <Chart
              type="line"
              style={{ marginBottom: 25 }}
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: investmentData.map((coin: any) => coin),
                    label: `Your Investment in the Last ${days} Day(s) in ${currency}`,
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
            
            {/* SELECT BUTTON */}
            <div style={{ marginBottom: 30 }}>
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>

            {/* PRICE TRACKING */}
            <h1>Price Tracking</h1>
            <Chart
              type="line"
              style={{ marginBottom: 25 }}
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin: any) => coin[1]),
                    label: `Price in the Last ${days} Day(s) in ${currency}`,
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
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;