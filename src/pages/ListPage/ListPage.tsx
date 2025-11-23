import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import FilterPanel, {
  type FiltersState,
} from "./components/FiltersPanel/FilterPanel";
import SortPanel, { type SortState } from "./components/SortPanel/SortPanel";
import AdCard, {
  type AdStatus,
  type AdPriority,
} from "./components/AdCard/AdCard";

const initialFilters: FiltersState = {
  statuses: [],
  category: "",
  priceFrom: null,
  priceTo: null,
  search: "",
};

const initialSort: SortState = {
  field: "createdAt",
  direction: "desc",
};

const mockAds = [
  {
    id: "1",
    title: "iPhone 14 Pro 128GB",
    price: 95000,
    category: "Электроника",
    createdAt: "2025-11-20T10:00:00.000Z",
    status: "pending" as AdStatus,
    priority: "urgent" as AdPriority,
    imageUrl: "img",
  },
  {
    id: "2",
    title: "Квартира студия в центре",
    price: 3500000,
    category: "Недвижимость",
    createdAt: "2025-11-15T12:30:00.000Z",
    status: "approved" as AdStatus,
    priority: "normal" as AdPriority,
    imageUrl: "img",
  },
  {
    id: "3",
    title: "Квартира студия в центре",
    price: 3500000,
    category: "Недвижимость",
    createdAt: "2025-11-15T12:30:00.000Z",
    status: "approved" as AdStatus,
    priority: "normal" as AdPriority,
    imageUrl: "img",
  },
  {
    id: "4",
    title: "Квартира студия в центре",
    price: 3500000,
    category: "Недвижимость",
    createdAt: "2025-11-15T12:30:00.000Z",
    status: "approved" as AdStatus,
    priority: "normal" as AdPriority,
    imageUrl: "img",
  },
  {
    id: "5",
    title: "Квартира студия в центре",
    price: 3500000,
    category: "Недвижимость",
    createdAt: "2025-11-15T12:30:00.000Z",
    status: "approved" as AdStatus,
    priority: "normal" as AdPriority,
    imageUrl: "img",
  },
];

function ListPage() {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  const [sort, setSort] = useState<SortState>(initialSort);
  const navigate = useNavigate();

  const handleResetFilters = () => setFilters(initialFilters);

  const availableCategories = [
    "Электроника",
    "Недвижимость",
    "Транспорт",
    "Услуги",
  ];

  const handleCardClick = (id: string) => {
    navigate(`/item/${id}`);
  };

  return (
    <Box display="flex" px={3} py={2}>
      <FilterPanel
        filters={filters}
        availableCategories={availableCategories}
        onChange={setFilters}
        onReset={handleResetFilters}
      />

      <Box flex={1}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <SortPanel sort={sort} onChange={setSort} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            Найдено объявлений: {mockAds.length}
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column">
          {mockAds.map((ad) => (
            <AdCard
              key={ad.id}
              id={ad.id}
              title={ad.title}
              price={ad.price}
              category={ad.category}
              createdAt={ad.createdAt}
              status={ad.status}
              priority={ad.priority}
              imageUrl={ad.imageUrl}
              onClick={handleCardClick}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ListPage;
