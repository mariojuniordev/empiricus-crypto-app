import { 
  AppBar,
  Container,
  MenuItem,
  Toolbar,
  Typography,
  Select, 
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "var(--yellow)",
    fontFamily: "Poppins",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: 'left'
  }
}))

const Header = () => {
  const classes = useStyles()
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();

  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent'position='static'>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate('/')} 
              className={classes.title} 
              variant='h6'
            >
              RV Crypto App
            </Typography>
            <h3 style={{textAlign: 'right'}}>Reference Currency:</h3>
            <Select 
              variant="outlined" 
              style={{
                width: 100,
                height: 40,
                margin: 10,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value as string)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"BRL"}>BRL</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;