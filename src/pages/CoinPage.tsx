import { LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../services/api";

export function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<any>();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
    console.log(coin);
  }

  useEffect(() => {
    fetchCoin();
  }, []);

  const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
    },
    sidebar: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fonFamily: "Poppins",
    },
    description: {
      width: "100%",
      fontFamily: "Poppins",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",      
    },
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />

  return (
    <div className={classes.container}>
      <div className={classes.sidebar} >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          { coin?.name } 
        </Typography>
        {/*<Typography variant="subtitle1" className={classes.description}>
          {(coin?.description.en.split(". ")[0])}.
        </Typography> */}
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank: 
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Poppins",
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price: 
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Poppins",
              }}
            >
              { symbol } { " " }
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap: 
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Poppins",
              }}
            >
              { symbol }{ " " }
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
              )}
            </Typography>
          </span>
        </div>
      </div>

      {/* chart */}
      <CoinInfo coin={ coin }/>
    </div>
  )
}

export default CoinPage;