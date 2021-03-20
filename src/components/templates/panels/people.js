import React, {
  memo,
  useEffect,
  useContext,
  useState,
  useCallback,
} from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Divider, Grid } from "@material-ui/core";
import jwtDecode from "jwt-decode";
import { v4 as uuid } from "uuid";
import {
  TuneRounded as TuneIcon,
  PeopleRounded as HeaderIcon,
  RefreshRounded as RefreshIcon,
} from "@material-ui/icons";

import api from "../../../services/api";
import StoreContext from "../../../context/Context";
import Icon from "../../atoms/display/icon";
import LinearProgress from "../../atoms/feedback/linearProgress";
import Thumbnail from "../../molecules/user/thumbnail";
import ThumbnailBlocked from "../../molecules/user/thumbnailBlocked";
import ThumbnailWaiting from "../../molecules/user/thumbnailWaiting";
import CircularProgress from "../../atoms/feedback/circularProgress";
import IconButton from "../../atoms/inputs/iconButton";
import Info from "../../atoms/display/info";
import MoleculesSearchSearchBar from "../../molecules/search/searchBar";
import OrganismsFiltersPeoples from "../../organisms/filters/peoples";
import TemplatesDialogTuneSearch from "../dialogs/tuneSearch";

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
  }));

  const theme = useTheme();
  const { t } = useTranslation();
  const { token } = useContext(StoreContext);
  const userId = jwtDecode(token);
  const classes = useStyles();
  const location = useSelector((state) => state.location);
  const [loading, setLoading] = useState(true);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState(1);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(24);
  const [total, setTotal] = useState(0);
  const [peoples, setPeoples] = useState([]);
  const [tuneDialog, setTuneDialog] = useState(false);

  const requestPeoples = useCallback(() => {
    setLoading(true);
    api({
      method: "POST",
      url: `/user/search`,
      data: {
        skip: skip,
        limit: limit,
        filter: filter,
        lat: location?.lat ? location.lat : null,
        lng: location?.lng ? location.lng : null,
      },
    })
      .then((response) => {
        if (response.data.success) {
          setPeoples(response.data.result);
          setTotal(response.data.result.length);
          setLoading(false);
          setLoadingFilter(false);
          setRefreshing(false);
        }
      })
      .catch((error) => {
        setRefreshing(false);
        setLoading(false);
      });
  }, [filter, limit, location?.lat, location?.lng, skip]);

  useEffect(() => {
    requestPeoples();
  }, [requestPeoples]);

  const renderPeoples = useCallback(() => {
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
      return (
        <>
          <Grid container direction="row" spacing={2}>
            {location.message && filter < 3 && (
              <>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Info text={location.message} />
                </Grid>
              </>
            )}
            {peoples?.length > 0 ? (
              peoples?.map((el) => {
                if (filter === 1 || filter === 2) {
                  return (
                    <Grid item xl={2} lg={2} md={3} sm={6} xs={6} key={uuid()}>
                      <Thumbnail data={el} />
                    </Grid>
                  );
                } else if (filter === 3 && el.user) {
                  return (
                    <Grid item xl={2} lg={2} md={3} sm={6} xs={6} key={uuid()}>
                      <Thumbnail
                        data={
                          el.user[0]._id === userId.id
                            ? el.targetUser[0]
                            : el.user[0]
                        }
                      />
                    </Grid>
                  );
                } else if (filter === 4 && el.user) {
                  return (
                    <Grid item xl={2} lg={2} md={3} sm={6} xs={6} key={uuid()}>
                      <ThumbnailWaiting
                        id={el._id}
                        data={
                          el.user[0]._id === userId.id
                            ? el.targetUser[0]
                            : el.user[0]
                        }
                      />
                    </Grid>
                  );
                } else if (filter === 5 && el.user) {
                  return (
                    <Grid item xl={2} lg={2} md={3} sm={6} xs={6} key={uuid()}>
                      <ThumbnailBlocked id={el._id} data={el.user[0]} />
                    </Grid>
                  );
                } else {
                  return <></>;
                }
              })
            ) : (
              <>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Info text={t("alerts.noPeopleFound")} />
                </Grid>
              </>
            )}
          </Grid>
        </>
      );
    }
  }, [filter, loading, location?.message, peoples, t, userId?.id]);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.header}>
          <Icon title={t("panels.people.title")}>
            <HeaderIcon />
          </Icon>
          <div style={{ display: "flex" }}>
            <IconButton
              disabled={filter > 2}
              onClick={() => {
                setTuneDialog(true);
              }}
            >
              <TuneIcon
                style={{
                  color:
                    filter > 2
                      ? theme.palette.divider
                      : theme.palette.text.primary,
                }}
              />
            </IconButton>
            <OrganismsFiltersPeoples
              loading={loadingFilter}
              filter={filter}
              setLoading={setLoadingFilter}
              setFilter={setFilter}
              setSkip={setSkip}
            />
            <IconButton
              disabled={refreshing}
              onClick={() => {
                setRefreshing(true);
                setSkip(0);
                requestPeoples();
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
        <div className={classes.content}>{renderPeoples()}</div>
        <MoleculesSearchSearchBar
          skip={skip}
          limit={limit}
          setSkip={setSkip}
          setLimit={setLimit}
          total={total}
          results={peoples}
          divider={true}
          padding={true}
          align={"flex-end"}
        />
        {tuneDialog && (
          <TemplatesDialogTuneSearch
            open={tuneDialog}
            handleClose={setTuneDialog}
            updateSearch={requestPeoples}
          />
        )}
      </div>
    </>
  );
};

export default memo(Component);
