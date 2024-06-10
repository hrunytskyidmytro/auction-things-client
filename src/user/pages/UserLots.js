import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useGetUserLotsQuery } from "../../api/lotApi";
import { useGetAllCategoriesQuery } from "../../api/categoryApi";
import { useAuth } from "../../shared/hooks/useAuth";

import Breadcrumbs from "../../shared/components/UIElements/Breadcrumbs";
import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import FilterPanel from "../../lots/components/FilterPanel";
import LotList from "../../lots/components/LotList";
import PaginationSection from "../../shared/components/UIElements/PaginationSection";
import SearchAndSortPanel from "../../lots/components/SearchAndSortPanel";
import LotsSkeleton from "../../lots/components/LotsSkeleton";

const UserLots = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [currentPriceRange, setCurrentPriceRange] = useState([0, 2000]);
  const [buyNowPriceRange, setBuyNowPriceRange] = useState([0, 2000]);
  const [dateOption, setDateOption] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [search, setSearch] = useState("");
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const {
    data: { lots: lotsData, totalPages } = {},
    isLoading: isGetUserLotsLoading,
    error: lotsError,
  } = useGetUserLotsQuery({
    userId: id,
    page,
    sortBy,
    currentPriceFrom: currentPriceRange[0],
    currentPriceTo: currentPriceRange[1],
    buyNowPriceFrom: buyNowPriceRange[0],
    buyNowPriceTo: buyNowPriceRange[1],
    dateOption,
    categoryId: selectedCategories,
    status: selectedStatuses,
    search,
  });

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (lotsError || categoriesError) {
      setOpenErrorAlert(true);
    }
  }, [lotsError, categoriesError]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeSort = (event) => {
    setSortBy(event.target.value);
  };

  const handleChangeCurrentPriceRange = (event, newValue) => {
    setCurrentPriceRange(newValue);
  };

  const handleChangeBuyNowPriceRange = (event, newValue) => {
    setBuyNowPriceRange(newValue);
  };

  const handleChangeDateOption = (event) => {
    setDateOption(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatuses((prevStatuses) =>
      prevStatuses.includes(status)
        ? prevStatuses.filter((s) => s !== status)
        : [...prevStatuses, status]
    );
  };

  if (isGetUserLotsLoading) {
    return <LotsSkeleton />;
  }

  if (isCategoriesLoading) {
    return <LoadingSpinner size={30} />;
  }

  const sellerName =
    lotsData && lotsData[0]?.creator
      ? `${lotsData[0].creator.firstName} ${lotsData[0].creator.lastName}`
      : "Користувач";

  const userSeller = lotsData && lotsData[0]?.creator?.id === user?.id;

  return (
    <Container
      id="seller_lots"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "100%" },
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Box sx={{ mt: 15 }}>
              <Breadcrumbs
                links={[
                  { label: "Bid&Win", url: "/" },
                  { label: "Лоти", url: "/lots" },
                  { label: sellerName },
                ]}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <Avatar
                  alt={sellerName}
                  sx={{ width: 80, height: 80, marginBottom: 2 }}
                />
                Лоти продавця:
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {sellerName}
                </Typography>
                {userSeller && (
                  <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      color="primary"
                    >
                      Додати лот
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <SearchAndSortPanel
              search={search}
              handleSearch={handleSearch}
              sortBy={sortBy}
              handleChangeSort={handleChangeSort}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FilterPanel
              currentPriceRange={currentPriceRange}
              handleChangeCurrentPriceRange={handleChangeCurrentPriceRange}
              buyNowPriceRange={buyNowPriceRange}
              handleChangeBuyNowPriceRange={handleChangeBuyNowPriceRange}
              dateOption={dateOption}
              handleChangeDateOption={handleChangeDateOption}
              categoriesData={categoriesData}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              selectedStatuses={selectedStatuses}
              handleStatusChange={handleStatusChange}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <LotList lotsData={lotsData} userSeller={userSeller} />
          </Grid>
          <Grid item xs={12}>
            <PaginationSection
              totalPages={totalPages}
              page={page}
              handleChangePage={handleChangePage}
            />
          </Grid>
        </Grid>
      </Box>
      <MessageSnackbar
        open={openErrorAlert}
        onClose={() => setOpenErrorAlert(false)}
        severity="error"
        message={
          lotsError?.data?.message ||
          categoriesError?.data?.message ||
          "Виникла помилка. Будь ласка, спробуйте ще раз."
        }
      />
    </Container>
  );
};

export default UserLots;
