import React, { memo, useState } from "react";

import { SwipeableDrawer, Fab, Grow } from "@material-ui/core";
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

  return (
    <>
      <Grow in={true}>
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
      </Grow>
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
