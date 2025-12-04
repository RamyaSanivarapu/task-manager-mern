import { Card, Typography, Chip, IconButton, Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskCardView({
    tasks,
    handleEdit,
    handleStart,
    handleComplete,
    handleDelete,
    user,
    isAdmin,
    pulseAnimation
}) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "15px",
                padding: "10px",
            }}
        >
            {tasks.map((task) => (
                <Card
                    key={task._id}
                    sx={{
                        padding: 2,
                        borderRadius: "12px",
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                        ...(task.status === "In Progress" ? pulseAnimation : {}),
                        transition: "0.25s",
                        "&:hover": {
                            backgroundColor:
                                task.status === "Completed"
                                    ? "#e8f5e9"
                                    : task.status === "In Progress"
                                        ? "#fff3e0"
                                        : "#e3f2fd",
                            transform: "translateY(-5px)"
                        },
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        {task.status !== "Completed" && (
                            <Tooltip title="Edit Task">
                                <IconButton onClick={() => handleEdit(task)} color="primary">
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        )}

                        {isAdmin && (
                            <Tooltip title="Delete">
                                <IconButton color="error" onClick={() => handleDelete(task._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>

                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        {task.description}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, marginTop: "8px" }}>
                        Assigned To: <strong>{isAdmin
                            ? (task?.user?.name || "Unknown User")
                            : "Me"}</strong>
                    </Typography>

                    <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                        <Chip
                            label={task.status}
                            color={
                                task.status === "Completed"
                                    ? "success"
                                    : task.status === "In Progress"
                                        ? "warning"
                                        : "info"
                            }
                        />

                        {task.status === "Not Started" && (
                            <Tooltip title="Start Task">
                                <IconButton onClick={() => handleStart(task)} color="info">
                                    <PlayArrowIcon />
                                </IconButton>
                            </Tooltip>
                        )}

                        {task.status === "In Progress" && (
                            <Tooltip title="Complete Task">
                                <IconButton onClick={() => handleComplete(task)} color="success">
                                    <CheckCircleIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
}
