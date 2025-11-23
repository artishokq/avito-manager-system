import {
  Box,
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Slider,
} from "@mui/material";

type StatusValue = "pending" | "approved" | "rejected";
type CategoryValue = string;

export type FiltersState = {
  statuses: StatusValue[];
  category: CategoryValue | "";
  priceFrom: number | null;
  priceTo: number | null;
  search: string;
};

type FilterPanelProps = {
  filters: FiltersState;
  availableStatuses?: { value: StatusValue; label: string }[];
  availableCategories: CategoryValue[];
  onChange: (next: FiltersState) => void;
  onReset: () => void;
};

const DEFAULT_STATUSES: { value: StatusValue; label: string }[] = [
  { value: "pending", label: "На модерации" },
  { value: "approved", label: "Одобрено" },
  { value: "rejected", label: "Отклонено" },
];

function FilterPanel({
  filters,
  availableStatuses = DEFAULT_STATUSES,
  availableCategories,
  onChange,
  onReset,
}: FilterPanelProps) {
  const handleStatusToggle = (value: StatusValue) => {
    const exists = filters.statuses.includes(value);
    const nextStatuses = exists
      ? filters.statuses.filter((s) => s !== value)
      : [...filters.statuses, value];

    onChange({ ...filters, statuses: nextStatuses });
  };

  const handleCategoryChange = (value: CategoryValue | "") => {
    onChange({ ...filters, category: value });
  };

  const handlePriceChange = (_: Event, value: number | number[]) => {
    const [from, to] = value as number[];
    onChange({
      ...filters,
      priceFrom: from,
      priceTo: to,
    });
  };

  const handleSearchChange = (value: string) => {
    onChange({ ...filters, search: value });
  };

  const priceMin = 0;
  const priceMax = 100000;

  const sliderValue: [number, number] = [
    filters.priceFrom ?? priceMin,
    filters.priceTo ?? priceMax,
  ];

  return (
    <Box
      component={Paper}
      elevation={1}
      sx={{
        width: 280,
        p: 2,
        mr: 3,
        alignSelf: "flex-start",
        position: "sticky",
        top: 80,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Фильтры
      </Typography>

      {/* Статусы */}
      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>
          Статус
        </Typography>
        <FormGroup>
          {availableStatuses.map((status) => (
            <FormControlLabel
              key={status.value}
              control={
                <Checkbox
                  checked={filters.statuses.includes(status.value)}
                  onChange={() => handleStatusToggle(status.value)}
                  size="small"
                />
              }
              label={status.label}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Категория */}
      <Box mb={2}>
        <FormControl fullWidth size="small">
          <InputLabel id="category-label">Категория</InputLabel>
          <Select
            labelId="category-label"
            label="Категория"
            value={filters.category}
            onChange={(e) =>
              handleCategoryChange(e.target.value as CategoryValue | "")
            }
          >
            <MenuItem value="">
              <em>Все категории</em>
            </MenuItem>
            {availableCategories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Диапазон цен */}
      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>
          Цена, руб:
        </Typography>
        <Slider
          value={sliderValue}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={priceMin}
          max={priceMax}
          size="small"
        />
        <Box display="flex" gap={1} mt={1}>
          <TextField
            type="number"
            size="small"
            label="От"
            fullWidth
            value={filters.priceFrom ?? ""}
            onChange={(e) =>
              onChange({
                ...filters,
                priceFrom:
                  e.target.value === "" ? null : Number(e.target.value),
              })
            }
          />
          <TextField
            type="number"
            size="small"
            label="До"
            fullWidth
            value={filters.priceTo ?? ""}
            onChange={(e) =>
              onChange({
                ...filters,
                priceTo: e.target.value === "" ? null : Number(e.target.value),
              })
            }
          />
        </Box>
      </Box>

      {/* Поиск по названию */}
      <Box mb={2}>
        <TextField
          size="small"
          label="Поиск по названию"
          fullWidth
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </Box>

      {/* Кнопка сброса */}
      <Button
        variant="outlined"
        color="inherit"
        size="small"
        fullWidth
        onClick={onReset}
      >
        Сбросить фильтры
      </Button>
    </Box>
  );
}

export default FilterPanel;
