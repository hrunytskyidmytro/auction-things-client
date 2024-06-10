import React, { useState, useEffect } from "react";
import { Grid, Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetLotsByCategoryQuery } from "../../api/categoryApi";

import Breadcrumbs from "../../shared/components/UIElements/Breadcrumbs";
import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";

import FilterPanel from "../components/FilterPanel";
import LotList from "../components/LotList";
import PaginationSection from "../../shared/components/UIElements/PaginationSection";
import SearchAndSortPanel from "../components/SearchAndSortPanel";
import LotsSkeleton from "../components/LotsSkeleton";

const LotsPageByCategory = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [currentPriceRange, setCurrentPriceRange] = useState([0, 2000]);
  const [buyNowPriceRange, setBuyNowPriceRange] = useState([0, 2000]);
  const [dateOption, setDateOption] = useState("all");
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [search, setSearch] = useState("");
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const {
    data: { lots: lotsData, totalPages } = {},
    error,
    isLoading,
  } = useGetLotsByCategoryQuery({
    categoryId: id,
    page,
    sortBy,
    currentPriceFrom: currentPriceRange[0],
    currentPriceTo: currentPriceRange[1],
    buyNowPriceFrom: buyNowPriceRange[0],
    buyNowPriceTo: buyNowPriceRange[1],
    dateOption,
    status: selectedStatuses,
    search,
  });

  useEffect(() => {
    if (error) {
      setOpenErrorAlert(true);
    }
  }, [error]);

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

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatuses((prevStatuses) =>
      prevStatuses.includes(status)
        ? prevStatuses.filter((s) => s !== status)
        : [...prevStatuses, status]
    );
  };

  if (isLoading) {
    return <LotsSkeleton />;
  }

  return (
    <Container
      id="lots_by_category"
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
                ]}
              />
            </Box>
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
              selectedStatuses={selectedStatuses}
              handleStatusChange={handleStatusChange}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <LotList lotsData={lotsData} />
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
          error?.data?.message ||
          "Виникла помилка. Будь ласка, спробуйте ще раз."
        }
      />
    </Container>
  );
};

export default LotsPageByCategory;
