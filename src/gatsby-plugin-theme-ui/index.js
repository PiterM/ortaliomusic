import merge from "lodash.merge";
import typography from "./typography";
import styles from "./styles";

export default merge(typography, {
  colors: {
    text: "rgb(0,0,0,0.75)",
    background: "#F0F5F6",
    cartButton: 'orange',
    cartQuantity: 'red',
    neutral: '#dadada'
  },
  fonts: {
    heading: "Work Sans, serif",
    body: "Quattrocento Sans, sans-serif"
  },
  fontWeights: {
    body: 400,
    heading: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  styles
});
