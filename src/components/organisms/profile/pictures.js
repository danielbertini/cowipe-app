import React, { memo, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  CardActionArea,
  Grid,
  DialogActions,
  DialogContent,
  Switch,
} from "@material-ui/core";
import { v4 as uuid } from "uuid";

import api from "../../../services/api";

import Info from "../../atoms/display/info";
import Typography from "../../atoms/display/typography";
import Picture from "../../atoms/display/picture";
import GiftButton from "../../atoms/inputs/giftButton";
import Gallery from "../../organisms/pictures/gallery";
import ConnectButton from "./connectButton";
import ActionButton from "./actionButton";
import LinearProgress from "../../atoms/feedback/linearProgress";
import MoleculesSearchSearchBar from "../../molecules/search/searchBar";

const OrganismsProfilePictures = (props) => {
  const { t } = useTranslation();

  const [pictures, setPictures] = useState([]);
  const [restrictedPictures, setRestrictedPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [pictureSelected, setPictureSelected] = useState();
  const [connection, setConnection] = useState();
  const [showRestrictedPictures, setShowRestrictedPictures] = useState(false);
  const [restrictedsCount, setRestrictedsCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(16);
  const [total, setTotal] = useState(0);
  const [totalRestricted, setTotalRestricted] = useState(0);

  const getPictures = useCallback(() => {
    api({
      method: "GET",
      url: `user/pictures/${props.userId}/${skip}/${limit}`,
    }).then((response) => {
      if (response.data.success) {
        setLoading(false);
        setPictures(response.data.result);
        setTotal(response?.data?.result?.length);
      }
    });
  }, [limit, props.userId, skip]);

  const getRestrictedPictures = useCallback(() => {
    if (connection === 4) {
      api({
        method: "GET",
        url: `user/restrictedPictures/${props.userId}/${skip}/${limit}`,
      }).then((response) => {
        if (response.data.success) {
          setRestrictedPictures(response.data.result);
          setTotalRestricted(response?.data?.result?.length);
        }
      });
    } else {
      api({
        method: "POST",
        url: `pictures/restrictedsCount`,
        data: {
          id: props.userId,
        },
      }).then((response) => {
        if (response.data.success) {
          setRestrictedsCount(response.data.result);
        }
      });
    }
  }, [connection, limit, props.userId, skip]);

  const renderPictures = useCallback(() => {
    if (pictures?.length > 0) {
      return pictures.map((el) => {
        return (
          <>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={6} key={uuid()}>
              <CardActionArea
                onClick={() => {
                  setPictureSelected(el.filename);
                  setGalleryOpen(true);
                }}
              >
                <Picture
                  src={`${process.env.REACT_APP_CDN}/pictures/${el._user}/${el.filename}-small`}
                  width={`100%`}
                  height={120}
                  radius
                />
              </CardActionArea>
            </Grid>
          </>
        );
      });
    } else {
      return (
        <>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Info text={t("alerts.emptyProfileGallery")} />
          </Grid>
        </>
      );
    }
  }, [pictures, t]);

  const renderRestrictedPictures = useCallback(() => {
    if (restrictedPictures?.length > 0) {
      return restrictedPictures.map((el) => {
        return (
          <Grid item xl={3} lg={3} md={3} sm={6} xs={6} key={uuid()}>
            <CardActionArea
              onClick={() => {
                setPictureSelected(el.filename);
                setGalleryOpen(true);
              }}
            >
              <Picture
                src={`${process.env.REACT_APP_CDN}/pictures/${el._user}/${el.filename}-small`}
                width={`100%`}
                height={120}
                radius
              />
            </CardActionArea>
          </Grid>
        );
      });
    } else {
      if (connection === 4) {
        return (
          <>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Info text={t("alerts.emptyProfileGalleryRestricted")} />
            </Grid>
          </>
        );
      } else {
        return (
          <>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Info text={t("alerts.justAfterConnecting")} />
            </Grid>
          </>
        );
      }
    }
  }, [connection, restrictedPictures, t]);

  useEffect(() => {
    setConnection(props.connection);
  }, [props.connection]);

  useEffect(() => {
    getPictures();
  }, [getPictures]);

  useEffect(() => {
    getRestrictedPictures();
  }, [getRestrictedPictures]);

  const renderComponent = () => {
    if (loading || !connection) {
      return (
        <>
          <DialogContent>
            <LinearProgress />
          </DialogContent>
        </>
      );
    } else {
      return (
        <>
          <DialogContent>
            {!connection ||
              (connection !== 4 && restrictedsCount > 0 && (
                <>
                  <Info
                    text={`${restrictedsCount} ${t(
                      "alerts.restrictedPicturesCountInfo"
                    )}`}
                  />
                  <div style={{ height: 15 }} />
                </>
              ))}
            <Grid container direction="row" spacing={2}>
              {showRestrictedPictures && connection === 4
                ? renderRestrictedPictures()
                : renderPictures()}
            </Grid>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              flexDirection: "columns",
              justifyContent: "space-between",
            }}
          >
            <div>
              {connection && (
                <ActionButton
                  userId={props.userId}
                  connection={connection}
                  connectionUpdate={(value) => {
                    props.connectionUpdate(value);
                    setConnection(value);
                  }}
                />
              )}
            </div>
            <GiftButton />
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {connection && connection === 4 && (
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography variant="body1">
                      {t("commons.showRestricted")}
                    </Typography>
                    <Switch
                      name="sounds"
                      color="secondary"
                      onChange={(e) => {
                        setLimit(limit);
                        setSkip(0);
                        setShowRestrictedPictures(e.target.checked);
                      }}
                      checked={showRestrictedPictures}
                    />
                  </div>
                  <div>
                    <MoleculesSearchSearchBar
                      skip={skip}
                      limit={limit}
                      setSkip={setSkip}
                      setLimit={setLimit}
                      total={showRestrictedPictures ? totalRestricted : total}
                      results={
                        showRestrictedPictures ? restrictedPictures : pictures
                      }
                      divider={false}
                      padding={false}
                      align={"flex-end"}
                    />
                  </div>
                </>
              )}
              {connection && connection !== 4 && (
                <ConnectButton
                  userId={props.userId}
                  connection={connection}
                  roomUpdate={(value) => {
                    props.roomUpdate(value);
                  }}
                  connectionUpdate={(value) => {
                    props.connectionUpdate(value);
                    setConnection(value);
                  }}
                />
              )}
            </div>
          </DialogActions>
          {galleryOpen && (
            <Gallery
              close={setGalleryOpen}
              pictures={showRestrictedPictures ? restrictedPictures : pictures}
              userId={props.userId}
              filename={pictureSelected}
            />
          )}
        </>
      );
    }
  };

  return props.display ? renderComponent() : <></>;
};

export default memo(OrganismsProfilePictures);
