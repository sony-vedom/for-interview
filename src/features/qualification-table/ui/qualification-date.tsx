import { FC, useState } from "react";
import dayjs from "dayjs";
import { Box, IconButton, Typography } from "@mui/material";
import { AppDatePicker } from "shared/ui/app-data-picker";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

export const QualificationDate: FC<{ date: string }> = (props) => {
  const { date } = props;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const defaultValue = dayjs(date);
  return (
    <Box sx={{ display: "flex", width: "245.3px" }}>
      {!isEditMode ? (
        <Typography
          component="div"
          sx={{
            paddingTop: "5px",
            textAlign: "left",
            height: "35px",
            width: "150px",
            verticalAlign: "center",
            paddingLeft: "14px",
          }}
          variant="subtitle1"
        >
          {defaultValue.format("DD.MM.YYYY")}
        </Typography>
      ) : (
        <AppDatePicker
          defaultValue={defaultValue}
          label=""
          slotProps={{
            textField: {
              size: "small",
              sx: { maxWidth: "150px" },
            },
          }}
        />
      )}
      <IconButton
        onClick={() => setIsEditMode((iem) => !iem)}
        sx={{ marginLeft: "5px" }}
        size="small"
      >
        {!isEditMode ? <EditIcon /> : <SaveIcon />}
      </IconButton>
    </Box>
  );
};
