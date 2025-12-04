import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function EmptyState({ onAddTask }) {
    return (
        <Box
            sx={{
                textAlign: "center",
                padding: "50px 20px",
                opacity: 0.85,
            }}
        >
            {/* <Typography variant="h3" sx={{ mb: 1 }}>
                🎉
            </Typography> */}

            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                No Tasks Yet
            </Typography>

            <Typography sx={{ color: "gray", mb: 3 }}>
                Start by adding your first task!
            </Typography>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAddTask}
                sx={{ borderRadius: "25px", padding: "8px 20px" }}
            >
                Add Task
            </Button>
        </Box>
    );
}
