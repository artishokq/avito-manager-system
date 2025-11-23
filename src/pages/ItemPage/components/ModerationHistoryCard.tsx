import { Box, Paper, Typography } from "@mui/material";
import type { ModerationHistoryItem } from "../../../shared/api/adsApi";

type Props = {
  history: ModerationHistoryItem[];
};

function formatDate(value: string | Date) {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleString("ru-RU");
}

export function ModerationHistoryCard({ history }: Props) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        История модерации
      </Typography>
      {history && history.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={1}>
          {history.map((entry) => (
            <Box
              key={entry.id}
              sx={{
                p: 1.5,
                borderRadius: 1,
                border: "1px solid #eee",
              }}
            >
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="subtitle2">
                  {entry.moderatorName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(entry.timestamp)}
                </Typography>
              </Box>
              <Typography variant="body2" gutterBottom>
                Действие:{" "}
                <strong>
                  {entry.action === "approved"
                    ? "Одобрено"
                    : entry.action === "rejected"
                    ? "Отклонено"
                    : entry.action === "returned"
                    ? "Возврат на доработку"
                    : entry.action}
                </strong>
              </Typography>
              {entry.reason && (
                <Typography variant="body2">Причина: {entry.reason}</Typography>
              )}
              {entry.comment && (
                <Typography variant="body2">
                  Комментарий: {entry.comment}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          История модерации отсутствует
        </Typography>
      )}
    </Paper>
  );
}
