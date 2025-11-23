import { Avatar, Box, Paper, Typography } from "@mui/material";
import type { SellerInfo } from "../../../shared/api/adsApi";

type Props = {
  seller: SellerInfo;
};

function formatDate(value: string | Date) {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleDateString("ru-RU");
}

export function SellerCard({ seller }: Props) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Продавец
      </Typography>
      <Box display="flex" alignItems="center" mb={1.5}>
        <Avatar sx={{ mr: 1.5 }}>{seller.name.charAt(0).toUpperCase()}</Avatar>
        <Box>
          <Typography variant="subtitle1">{seller.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Рейтинг: {seller.rating}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2">Объявлений: {seller.totalAds}</Typography>
      <Typography variant="body2">
        На платформе с: {formatDate(seller.registeredAt)}
      </Typography>
    </Paper>
  );
}
