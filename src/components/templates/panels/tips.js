import React, { memo, useEffect, useState, useCallback } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import {
  Divider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import {
  EmojiObjectsRounded as TipsIcon,
  ExpandLessRounded as ExpandLess,
  ExpandMoreRounded as ExpandMore,
  CheckCircleRounded as CheckIcon,
  RefreshRounded as RefreshIcon,
} from "@material-ui/icons";

import api from "../../../services/api";
import Icon from "../../atoms/display/icon";
import Info from "../../atoms/display/info";
import IconButton from "../../atoms/inputs/iconButton";
import CircularProgress from "../../atoms/feedback/circularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflow: "hidden",
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.background.panel,
  },
  header: {
    width: "100%",
    padding: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    width: "100%",
    padding: 15,
  },
}));

const TemplatesPanelsTips = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tips, setTips] = useState([]);
  const [expandedMenu, setExpandedMenu] = useState(0);

  const handleCollapseMenu = (index) => {
    setExpandedMenu({
      [index]: expandedMenu[index] === true ? false : true,
    });
  };

  const requestTips = useCallback(() => {
    setRefreshing(true);
    api({ method: "GET", url: `/user/tips` }).then((response) => {
      setLoading(false);
      setRefreshing(false);
      if (response.data.success) {
        setTips(response.data.result);
      }
    });
  }, []);

  useEffect(() => {
    requestTips();
  }, [requestTips]);

  const renderContent = () => {
    if (!loading) {
      if (tips.alreadyWin) {
        return <></>;
      } else {
        return (
          <>
            <div className={classes.root}>
              <div className={classes.header}>
                <Icon title={t("panels.tips.title")}>
                  <TipsIcon />
                </Icon>
                <IconButton disabled={refreshing} onClick={() => requestTips()}>
                  {refreshing ? (
                    <CircularProgress
                      size={18}
                      style={{ color: theme.palette.text.primary }}
                    />
                  ) : (
                    <RefreshIcon />
                  )}
                </IconButton>
              </div>
              <Divider />
              <div className={classes.content}>
                <List component="nav" disablePadding={true}>
                  <ListItem button onClick={() => handleCollapseMenu(0)}>
                    <ListItemIcon>
                      <CheckIcon
                        style={{
                          color: tips?.item1 && theme.palette.status[0],
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={t("panels.tips.tip.1.title")} />
                    {expandedMenu[0] ? (
                      <ExpandLess style={{ opacity: 0.25 }} />
                    ) : (
                      <ExpandMore style={{ opacity: 0.25 }} />
                    )}
                  </ListItem>
                  <Collapse in={expandedMenu[0]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding={true}>
                      <ListItem>
                        <Typography
                          variant="subtitle2"
                          style={{ marginLeft: 40 }}
                        >
                          {t("panels.tips.tip.1.description")}
                        </Typography>
                      </ListItem>
                    </List>
                  </Collapse>
                  <Divider />
                  <ListItem button onClick={() => handleCollapseMenu(1)}>
                    <ListItemIcon>
                      <CheckIcon
                        style={{
                          color: tips?.item2 && theme.palette.status[0],
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={t("panels.tips.tip.2.title")} />
                    {expandedMenu[1] ? (
                      <ExpandLess style={{ opacity: 0.25 }} />
                    ) : (
                      <ExpandMore style={{ opacity: 0.25 }} />
                    )}
                  </ListItem>
                  <Collapse in={expandedMenu[1]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding={true}>
                      <ListItem>
                        <Typography
                          variant="subtitle2"
                          style={{ marginLeft: 40 }}
                        >
                          {t("panels.tips.tip.2.description")}
                        </Typography>
                      </ListItem>
                    </List>
                  </Collapse>
                  <Divider />
                  <ListItem button onClick={() => handleCollapseMenu(2)}>
                    <ListItemIcon>
                      <CheckIcon
                        style={{
                          color: tips?.item3 && theme.palette.status[0],
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={t("panels.tips.tip.3.title")} />
                    {expandedMenu[2] ? (
                      <ExpandLess style={{ opacity: 0.25 }} />
                    ) : (
                      <ExpandMore style={{ opacity: 0.25 }} />
                    )}
                  </ListItem>
                  <Collapse in={expandedMenu[2]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding={true}>
                      <ListItem>
                        <Typography
                          variant="subtitle2"
                          style={{ marginLeft: 40 }}
                        >
                          {t("panels.tips.tip.3.description")}
                        </Typography>
                      </ListItem>
                    </List>
                  </Collapse>
                  <Divider />
                  <ListItem button onClick={() => handleCollapseMenu(3)}>
                    <ListItemIcon>
                      <CheckIcon
                        style={{
                          color: tips?.item4 && theme.palette.status[0],
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={t("panels.tips.tip.4.title")} />
                    {expandedMenu[3] ? (
                      <ExpandLess style={{ opacity: 0.25 }} />
                    ) : (
                      <ExpandMore style={{ opacity: 0.25 }} />
                    )}
                  </ListItem>
                  <Collapse in={expandedMenu[3]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding={true}>
                      <ListItem>
                        <Typography
                          variant="subtitle2"
                          style={{ marginLeft: 40 }}
                        >
                          {t("panels.tips.tip.4.description")}
                        </Typography>
                      </ListItem>
                    </List>
                  </Collapse>
                  <Divider />
                  <ListItem button onClick={() => handleCollapseMenu(4)}>
                    <ListItemIcon>
                      <CheckIcon
                        style={{
                          color: tips?.item5 && theme.palette.status[0],
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={t("panels.tips.tip.5.title")} />
                    {expandedMenu[4] ? (
                      <ExpandLess style={{ opacity: 0.25 }} />
                    ) : (
                      <ExpandMore style={{ opacity: 0.25 }} />
                    )}
                  </ListItem>
                  <Collapse in={expandedMenu[4]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding={true}>
                      <ListItem>
                        <Typography
                          variant="subtitle2"
                          style={{ marginLeft: 40 }}
                        >
                          {t("panels.tips.tip.5.description")}
                        </Typography>
                      </ListItem>
                    </List>
                  </Collapse>
                  <Divider />
                </List>
                <div style={{ height: 16 }} />
                <Info text={t("panels.tips.emptyMessage")} />
              </div>
            </div>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  return renderContent();
};

export default memo(TemplatesPanelsTips);
