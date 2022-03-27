import { 
  Container, 
  createTheme, 
  ThemeProvider, 
  Typography, 
  TextField, 
  TableContainer, 
  LinearProgress, 
  Table, 
  TableHead, 
  TableRow,
  TableCell, 
  TableBody
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { CoinList } from "../services/api";

export function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const navigate = useNavigate();

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
    console.log(coins);
  }

  useEffect(() => {
    fetchCoins();
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

  const handleSearch = () => {
    return coins.filter((coin) => 
      coin.name.toLowerCase().includes(search) || 
      coin.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "var(--black)",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "var(--hover-black)",
      },
      fontFamily: "Poppins",
    },
    pagination: {
      "& .MiuPaginationItem-root": {
        color: "gold",
      },
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center"}}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Poppins" }}
        >
          Choose a Cryptocurrency to Simulate an Investment
        </Typography>

        <TextField
          label="Search For a Crypto Currency..." 
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {
            loading? (
              <LinearProgress  style={{ backgroundColor: "gold" }}/>
            ) : (
              <Table>
                <TableHead style={{ 
                    backgroundColor: "var(--yellow)", 
                  }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Poppins",
                        }}
                        key={head}
                        align={head === "Coin" ? "inherit" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch()
                    .slice((page - 1)* 5, (page - 1) * 5 + 5)
                    .map((coin) => {
                    const profit = coin.price_change_percentage_24h;

                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${coin.id}`)}
                        className={classes.row}
                        key={coin.name}
                      >
                        <TableCell 
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={coin?.image}
                            alt={coin.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              { coin.symbol }
                            </span>
                            <span style={{ color: "darkgrey" }}>{ coin.name }</span>
                          </div>                        
                        </TableCell>
                        <TableCell align="right"> 
                          { symbol } { " " }
                          { numberWithCommas(coin.current_price.toFixed(2)) }
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "var(--green)" : "var(--red)",
                            fontWeight: 500,
                          }}
                        >
                          { profit > 0 ? "+" : "" }
                          { coin.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          { symbol }{ " " }
                          { numberWithCommas(coin.market_cap.toString().slice(0, -6)) } M
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
        </TableContainer>              
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          count={Number((handleSearch()?.length/10).toFixed(0))}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        /> 
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;