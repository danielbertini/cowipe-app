import React, { memo, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { DialogActions, DialogContent } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { RefreshRounded as RefreshIcon } from "@material-ui/icons";
import { useSnackbar } from "notistack";

import api from "../../../services/api";
import Info from "../../atoms/display/info";
import CircularProgress from "../../atoms/feedback/circularProgress";
import LinearProgress from "../../atoms/feedback/linearProgress";
import AvatarGift from "../../molecules/avatars/gift";
import MoleculesSearchSearchBar from "../../molecules/search/searchBar";
import IconButton from "../../atoms/inputs/iconButton";

const OrganismsGiftsReceived = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);

  const getData = useCallback(() => {
    api({
      method: "POST",
      url: `gifts/getReceived`,
      data: { skip: skip, limit: limit },
    })
      .then((response) => {
        if (response.data.success) {
          setLoading(false);
          setRefreshing(false);
          setData(response?.data?.result);
          setTotal(response?.data?.result?.length);
        } else {
          if (response.data.message) {
            enqueueSnackbar(response.data.message, { variant: "error" });
            setLoading(false);
            setRefreshing(false);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        setRefreshing(false);
        enqueueSnackbar(t("alerts.unavailableService"), { variant: "error" });
      });
  }, [enqueueSnackbar, limit, skip, t]);

  useEffect(() => {
    getData();
  }, [getData]);

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <DialogContent>
            <LinearProgress />
          </DialogContent>
        </>
      );
    } else {
      if (data.length > 0) {
        return (
          <>
            <DialogContent style={{ padding: 0 }}>
              {data?.map((el) => {
                return (
                  <AvatarGift
                    gift={el.gift[0]}
                    user={el.user[0]}
                    action="received"
                  />
                );
              })}
            </DialogContent>
          </>
        );
      } else {
        return (
          <>
            <DialogContent>
              <Info text={t("alerts.noGiftsReceived")} />
            </DialogContent>
          </>
        );
      }
    }
  };

  const renderComponent = () => {
    return (
      <>
        {renderContent()}
        <DialogActions
          style={{
            display: "flex",
            flexDirection: "columns",
            justifyContent: "space-between",
          }}
        >
          <div>
            <IconButton
              disabled={refreshing}
              onClick={() => {
                setRefreshing(true);
                setSkip(0);
                setLimit(limit);
                getData();
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
          <div>
            <MoleculesSearchSearchBar
              skip={skip}
              limit={limit}
              setSkip={setSkip}
              setLimit={setLimit}
              total={total}
              results={data}
              divider={false}
              padding={false}
              align={"flex-end"}
            />
          </div>
        </DialogActions>
      </>
    );
  };

  return props.display ? renderComponent() : <></>;
};

export default memo(OrganismsGiftsReceived);
