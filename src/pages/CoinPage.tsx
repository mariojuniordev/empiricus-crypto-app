import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../services/api";

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
      broderRight: "2px solid grey",
    },
    heading: {

    },
    description: {

    },
  }));

  const classes = useStyles();

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
        <Typography variant="subtitle1" className={classes.description}>
          {coin?.description.en.split(". ")[0]}.
        </Typography>
      </div>

      {/* chart */}
      <CoinInfo/>
    </div>
  )
}

export default CoinPage;