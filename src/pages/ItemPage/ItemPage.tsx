import { useEffect, useMemo } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks";
import {
  fetchAdById,
  clearAdDetails,
} from "../../features/adDetails/adDetailsSlice";
import { fetchAds } from "../../features/adsList/adsListSlice";
import type { FullAd } from "../../shared/api/adsApi";

import { AdMainInfoCard } from "./components/AdMainInfoCard";
import { ModerationHistoryCard } from "./components/ModerationHistoryCard";
import { SellerCard } from "./components/SellerCard";
import { ModeratorActionsCard } from "./components/ModeratorActionsCard";

function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { item, isLoading, error } = useAppSelector((state) => state.adDetails);
  const { items: listAds } = useAppSelector((state) => state.adsList);

  // Загружаем детали объявления
  useEffect(() => {
    if (!id) return;
    dispatch(fetchAdById(id));
    return () => {
      dispatch(clearAdDetails());
    };
  }, [dispatch, id]);

  // Если список объявлений пуст (после обновления страницы), подгружаем его
  useEffect(() => {
    if (!listAds || listAds.length === 0) {
      dispatch(fetchAds());
    }
  }, [dispatch, listAds]);

  const handleBackToList = () => {
    navigate("/list");
  };

  const currentIndex = useMemo(() => {
    if (!id) return -1;
    return listAds.findIndex((ad) => String(ad.id) === String(id));
  }, [listAds, id]);

  const handlePrev = () => {
    if (currentIndex <= 0) return;
    const prevAd = listAds[currentIndex - 1];
    navigate(`/item/${prevAd.id}`);
  };

  const handleNext = () => {
    if (currentIndex === -1 || currentIndex >= listAds.length - 1) return;
    const nextAd = listAds[currentIndex + 1];
    navigate(`/item/${nextAd.id}`);
  };

  if (isLoading || !item) {
    return (
      <Box
        px={3}
        py={2}
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <CircularProgress />
        )}
      </Box>
    );
  }

  const ad: FullAd = item;

  return (
    <Box
      px={3}
      py={2}
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth="1200px"
      mx="auto"
    >
      {/* Навигация */}
      <Box mb={1} display="flex" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={handleBackToList}>
            Назад к списку
          </Button>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            disabled={currentIndex <= 0}
            onClick={handlePrev}
          >
            Предыдущее
          </Button>
          <Button
            variant="outlined"
            disabled={currentIndex === -1 || currentIndex >= listAds.length - 1}
            onClick={handleNext}
          >
            Следующее
          </Button>
        </Stack>
      </Box>

      {/* Все карточки */}
      <AdMainInfoCard ad={ad} />
      <ModerationHistoryCard history={ad.moderationHistory || []} />
      <SellerCard seller={ad.seller} />
      <ModeratorActionsCard adId={ad.id} />
    </Box>
  );
}

export default ItemPage;
