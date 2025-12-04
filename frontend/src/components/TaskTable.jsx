import {
    Table, TableHead, TableRow, TableCell, TableBody, Chip, IconButton, Tooltip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskTable({
    tasks,
    handleEdit,
    handleStart,
    handleComplete,
    handleDelete,
    user,
    isAdmin,
    pulseAnimation,
    iconStyles
}) {
    return (
        <Table sx={{ marginTop: 2, width: "99%" }}>
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {tasks.map((task) => (
                    <TableRow
                        key={task._id}
                        sx={{
                            transition: "background-color 0.2s ease",
                            ...(task.status === "In Progress" ? pulseAnimation : {}),
                            "&:hover": {
                                backgroundColor:
                                    task.status === "Completed"
                                        ? "#e8f5e9"
                                        : task.status === "In Progress"
                                            ? "#fff3e0"
                                            : "#e3f2fd",
                            },
                        }}
                    >
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.description}</TableCell>

                        <TableCell>
                            <Chip
                                label={task.status}
                                color={
                                    task.status === "Completed"
                                        ? "success"
                                        : task.status === "In Progress"
                                            ? "warning"
                                            : "info"
                                }
                                size="small"
                                sx={{ fontWeight: "bold" }}
                            />
                        </TableCell>
                        <TableCell>{isAdmin
                            ? (task?.user?.name || "Unknown User")
                            : "Me"}</TableCell>

                        <TableCell>

                            {task.status !== "Completed" && (
                                <Tooltip title="Edit Task">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(task)}
                                        sx={iconStyles}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            )}

                            {task.status === "Not Started" && (
                                <Tooltip title="Start Task">
                                    <IconButton
                                        color="info"
                                        sx={iconStyles}
                                        onClick={() => handleStart(task)}
                                    >
                                        <PlayArrowIcon />
                                    </IconButton>
                                </Tooltip>
                            )}

                            {task.status === "In Progress" && (
                                <Tooltip title="Complete Task">
                                    <IconButton
                                        color="success"
                                        sx={iconStyles}
                                        onClick={() => handleComplete(task)}
                                    >
                                        <CheckCircleIcon />
                                    </IconButton>
                                </Tooltip>
                            )}

                            {isAdmin && (
                                <Tooltip title="Delete Task">
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            )}

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
