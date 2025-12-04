import { Card, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoopIcon from "@mui/icons-material/Loop";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export default function TaskSummary({ total, inProgress, completed, themeMode }) {
    return (
        <>
            {/* <Typography variant="h6">Task Summary</Typography> */}

            <div style={{ display: "flex", flexDirection: "row", gap: "15px", marginTop: "10px" }}>

                <Card sx={{
                    padding: 2,
                    borderRadius: "12px",
                    background: themeMode === "dark" ? "#0d47a1" : "#e3f2fd",
                    // color: themeMode === "dark" ? "white" : "black",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
                    }
                }}>
                    <Typography variant="h6">Total Tasks</Typography>
                    <Typography variant="h4">{total}</Typography>
                    <CheckCircleIcon />
                </Card>

                <Card sx={{
                    padding: 2,
                    background: themeMode === "dark" ? "#e5ba33" : "#fff3cd",
                    borderRadius: "12px",
                    transition: "0.2s",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
                    }
                }}>
                    <Typography variant="h6">In Progress</Typography>
                    <Typography variant="h4">{inProgress}</Typography>
                    <LoopIcon />
                </Card>

                <Card sx={{
                    padding: 2, background: themeMode === "dark" ? "#64c86b" : "#e8f5e9", borderRadius: "12px",
                    transition: "0.2s",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
                    }
                }}>
                    <Typography variant="h6">Completed</Typography>
                    <Typography variant="h4">{completed}</Typography>
                    <FormatListBulletedIcon />
                </Card>
            </div>
        </>
    );
}
