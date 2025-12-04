import { Card, useTheme, Typography, Box, CircularProgress } from "@mui/material";

export default function CircularProgressCard({ total, completed }) {
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    const theme = useTheme();
    const themeMode = theme.palette.mode;

    return (
        <Card
            sx={{
                width: "260px",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                textAlign: "center",
                background:themeMode === "dark" ? "#d888f1" : "#e6b8f4",
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: "15px", fontWeight: "600" }}>
                Task Completion
            </Typography>

            <Box
                sx={{
                    position: "relative",
                    display: "inline-flex",
                }}
            >
                <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={130}
                    thickness={5}
                    sx={{ color: progress === 100 ? "green" : "#1976d2" }}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        {progress}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {completed} / {total} done
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
}
