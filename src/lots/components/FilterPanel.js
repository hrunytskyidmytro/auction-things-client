import React from "react";
import {
  FormControl,
  Typography,
  Slider,
  RadioGroup,
  Radio,
  FormGroup,
  Checkbox,
  Divider,
  Card,
  FormControlLabel,
  CardHeader,
  CardContent,
  Tooltip,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const FilterPanel = ({
  currentPriceRange,
  handleChangeCurrentPriceRange,
  buyNowPriceRange,
  handleChangeBuyNowPriceRange,
  dateOption,
  handleChangeDateOption,
  categoriesData,
  selectedCategories,
  handleCategoryChange,
  selectedStatuses,
  handleStatusChange,
}) => {
  return (
    <>
      <Card
        sx={{
          p: 2,
          borderRadius: 8,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardHeader title="Фільтри" />
        <CardContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Typography id="current-price-range-slider" gutterBottom>
              Діапазон поточної ціни
              <Tooltip
                title="Поточна ціна - це ціна, яка є поточною ставкою в лоті, тобто найвищою."
                arrow
              >
                <HelpOutlineIcon sx={{ ml: 1, fontSize: "1rem" }} />
              </Tooltip>
            </Typography>
            <Slider
              value={currentPriceRange}
              onChange={handleChangeCurrentPriceRange}
              valueLabelDisplay="auto"
              aria-labelledby="current-price-range-slider"
              getAriaValueText={(value) => `${value} грн`}
              min={0}
              max={1000}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Typography id="buy-now-price-range-slider" gutterBottom>
              Діапазон купівлі відразу
              <Tooltip
                title="Ціна купівлі відразу - це ціна, за яку можна придбати лот прямо зараз."
                arrow
              >
                <HelpOutlineIcon sx={{ ml: 1, fontSize: "1rem" }} />
              </Tooltip>
            </Typography>
            <Slider
              value={buyNowPriceRange}
              onChange={handleChangeBuyNowPriceRange}
              valueLabelDisplay="auto"
              aria-labelledby="buy-now-price-range-slider"
              getAriaValueText={(value) => `${value} грн`}
              min={0}
              max={1000}
            />
          </FormControl>
          <Divider sx={{ mb: 2 }} />
          <FormControl fullWidth component="fieldset" sx={{ mb: 2 }}>
            <Typography id="change-date-option" gutterBottom>
              Вибір дати
              <Tooltip
                title="Оберіть період, за який бажаєте переглянути лоти."
                arrow
              >
                <HelpOutlineIcon sx={{ ml: 1, fontSize: "1rem" }} />
              </Tooltip>
            </Typography>
            <RadioGroup
              aria-label="date-option"
              name="date-option"
              value={dateOption}
              onChange={handleChangeDateOption}
            >
              <FormControlLabel
                value="24_hours"
                control={<Radio />}
                label="Наступні 24 години"
              />
              <FormControlLabel
                value="7_days"
                control={<Radio />}
                label="Наступні 7 днів"
              />
              <FormControlLabel
                value="30_days"
                control={<Radio />}
                label="Наступні 30 днів"
              />
              <FormControlLabel
                value="all"
                control={<Radio />}
                label="Всі дні"
              />
              <FormControlLabel
                value="recently_sold"
                control={<Radio />}
                label="Нещодавно закриті"
              />
            </RadioGroup>
          </FormControl>
          <Divider sx={{ mb: 2 }} />
          <FormGroup sx={{ mb: 2 }}>
            <Typography id="category-checkbox-group" gutterBottom>
              Категорії
              <Tooltip
                title="Оберіть категорії лотів, які Вас цікавлять. Вони дають можливість знайти ту категорію товару, яка цікавить."
                arrow
              >
                <HelpOutlineIcon sx={{ ml: 1, fontSize: "1rem" }} />
              </Tooltip>
            </Typography>
            {categoriesData &&
              categoriesData.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={
                    <Checkbox
                      value={category.id}
                      checked={selectedCategories.includes(
                        category.id.toString()
                      )}
                      onChange={handleCategoryChange}
                    />
                  }
                  label={category.name}
                />
              ))}
          </FormGroup>
          <Divider sx={{ mb: 2 }} />
          <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
            <Typography id="status-checkbox-group" gutterBottom>
              Статус лотів
              <Tooltip
                title="Оберіть статуси лотів, які бажаєте переглянути. Їх всього є два типи - це відкриті та закриті."
                arrow
              >
                <HelpOutlineIcon sx={{ ml: 1, fontSize: "1rem" }} />
              </Tooltip>
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value="OPEN"
                    checked={selectedStatuses.includes("OPEN")}
                    onChange={handleStatusChange}
                  />
                }
                label="Відкриті"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="CLOSED"
                    checked={selectedStatuses.includes("CLOSED")}
                    onChange={handleStatusChange}
                  />
                }
                label="Закриті"
              />
            </FormGroup>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterPanel;
