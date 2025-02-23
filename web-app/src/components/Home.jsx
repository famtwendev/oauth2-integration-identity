import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getToken} from "../services/localStorageService";
import Header from "./header/Header";
import {Box, Card, CircularProgress, Typography, Snackbar, Alert} from "@mui/material";

export default function Home() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const getUserDetails = async (accessToken) => {
        const response = await fetch(
            "http://localhost:8080/identity/users/my-info",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const data = await response.json();

        console.log(data.result);
        if (data.result) {
            setOpenSnackbar(true); // Show success Snackbar when user details are fetched
        }

        setUserDetails(data.result);
    };

    useEffect(() => {
        const accessToken = getToken();

        if (!accessToken) {
            navigate("/login");
        }

        getUserDetails(accessToken);
    }, [navigate]);

    return (
        <>
            <Header></Header>
            {userDetails ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                    bgcolor={"#f0f2f5"}
                >
                    <Card
                        sx={{
                            minWidth: 400,
                            maxWidth: 500,
                            boxShadow: 4,
                            borderRadius: 4,
                            padding: 4,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%", // Ensure content takes full width
                            }}
                        >
                            <p>Welcome back to Famtwen Company, {userDetails.username}</p>
                            <h1 className="name">{`${userDetails.firstName} ${userDetails.lastName}`}</h1>
                            <p className="email">{userDetails.dob}</p>
                            <ul>
                                User's roles:
                                {userDetails.roles?.map((item, index) => (
                                    <li className="email" key={index}>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    </Card>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <CircularProgress></CircularProgress>
                    <Typography>Loading ...</Typography>
                </Box>
            )}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000} // Set to 5000 milliseconds (5 seconds)
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                sx={{ mt: '70px'}}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    variant="filled"
                    severity="success"
                >
                    Login successful!
                </Alert>
            </Snackbar>
        </>
    );
}