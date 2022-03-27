import { makeStyles } from "@material-ui/styles";

const SelectButton = ({ children, selected, onClick }: any) => {
  const useStyles = makeStyles({
    selectButton: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Poppins",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
      margin: 20,
    },
  });

  const classes = useStyles();

  return (
    <span
      className={classes.selectButton}
      onClick={onClick}
    >{ children }</span>
  );
}

export default SelectButton;