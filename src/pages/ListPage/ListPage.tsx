import { useEffect, useRef } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import FilterPanel from "./components/FiltersPanel/FilterPanel";
import SortPanel from "./components/SortPanel/SortPanel";
import AdCard, {
  type AdStatus,
  type AdPriority,
} from "./components/AdCard/AdCard";
import ListPagination from "./components/PaginationBar/ListPagination";

import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks";
import {
  fetchAds,
  setFilters,
  resetFilters,
  setSort,
  setPage,
} from "../../features/adsList/adsListSlice";

function ListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const {
    items: ads,
    total,
    page,
    pageSize,
    filters,
    sort,
    isLoading,
    error,
    categories,
  } = useAppSelector((state) => state.adsList);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch, page, filters, sort]);

  // Горячая клавиша "/" фокус на поиск
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName.toLowerCase();
        if (tag === "input" || tag === "textarea") return;
        if (target.getAttribute("contenteditable") === "true") return;
      }

      if (e.key === "/") {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          searchInputRef.current.select?.();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleCardClick = (id: string | number) => {
    navigate(`/item/${id}`);
  };

  const hasAds = Array.isArray(ads) && ads.length > 0;

  return (
    <Box
      px={3}
      py={2}
      flex={1}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box display="flex">
        <FilterPanel
          filters={filters}
          availableCategories={categories}
          onChange={(next) => dispatch(setFilters(next))}
          onReset={handleResetFilters}
          searchInputRef={searchInputRef}
        />

        <Box flex={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <SortPanel
              sort={sort}
              onChange={(next) => dispatch(setSort(next))}
            />
          </Box>

          {isLoading ? (
            <Box
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box flex={1} display="flex" alignItems="center">
              <Typography color="error">{error}</Typography>
            </Box>
          ) : !hasAds ? (
            <Box flex={1} display="flex" alignItems="center">
              <Typography color="text.secondary">
                Объявления не найдены по заданным фильтрам
              </Typography>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column">
              {ads.map((ad) => (
                <AdCard
                  key={ad.id}
                  id={String(ad.id)}
                  title={ad.title}
                  price={ad.price}
                  category={ad.category}
                  createdAt={ad.createdAt}
                  status={ad.status as AdStatus}
                  priority={ad.priority as AdPriority}
                  imageUrl={ad.images?.[0]}
                  onClick={handleCardClick}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <Box mt={3} display="flex" justifyContent="center">
        <ListPagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={(p) => dispatch(setPage(p))}
        />
      </Box>
    </Box>
  );
}

export default ListPage;
