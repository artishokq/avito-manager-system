import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import type { FullAd } from "../../../shared/api/adsApi";

type Props = {
  ad: FullAd;
};

function getStatusLabel(status: string): string {
  switch (status) {
    case "approved":
      return "Одобрено";
    case "rejected":
      return "Отклонено";
    case "pending":
      return "На модерации";
    default:
      return status;
  }
}

export function AdMainInfoCard({ ad }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (ad.images && ad.images.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedImage(ad.images[0]);
    } else {
      setSelectedImage(null);
    }
  }, [ad]);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h5" gutterBottom>
        {ad.title}
      </Typography>

      {/* Галерея */}
      <Box mb={2}>
        {selectedImage && (
          <Box
            component="img"
            src={selectedImage}
            alt={ad.title}
            sx={{
              width: "100%",
              maxHeight: 320,
              objectFit: "cover",
              borderRadius: 1,
              mb: 1,
            }}
          />
        )}
        <Box display="flex" gap={1}>
          {ad.images?.map((img) => (
            <Box
              key={img}
              component="img"
              src={img}
              alt=""
              sx={{
                width: 80,
                height: 60,
                objectFit: "cover",
                borderRadius: 1,
                border:
                  img === selectedImage
                    ? "2px solid #1976d2"
                    : "1px solid #ddd",
                cursor: "pointer",
              }}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </Box>
      </Box>

      {/* Цена и статусы */}
      <Box mb={2} display="flex" gap={2} alignItems="center">
        <Typography variant="h6">{ad.price.toLocaleString()} руб</Typography>
        <Chip
          label={ad.category}
          size="small"
          color="default"
          variant="outlined"
        />
        <Chip
          label={getStatusLabel(ad.status)}
          size="small"
          color={
            ad.status === "approved"
              ? "success"
              : ad.status === "rejected"
              ? "error"
              : "warning"
          }
        />
        <Chip
          label={ad.priority === "urgent" ? "Высокий приоритет" : "Обычный"}
          size="small"
          color={ad.priority === "urgent" ? "warning" : "default"}
          variant="outlined"
        />
      </Box>

      {/* Описание */}
      <Box mb={2}>
        <Typography variant="subtitle1" gutterBottom>
          Описание
        </Typography>
        <Typography>{ad.description}</Typography>
      </Box>

      {/* Характеристики */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Характеристики
        </Typography>
        <Table size="small">
          <TableBody>
            {Object.entries(ad.characteristics || {}).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell sx={{ width: "35%", fontWeight: 500 }}>
                  {key}
                </TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}
