import React, { memo, useState } from "react";

import { SwipeableDrawer, Fab, Zoom } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { CardGiftcardRounded as GiftIcon } from "@material-ui/icons";

const Component = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: 200,
      padding: 30,
    },
  }));

  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <>
      <Zoom
        in={true}
        timeout={transitionDuration}
        unmountOnExit
        style={{
          transitionDelay: `${true ? transitionDuration.exit : 0}ms`,
        }}
      >
        <Fab
          // size="medium"
          style={{
            backgroundColor: theme.palette.fab,
            position: "absolute",
            zIndex: 20,
            top: 150,
            right: 30,
          }}
          onClick={() => {
            setOpen(open ? false : true);
          }}
        >
          {/* {!online || sendingMessage ? (
          <CircularProgress
            size={18}
            style={{ color: theme.palette.text.primary }}
          />
        ) : (
          <SendIcon />
        )} */}
          <GiftIcon style={{ color: "#fff" }} />
        </Fab>
      </Zoom>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div className={classes.root}>{props.userId}</div>
      </SwipeableDrawer>
    </>
  );
};

export default memo(Component);
