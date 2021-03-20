import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import Button from "../inputs/button";
import Typography from "../display/typography";

const TransitionComponent = (props) => (
  <Slide direction="up" mountOnEnter unmountOnExit {...props} />
);

const Component = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        TransitionComponent={TransitionComponent}
        open={props.open}
        onClose={() => props.handleClose(false)}
      >
        <DialogTitle style={{ paddingLeft: 30, paddingTop: 25 }}>
          {props.title}
        </DialogTitle>
        <DialogContent
          style={{ backgroundColor: theme.palette.primary.main, paddingTop: 0 }}
        >
          <Typography variant="body1">{props.text}</Typography>
        </DialogContent>
        <DialogActions style={{ backgroundColor: theme.palette.primary.main }}>
          <Button onClick={() => props.handleClose(false)} color="secondary">
            {t("buttons.no")}
          </Button>
          <Button
            onClick={() => {
              props.handleClose(false);
              props.handleAgree();
            }}
            color="secondary"
            variant="contained"
            autoFocus
          >
            {t("buttons.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(Component);
