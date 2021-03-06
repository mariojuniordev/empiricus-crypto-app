import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../services/api";

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState<any[]>([]);

  const { currency, symbol } = CryptoState();

  async function fetchTrendingCoins() {
    const { data } = await axios.get(TrendingCoins(currency))
    
    console.log(trending);
    setTrending(data);
  };
  
  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currency]);

  
  const useStyles = makeStyles(() => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));

  const classes = useStyles();

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: (profit > 0) ? "var(--green)" : "var(--red)",
              fontWeight: 500,
            }}
          >
            {profit > 0 ? "+" : ""} 
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  })

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  }

  return (
    <>
      <div className={classes.carousel}>
      {!trending ? (
        <CircularProgress
        style={{ color: "gold" }}
        size={250}
        thickness={1}
        />
        ) : (    
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
          />
        )
      }
      </div>         
    </>
  );
}

export default Carousel;