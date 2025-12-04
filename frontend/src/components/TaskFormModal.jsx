import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    MenuItem
} from "@mui/material";
import { useEffect, useState } from "react";
import AXIOS from "../api/axiosInstance";

export default function TaskFormModal({
    open,
    onClose,
    form,
    setForm,
    editingId,
    handleSubmit,
    isAdmin
}) {
    const [users, setUsers] = useState([]);

    // Fetch all users only when admin opens form

    useEffect(() => {
        if (isAdmin) {
            AXIOS.get("/users").then((res) => setUsers(res.data));
        }
    }, [isAdmin]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {editingId ? "Edit Task" : "Add New Task"}
            </DialogTitle>

            <DialogContent>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />

                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    inputProps={{ maxLength: 120 }}
                    helperText={`${form.description.length}/120 characters`}
                    required
                />

                {isAdmin && (
                    <TextField
                        select
                        label="Assign To"
                        fullWidth
                        margin="normal"
                        value={form.user || ""}
                        onChange={(e) => setForm({ ...form, user: e.target.value })}
                        required
                    >
                        {users.map((u) => (
                            <MenuItem key={u._id} value={u._id}>
                                {u.name} ({u.email})
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="outlined">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    {editingId ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
