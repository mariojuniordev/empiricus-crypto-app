import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = () => {

  const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15,
      paddingTop: 10,
    },
    link: {
      margin: 10,
      "&:hover": {
        color: "var(--hover-black)",
        transition: "0.5s",
      },
    },
  }));

  const classes = useStyles();

  return (
    <footer className={classes.container}>
      <h3>Developed by Mário Júnior. Reach me on my social Media!</h3>
      <div>
        <Link href="https://www.linkedin.com/in/mariojuniordev/">
          <GitHubIcon fontSize="large" className={classes.link}/>
        </Link>
        <Link href="https://github.com/mariojuniordev">
          <LinkedInIcon fontSize="large" className={classes.link}/>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;