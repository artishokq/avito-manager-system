import { Box, Button, Chip, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export type ModerationAction = "approved" | "rejected" | "returned";

const QUICK_REASONS = [
  "Запрещённый товар",
  "Неверная категория",
  "Некорректное описание",
  "Проблемы с фото",
  "Подозрение на мошенничество",
  "Другое",
];

type Props = {
  adId: string | number;
};

export function ModeratorActionsCard({ adId }: Props) {
  const [moderationAction, setModerationAction] =
    useState<ModerationAction | null>(null);
  const [reason, setReason] = useState("");
  const [selectedQuickReason, setSelectedQuickReason] = useState<string | null>(
    null
  );

  const handleSelectQuickReason = (text: string) => {
    setSelectedQuickReason(text);
    if (text === "Другое") {
      setReason("");
    } else {
      setReason(text);
    }
  };

  const handleModerationClick = (action: ModerationAction) => {
    setModerationAction(action);
    if (action === "approved") {
      setReason("");
      setSelectedQuickReason(null);
    }
  };

  const handleSubmitModeration = () => {
    if (moderationAction === "rejected" || moderationAction === "returned") {
      if (!reason.trim()) {
        alert("Укажите причину решения");
        return;
      }
    }

    console.log("MODERATION ACTION", {
      id: adId,
      action: moderationAction,
      reason,
    });
    alert("Действие модератора отправлено (заглушка)");
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Действия модератора
      </Typography>

      <Box mb={1.5} display="flex" gap={1}>
        <Button
          fullWidth
          variant={moderationAction === "approved" ? "contained" : "outlined"}
          color="success"
          onClick={() => handleModerationClick("approved")}
        >
          Одобрить
        </Button>
        <Button
          fullWidth
          variant={moderationAction === "rejected" ? "contained" : "outlined"}
          color="error"
          onClick={() => handleModerationClick("rejected")}
        >
          Отклонить
        </Button>
        <Button
          fullWidth
          variant={moderationAction === "returned" ? "contained" : "outlined"}
          color="warning"
          onClick={() => handleModerationClick("returned")}
        >
          Вернуть
        </Button>
      </Box>

      {(moderationAction === "rejected" || moderationAction === "returned") && (
        <>
          <Typography variant="subtitle2" gutterBottom>
            Причина (обязательно)
          </Typography>
          <Box mb={1} display="flex" flexWrap="wrap" gap={1}>
            {QUICK_REASONS.map((r) => (
              <Chip
                key={r}
                label={r}
                size="small"
                color={selectedQuickReason === r ? "primary" : "default"}
                onClick={() => handleSelectQuickReason(r)}
              />
            ))}
          </Box>
          <TextField
            fullWidth
            size="small"
            multiline
            minRows={2}
            label={
              selectedQuickReason === "Другое"
                ? "Укажите причину"
                : "Комментарий / уточнение"
            }
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </>
      )}

      <Box mt={2}>
        <Button fullWidth variant="contained" onClick={handleSubmitModeration}>
          Сохранить решение
        </Button>
      </Box>
    </Paper>
  );
}
