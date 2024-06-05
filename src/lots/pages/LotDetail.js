import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  useGetLotByIdQuery,
  useGetLotBidsQuery,
  useBuyLotNowMutation,
} from "../../api/lotApi";
import { useCreateBidMutation } from "../../api/bidApi";
import {
  useAddToWatchlistMutation,
  useCheckWatchlistExistQuery,
} from "../../api/watchlistApi";

import { useAuth } from "../../shared/hooks/useAuth";

import { Grid, Container, Box, Skeleton } from "@mui/material";
import { red, grey, orange } from "@mui/material/colors";

import Breadcrumbs from "../../shared/components/UIElements/Breadcrumbs";
import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";

import LotImages from "../components/LotImages";
import LotInfo from "../components/LotInfo";
import LotDescription from "../components/LotDescription";

import BidDialog from "../components/BidDialog";
import BidHistoryDialog from "../components/BidHistoryDialog";

import { useCreateCheckoutSessionMutation } from "../../api/paymentApi";

const LotDetail = () => {
  const { id } = useParams();
  const {
    data: lot,
    isFetching: isFetchingLot,
    error: errorLot,
    refetch: refetchLot,
  } = useGetLotByIdQuery(id);
  const {
    data: bidsData,
    error: errorBids,
    refetch: refetchBids,
  } = useGetLotBidsQuery(id);
  const [createBid, { isLoading: isCreatingBid }] = useCreateBidMutation();
  const [addToWatchlist, { isLoading: isLoadingWatchlist }] =
    useAddToWatchlistMutation();
  const [buyLotNow, { isLoading: isBuyLotNow }] = useBuyLotNowMutation();
  const { data: checkWatchlistExist, refetch: refetchWatchlist } =
    useCheckWatchlistExistQuery(id);

  const [createCheckoutSession, { isLoading, error }] =
    useCreateCheckoutSessionMutation();

  const { user } = useAuth();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [timeLeftColor, setTimeLeftColor] = useState(grey[700]);

  const [showBids, setShowBids] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [isLotEnded, setIsLotEnded] = useState(false);

  useEffect(() => {
    if (lot && lot.endDate) {
      const endDate = new Date(lot.endDate);
      const now = new Date();
      setIsLotEnded(endDate <= now || lot.status === "CLOSED");
    }
  }, [lot]);

  useEffect(() => {
    if (errorLot || errorBids) {
      setErrorMessage(
        errorLot?.data?.message ||
          errorBids?.data?.message ||
          "Виникла помилка. Будь ласка, спробуйте ще раз."
      );
      setOpenErrorAlert(true);
    }
  }, [errorLot, errorBids]);

  useEffect(() => {
    let newIntervalId;

    if (lot && lot.endDate) {
      const newIntervalId = setInterval(() => {
        const endDate = new Date(lot.endDate);
        const now = new Date();
        const difference = endDate - now;

        if (difference <= 0 || lot.status === "CLOSED") {
          setTimeLeft("Лот завершено.");
          setTimeLeftColor(red[500]);
          handleCloseLot();
          clearInterval(newIntervalId);
        } else {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
          setTimeLeft(`${days}д ${hours}год. ${minutes}хв. ${seconds}с.`);

          if (days < 1) {
            setTimeLeftColor(orange[500]);
          }

          if (days === 0 && hours < 1) {
            setTimeLeftColor(red[500]);
          }
        }
      }, 1000);
    }

    return () => clearInterval(newIntervalId);
  }, [lot]);

  if (isFetchingLot) {
    return (
      <Container sx={{ mt: "8%" }}>
        <Skeleton variant="rectangular" width="100%" height="700px" />
      </Container>
    );
  }

  const handleToggleBids = () => {
    setShowBids(!showBids);
  };

  const handleToggleBidModal = () => {
    setShowBidModal(!showBidModal);
  };

  const handlePlaceBid = async (bidAmount) => {
    try {
      const response = await createBid({
        amount: bidAmount,
        lotId: id,
      }).unwrap();
      refetchLot();
      refetchBids();
      setShowBidModal(false);
      setOpenSuccessAlert(true);
      setSuccessMessage(response.message);
    } catch (error) {
      setOpenErrorAlert(true);
      setErrorMessage(
        error?.data?.message || "Виникла помилка. Будь ласка, спробуйте ще раз."
      );
    }
  };

  const handleCloseLot = async () => {
    if (!id || !lot || lot.endDate <= new Date()) {
      console.error("Пропущено ідентифікатор лоту або лот вже закритий.");
      return;
    }

    try {
      if (lot.status !== "CLOSED") {
        setSuccessMessage(
          "Лот завершився. Листи з результатами розіслані на вашу поштову скриньку. Будь ласка, перевірте свою електронну пошту для отримання додаткової інформації."
        );
        setOpenSuccessAlert(true);
        refetchLot();
      }
    } catch (error) {
      setOpenErrorAlert(true);
      setErrorMessage(
        error?.data?.message || "Виникла помилка при закритті лоту."
      );
    }
  };

  const handleBuyNowClick = async () => {
    try {
      const response = await buyLotNow({ lotId: id }).unwrap();
      if (response.redirectUrl) {
        window.location.href = response.redirectUrl;
      }
      // await createCheckoutSession({lotId: id}).unwrap();
      refetchLot();
    } catch (error) {
      setOpenErrorAlert(true);
      setErrorMessage(
        error?.data?.message ||
          "Не вдалося здійснити купівлю. Будь ласка, спробуйте пізніше."
      );
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist({ userId: user.id, lotId: id }).unwrap();
      refetchWatchlist();
    } catch (error) {
      console.log(error);
      setOpenErrorAlert(true);
      setErrorMessage(
        error?.data?.message || "Виникла помилка. Будь ласка, спробуйте ще раз."
      );
    }
  };

  return (
    <Container
      sx={{
        py: { xs: 8, sm: 16 },
      }}
    >
      <MessageSnackbar
        open={openErrorAlert}
        onClose={() => setOpenErrorAlert(false)}
        severity="error"
        message={
          errorMessage || "Виникла помилка. Будь ласка, спробуйте ще раз."
        }
      />
      <MessageSnackbar
        open={openSuccessAlert}
        onClose={() => setOpenSuccessAlert(false)}
        severity="success"
        message={successMessage}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mt: 5 }}>
            <Breadcrumbs
              links={[
                { label: "Bid&Win", url: "/" },
                { label: "Лоти", url: "/lots" },
                { label: lot?.title, url: `/lots/${id}` },
              ]}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <LotImages images={lot.imageUrls} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LotInfo
            lot={lot}
            timeLeftColor={timeLeftColor}
            timeLeft={timeLeft}
            handleToggleBids={handleToggleBids}
            isLotEnded={isLotEnded}
            handleToggleBidModal={handleToggleBidModal}
            handleBuyNowClick={handleBuyNowClick}
            checkWatchlistExist={checkWatchlistExist}
            isLoadingWatchlist={isLoadingWatchlist}
            handleAddToWatchlist={handleAddToWatchlist}
            isBuyLotNow={isBuyLotNow}
          />
        </Grid>
        <Grid item xs={12}>
          <LotDescription lot={lot} />
        </Grid>
      </Grid>
      <BidHistoryDialog
        lot={lot}
        showBids={showBids}
        handleToggleBids={handleToggleBids}
        bidsData={bidsData}
      />
      <BidDialog
        lot={lot}
        showBidModal={showBidModal}
        handleToggleBidModal={handleToggleBidModal}
        isCreatingBid={isCreatingBid}
        handlePlaceBid={handlePlaceBid}
      />
    </Container>
  );
};

export default LotDetail;
