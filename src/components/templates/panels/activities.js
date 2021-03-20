import React, {
  memo,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import useSound from "use-sound";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Divider, Grid, Menu, MenuItem } from "@material-ui/core";
import {
  RefreshRounded as RefreshIcon,
  RecentActors as ActivitiesIcon,
  FilterListRounded as FilterIcon,
} from "@material-ui/icons";
import { v4 as uuid } from "uuid";

import i18n from "../../../i18n";
import api from "../../../services/api";
import SocketContext from "../../../context/SocketContext";
import activitySound from "../../../sounds/activity.mp3";
import Info from "../../atoms/display/info";
import Icon from "../../atoms/display/icon";
import IconButton from "../../atoms/inputs/iconButton";
import CircularProgress from "../../atoms/feedback/circularProgress";
import LinearProgress from "../../atoms/feedback/linearProgress";
import ConnectionAccepted from "../../molecules/activities/connectionAccepted";
import ConnectionRequest from "../../molecules/activities/connectionRequest";
import ViewedProfile from "../../molecules/activities/viewedProfile";
import MoleculesSearchSearchBar from "../../molecules/search/searchBar";

const Component = (props) => {
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
    search: {
      width: "100%",
      padding: 15,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }));

  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();

  const preferences = useSelector((state) => state.preferences);
  const [loading, setLoading] = useState(true);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activityType, setActivityType] = useState();
  const [activityTypes, setActivityTypes] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const { socket } = useContext(SocketContext);
  const [play] = useSound(activitySound);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickOptionsMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOptionsMenu = () => {
    setAnchorEl(null);
  };

  const requestActivities = useCallback(() => {
    api({
      method: "POST",
      url: `/user/activities`,
      data: {
        skip: skip,
        limit: limit,
        activityType: activityType,
      },
    }).then((response) => {
      if (response.data.success) {
        setActivities(response.data.result);
        setTotal(response.data.result.length);
        setLoading(false);
        setRefreshing(false);
        setLoadingFilter(false);
      }
    });
  }, [activityType, limit, skip]);

  const requestActivityTypes = useCallback(() => {
    api({ method: "GET", url: `/commons/getActivityTypes` }).then(
      (response) => {
        if (response.data.success) {
          setActivityTypes(response.data.result);
        }
      }
    );
  }, []);

  useEffect(() => {
    socket.on("activity", (data) => {
      preferences?.sound && play();
      setRefreshing(true);
      requestActivities();
    });
  }, [play, preferences?.sound, requestActivities, socket]);

  useEffect(() => {
    requestActivityTypes();
    requestActivities();
  }, [requestActivities, requestActivityTypes]);

  const renderActivityItem = (activity) => {
    switch (activity.type?.[0]?._id) {
      case "6025b7401ee8df2c772d0da7":
        return <ViewedProfile data={activity} />;
      case "602abccb6bbe06fa92010b7d":
        return <ConnectionRequest data={activity} />;
      case "602ae2a76bbe06fa92010b7e":
        return <ConnectionAccepted data={activity} />;
      default:
        return <></>;
    }
  };

  const renderActivities = () => {
    if (loading) {
      return (
        <>
          <Grid container direction="row" spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <LinearProgress />
            </Grid>
          </Grid>
        </>
      );
    } else {
      if (activities.length > 0) {
        return (
          <>
            <Grid container direction="column" spacing={2}>
              {activities.map((el) => {
                return (
                  <>
                    <Grid
                      item
                      xl={12}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      key={uuid()}
                    >
                      {renderActivityItem(el)}
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </>
        );
      } else {
        return (
          <>
            <Grid container direction="row" spacing={2}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Info text={t("panels.activities.emptyMessage")} />
              </Grid>
            </Grid>
          </>
        );
      }
    }
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.header}>
          <Icon title={t("panels.activities.title")}>
            <ActivitiesIcon />
          </Icon>
          <div style={{ display: "flex" }}>
            <IconButton disabled={refreshing} onClick={handleClickOptionsMenu}>
              {loadingFilter ? (
                <CircularProgress
                  size={18}
                  style={{ color: theme.palette.text.primary }}
                />
              ) : (
                <FilterIcon />
              )}
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleCloseOptionsMenu}
            >
              <MenuItem
                disabled={!activityType}
                onClick={() => {
                  handleCloseOptionsMenu();
                  setLoadingFilter(true);
                  setSkip(0);
                  setLimit(5);
                  setActivityType();
                }}
              >
                {t("commons.seeAll")}
              </MenuItem>
              {activityTypes?.map((el) => {
                return (
                  <MenuItem
                    disabled={activityType === el._id}
                    key={el._id}
                    onClick={() => {
                      handleCloseOptionsMenu();
                      setLoadingFilter(true);
                      setSkip(0);
                      setLimit(5);
                      setActivityType(el._id);
                    }}
                  >
                    {el.name[i18n.language]}
                  </MenuItem>
                );
              })}
            </Menu>
            <IconButton
              disabled={refreshing}
              onClick={() => {
                setRefreshing(true);
                setSkip(0);
                setLimit(5);
                requestActivities();
              }}
            >
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
        </div>
        <Divider />
        <div className={classes.content}>{renderActivities()}</div>
        <MoleculesSearchSearchBar
          skip={skip}
          limit={limit}
          setSkip={setSkip}
          setLimit={setLimit}
          total={total}
          results={activities}
          divider={true}
          padding={true}
          align={"flex-end"}
        />
      </div>
    </>
  );
};

export default memo(Component);
