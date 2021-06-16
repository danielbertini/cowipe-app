import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[12],
    overflow: "hidden",
    cursor: "pointer",
  },
}));

const OrganismsSwipeableCard = (props) => {
  const classes = useStyles();
  const [{ x, y, scale }, api] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))
  const bind = useDrag(
    ({ down, movement: [mx, my] }) => api.start({ x: down ? mx : 0, y: down ? my : 0, scale: down ? .8 : 1 }),
    { delay: 1000 }
  )

  return (
    <>
      <animated.div {...bind()} className={classes.root} style={{ x, y, scale }} />
    </>
  );
};

export default memo(OrganismsSwipeableCard);
