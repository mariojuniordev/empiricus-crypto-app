import { 
  AppBar,
  Container,
  MenuItem,
  Toolbar,
  Typography,
  Select, 
  makeStyles
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Poppins",
    fontWeight: "bold",
    cursor: "pointer",
  }
}))

const Header = () => {

  const classes = useStyles()

  const navigate = useNavigate();

  return (
    <AppBar color='transparent'position='static'>
      <Container>
        <Toolbar>
          <Typography
            onClick={() => navigate('/')} 
            className={classes.title} 
          >
            Real Valor Crypto Currencies
          </Typography>

          <Select 
          variant="outlined" 
          style={{
            width: 100,
            height: 40,
            marginLeft: 15,
          }}>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"BRL"}>BRL</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;