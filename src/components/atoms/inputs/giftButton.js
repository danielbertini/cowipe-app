import React, { memo } from "react";

import { CardGiftcardRounded as GiftIcon } from "@material-ui/icons";

import IconButton from "./iconButton";

const Component = (props) => {
  return (
    <>
      <IconButton
      // onClick={() => {
      // }}
      >
        {/* {!online || sendingMessage ? (
          <CircularProgress
            size={18}
            style={{ color: theme.palette.text.primary }}
          />
        ) : (
          <SendIcon />
        )} */}
        <GiftIcon />
      </IconButton>
    </>
  );
};

export default memo(Component);
