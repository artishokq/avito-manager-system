import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import FilterPanel, {
  type FiltersState,
} from "./components/FiltersPanel/FilterPanel";
import SortPanel, { type SortState } from "./components/SortPanel/SortPanel";
import AdCard, {
  type AdStatus,
  type AdPriority,
} from "./components/AdCard/AdCard";
import ListPagination from "./components/PaginationBar/ListPagination";

const PAGE_SIZE = 10;

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

// мок‑объявления для верстки
const mockAds = [
  {
    id: "1",
    title: "iPhone 14 Pro 128GB",
    price: 95000,
    category: "Электроника",
    createdAt: "2025-11-20T10:00:00.000Z",
    status: "pending" as AdStatus,
    priority: "urgent" as AdPriority,
    imageUrl: "https://via.placeholder.com/200x200.png?text=iPhone+14+Pro",
  },
  {
    id: "2",
    title: "Квартира студия в центре",
    price: 3500000,
    category: "Недвижимость",
    createdAt: "2025-11-15T12:30:00.000Z",
    status: "approved" as AdStatus,
    priority: "normal" as AdPriority,
    imageUrl: "https://via.placeholder.com/200x200.png?text=Apartment",
  },
  {
    id: "3",
    title: "Квартира студия в центре",
    price: 3500000,
    category: "Недвижимость",
    createdAt: "2025-11-15T12:30:00.000Z",
    status: "approved" as AdStatus,
    priority: "normal" as AdPriority,
    imageUrl: "https://via.placeholder.com/200x200.png?text=Apartment",
  },
  {
    id: "4",
    title: "Квартира студия в центре",
    price: 3500000,
    category: "Недвижимость",
    createdAt: "2025-11-15T12:30:00.000Z",
    status: "approved" as AdStatus,
    priority: "normal" as AdPriority,
    imageUrl: "https://via.placeholder.com/200x200.png?text=Apartment",
  },
  {
    id: "5",
    title: "Квартира студия в центре",
    price: 3500000,
    category: "Недвижимость",
    createdAt: "2025-11-15T12:30:00.000Z",
    status: "approved" as AdStatus,
    priority: "normal" as AdPriority,
    imageUrl: "https://via.placeholder.com/200x200.png?text=Apartment",
  },
  {
    id: "6",
    title: "Квартира студия в центре",
    price: 3500000,
    category: "Недвижимость",
    createdAt: "2025-11-15T12:30:00.000Z",
    status: "approved" as AdStatus,
    priority: "normal" as AdPriority,
    imageUrl: "https://via.placeholder.com/200x200.png?text=Apartment",
  },
  {
    id: "7",
    title: "Квартира студия в центре",
    price: 3500000,
    category: "Недвижимость",
    createdAt: "2025-11-15T12:30:00.000Z",
    status: "approved" as AdStatus,
    priority: "normal" as AdPriority,
    imageUrl: "https://via.placeholder.com/200x200.png?text=Apartment",
  },
  {
    id: "8",
    title: "Квартира студия в центре",
    price: 3500000,
    category: "Недвижимость",
    createdAt: "2025-11-15T12:30:00.000Z",
    status: "approved" as AdStatus,
    priority: "normal" as AdPriority,
    imageUrl: "https://via.placeholder.com/200x200.png?text=Apartment",
  },
];

function ListPage() {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  const [sort, setSort] = useState<SortState>(initialSort);
  const [page, setPage] = useState(1);
  const totalAds = 25;

  const navigate = useNavigate();

  const handleResetFilters = () => setFilters(initialFilters);

  const handleCardClick = (id: string) => {
    navigate(`/item/${id}`);
  };

  const availableCategories = [
    "Электроника",
    "Недвижимость",
    "Транспорт",
    "Услуги",
  ];

  return (
    <Box
      px={3}
      py={2}
      flex={1} // занимаем всю высоту main
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Верхний блок: фильтры + список карточек */}
      <Box display="flex">
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

      {/* Пагинация */}
      <Box mt={3} display="flex" justifyContent="center">
        <ListPagination
          page={page}
          pageSize={PAGE_SIZE}
          total={totalAds}
          onPageChange={setPage}
        />
      </Box>
    </Box>
  );
}

export default ListPage;
