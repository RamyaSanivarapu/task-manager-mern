import { IconButton, Tooltip } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import GridViewIcon from "@mui/icons-material/GridView";

export default function ViewToggle({ viewMode, setViewMode }) {
    return (
        <>
            <Tooltip title="Table View">
                <IconButton onClick={() => setViewMode("table")}>
                    <TableChartIcon
                        color={viewMode === "table" ? "primary" : "action"}
                        sx={{ fontSize: 28 }}
                    />
                </IconButton>
            </Tooltip>

            <Tooltip title="Card View">
                <IconButton onClick={() => setViewMode("card")}>
                    <GridViewIcon
                        color={viewMode === "card" ? "primary" : "action"}
                        sx={{ fontSize: 28 }}
                    />
                </IconButton>
            </Tooltip>
        </>
    );
}
