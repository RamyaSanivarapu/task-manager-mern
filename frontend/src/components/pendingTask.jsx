 {/*Pending Tasks */}
                    {/* <Card style={{ width: "50%", padding: "15px" }}>
                    <Typography variant="h6">Pending Tasks</Typography>

                    <div
                        style={{
                            maxHeight: "250px",
                            overflowY: "auto",
                            marginTop: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>delay</TableCell>
                                </TableRow>
                            </TableHead> 
                            <TableBody>
                                {tasks
                                    .filter((t) => t.status === "In Progress")
                                    .map((t) => {
                                        const updatedTime = new Date(t.updatedAt).getTime();
                                        const now = Date.now();

                                        const hours = !isNaN(updatedTime)
                                            ? Math.floor((now - updatedTime) / (1000 * 60 * 60))
                                            : 0;

                                        let color = "green";
                                        if (hours >= 6 && hours < 24) color = "orange";
                                        if (hours >= 24) color = "red";

                                        return (
                                            <TableRow key={t._id}>
                                                <TableCell>{t.title}</TableCell>

                                                <TableCell sx={{ fontWeight: "bold", color }}>
                                                    {hours} hrs
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </div>
                </Card> */}