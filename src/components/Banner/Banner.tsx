import { makeStyles, Typography, Container } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(/images/blue-sky.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  },
}))

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Poppins"
            }}
          >
            RV Crypto App
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              fontWeight: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Poppins"
            }}
          >
            Access all the information regarding Crypto Currencies on the world
          </Typography>
        </div>
      </Container>      
    </div>
  );
}

export default Banner;