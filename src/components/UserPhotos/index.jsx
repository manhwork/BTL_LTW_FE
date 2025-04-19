import React from "react";
import {
    Typography,
    Box,
    Paper,
    List,
    ListItem,
    ListItemText,
    Link,
    Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
    const { userId } = useParams();
    const photos = models.photoOfUserModel(userId);
    const user = models.userModel(userId);

    if (!user) {
        return <Typography>User not found</Typography>;
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Photos of {user.first_name} {user.last_name}
            </Typography>
            {photos.map((photo) => (
                <Paper key={photo._id} sx={{ p: 2, mb: 2 }}>
                    <Box sx={{ mb: 2 }}>
                        <img
                            src={`/images/${photo.file_name}`}
                            alt={`Photo by ${user.first_name}`}
                            style={{ maxWidth: "100%" }}
                        />
                    </Box>
                    <Typography variant="subtitle2" color="text.secondary">
                        {new Date(photo.date_time).toLocaleString()}
                    </Typography>
                    <List>
                        {photo.comments.map((comment) => (
                            <React.Fragment key={comment._id}>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Link
                                                component={RouterLink}
                                                to={`/users/${comment.user._id}`}
                                                color="primary"
                                            >
                                                {comment.user.first_name}{" "}
                                                {comment.user.last_name}
                                            </Link>
                                        }
                                        secondary={
                                            <>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {comment.comment}
                                                </Typography>
                                                <br />
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {new Date(
                                                        comment.date_time
                                                    ).toLocaleString()}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            ))}
        </Box>
    );
}

export default UserPhotos;
