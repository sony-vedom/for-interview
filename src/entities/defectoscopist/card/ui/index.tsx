import type { FC, ReactNode } from "react"
import {
  Box,
  Card,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material"

interface DefectoscopistCardProps {
  name: string;
  position: string;
  qualificationASNTComponent: () => ReactNode;
  qualificationSDANKComponent: () => ReactNode;
}

export const DefectoscopistCard: FC<DefectoscopistCardProps> = (props) => {
  const {
    name,
    position,
    qualificationASNTComponent,
    qualificationSDANKComponent,
  } = props
  return (
    <Card sx={{ backgroundColor: "primary.main", padding: "5px" }}>
      <CardContent
        sx={{
          padding: { md: "15px", xs: "5px" },
        }}
      >
        <Paper
          sx={{
            padding: { md: "15px", xs: "5px" },
            display: "flex",
            gap: "3px",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h4">{name}</Typography>
        </Paper>
        <Paper
          sx={{
            padding: { md: "15px", xs: "5px" },
          }}
        >
          <Box>
            <b>Должность: </b>
            {position}
          </Box>
          <Divider sx={{ margin: "10px 0" }} />
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            {qualificationASNTComponent()}
            {qualificationSDANKComponent()}
          </Box>
        </Paper>
      </CardContent>
    </Card>
  )
}
