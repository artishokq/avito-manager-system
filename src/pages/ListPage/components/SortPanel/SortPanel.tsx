import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

export type SortField = "createdAt" | "price" | "priority";
export type SortDirection = "asc" | "desc";

export type SortState = {
  field: SortField;
  direction: SortDirection;
};

type SortPanelProps = {
  sort: SortState;
  onChange: (next: SortState) => void;
};

function SortPanel({ sort, onChange }: SortPanelProps) {
  const handleFieldChange = (value: SortField) => {
    onChange({ ...sort, field: value });
  };

  const handleDirectionChange = (
    _: React.MouseEvent<HTMLElement>,
    value: SortDirection | null
  ) => {
    if (!value) return;
    onChange({ ...sort, direction: value });
  };

  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <FormControl size="small" sx={{ minWidth: 220 }}>
        <InputLabel id="sort-field-label">Сортировать по</InputLabel>
        <Select
          labelId="sort-field-label"
          label="Сортировать по"
          value={sort.field}
          onChange={(e) => handleFieldChange(e.target.value as SortField)}
        >
          <MenuItem value="createdAt">Дате создания</MenuItem>
          <MenuItem value="price">Цене</MenuItem>
          <MenuItem value="priority">Приоритету</MenuItem>
        </Select>
      </FormControl>

      <ToggleButtonGroup
        size="small"
        value={sort.direction}
        exclusive
        onChange={handleDirectionChange}
      >
        <ToggleButton value="asc">⬆</ToggleButton>
        <ToggleButton value="desc">⬇</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default SortPanel;
