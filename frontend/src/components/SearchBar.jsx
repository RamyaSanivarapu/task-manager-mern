import { TextField, IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function SearchBar({ search, setSearch }) {
    return (
        <TextField
            placeholder="Search tasks..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: "250px" }}
            InputProps={{
                endAdornment: search.length > 0 && (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setSearch("")} size="small">
                            <ClearIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}
