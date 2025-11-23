import { Box, Pagination, Typography } from "@mui/material";

type ListPaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
};

function ListPagination({
  page,
  pageSize,
  total,
  onPageChange,
}: ListPaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Pagination
          color="primary"
          page={page}
          count={pageCount}
          onChange={(_, value) => onPageChange(value)}
        />
      </Box>

      <Box mt={1} display="flex" justifyContent="center">
        <Typography variant="body2" color="text.secondary">
          Показано {from}–{to} из {total} объявлений
        </Typography>
      </Box>
    </Box>
  );
}

export default ListPagination;
