import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

export type AdStatus = "pending" | "approved" | "rejected";
export type AdPriority = "normal" | "urgent";

export type AdCardProps = {
  id: string;
  title: string;
  price: number;
  category: string;
  createdAt: string;
  status: AdStatus;
  priority: AdPriority;
  imageUrl?: string;
  onClick?: (id: string) => void;
};

function getStatusChipProps(status: AdStatus) {
  switch (status) {
    case "pending":
      return { label: "На модерации", color: "warning" as const };
    case "approved":
      return { label: "Одобрено", color: "success" as const };
    case "rejected":
      return { label: "Отклонено", color: "error" as const };
    default:
      return { label: status, color: "default" as const };
  }
}

function getPriorityChipProps(priority: AdPriority) {
  if (priority === "urgent") {
    return {
      label: "Срочное",
      color: "error" as const,
      variant: "outlined" as const,
    };
  }
  return {
    label: "Обычное",
    color: "default" as const,
    variant: "outlined" as const,
  };
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateIso: string) {
  const date = new Date(dateIso);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function AdCard({
  id,
  title,
  price,
  category,
  createdAt,
  status,
  priority,
  imageUrl,
  onClick,
}: AdCardProps) {
  const handleClick = () => {
    if (onClick) onClick(id);
  };

  const statusChip = getStatusChipProps(status);
  const priorityChip = getPriorityChipProps(priority);

  const placeholder = "image";

  return (
    <Card sx={{ width: "100%", mb: 2 }}>
      <CardActionArea onClick={handleClick}>
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          {/* Левая часть — квадратная картинка */}
          <CardMedia
            component="img"
            image={imageUrl || placeholder}
            alt={title}
            sx={{
              width: 160,
              height: 160,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />

          {/* Правая часть */}
          <CardContent
            sx={{
              display: "flex",
              flex: 1,
              gap: 2,
            }}
          >
            {/* Текстовый блок: название, цена, категория, дата */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  gutterBottom
                  noWrap
                >
                  {title}
                </Typography>

                <Typography variant="h6" color="primary" gutterBottom>
                  {formatPrice(price)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="body2" color="text.secondary" noWrap>
                  {category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  •
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(createdAt)}
                </Typography>
              </Box>
            </Box>

            {/* Правый столбец — индикаторы статуса и приоритета */}
            <Stack
              spacing={1}
              alignItems="flex-end"
              justifyContent="flex-end"
              sx={{ minWidth: 140 }}
            >
              <Chip size="small" {...priorityChip} />
              <Chip size="small" {...statusChip} />
            </Stack>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default AdCard;
