import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  card_main: {
    background: "white",
    display: "inline-block",
    padding: "20px 0 10px 10px",
    margin: 30,
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    minWidth: 240,
  },
  name: {
    marginBottom: 20,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 500,
    color: "#333",
  },
  d: {
    display: "flex",
    alignItems: "center",
    color: "darkblue",
  },
  d1: {
    paddingTop: 10,
    fontSize: 40,
    fontWeight: 700,
  },
  d2: {
    paddingTop: 30,
    fontSize: 20,
    fontWeight: 600,
    marginLeft: 4,
  },
  img: {
    marginLeft: 30,
    width: 120,
    height: 100,
    objectFit: "cover",
    borderRadius: 6,
  },
});

export const MainCard = ({ title, value, total, image, alt }) => {
  const classes = useStyles();

  return (
    <div className={classes.card_main}>
      <div className={classes.name}>{title}</div>
      <div className={classes.d}>
        <span className={classes.d1}>{value}</span>
        <span className={classes.d2}>/{total}</span>
        <img src={image} className={classes.img} alt={alt || title || "card image"} />
      </div>
    </div>
  );
};
