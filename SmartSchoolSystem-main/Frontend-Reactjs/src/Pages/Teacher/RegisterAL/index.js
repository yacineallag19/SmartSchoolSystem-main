import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  Avatar,
  ButtonBase,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Popover,
  Divider,
  ClickAwayListener,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Stack,
  useTheme,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import {
  Home as HomeIcon,
  Person,
  Edit,
  Delete,
  PersonAdd,
  VisibilityOutlined,
  List,
} from "@mui/icons-material";
import { useQuery } from "react-query";
import axios from "axios";
import MainCard from "../../../Components/MainCard";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
function RegisterAL() {
  const user = JSON.parse(localStorage.getItem("user"));
  const getTeacherClasses = useQuery("getTeacherClassesAL", async () => {
    return axios.get("http://localhost:8000/api/getTeacherClasses/" + user.id);
  });
  const theme = useTheme();
  const view = getTeacherClasses.data ? (
    !getTeacherClasses.isLoading ? (
      getTeacherClasses.data.data.length > 0 ? (
        getTeacherClasses.data.data.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.nameClass}</TableCell>
              <TableCell>{item.nameLevel}</TableCell>
              <TableCell>
                <Actions theme={theme} item={item} />
              </TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={4}>
            <Stack
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
            >
              No data to show
            </Stack>
          </TableCell>
        </TableRow>
      )
    ) : (
      <TableRow>
        <TableCell colSpan={4}>
          <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
            <CircularProgress color="secondary" />
          </Stack>
        </TableCell>
      </TableRow>
    )
  ) : null;

  return (
    <Box
      sx={{
        p: 1,
        minHeight: "100vh",
        maxHeight: "fit-content",
        width: "100% !important",
        borderRadius: "10px",
      }}
      bgcolor="primary.light"
    >
      <Box sx={{ mt: 2, ml: 2 }}>
        <IconBreadcrumbs />
      </Box>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} sx={{ backgroundColor: "#9e9e9e5c", p: 1 }}>
                <Grid container display="flex" alignItems="center">
                  <Grid item xs={11}>
                    <Typography variant="subtitle1">
                      Classes Register
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ minHeight: "370px" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Class name</TableCell>
                        <TableCell>Level</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{view}</TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}
function IconBreadcrumbs() {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      justifyContent="center"
      alignItems="center"
    >
      <Link
        underline="hover"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "text.primary",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
        component={RouterLink}
        to="/teacher"
      >
        <HomeIcon sx={{ mr: 0.5 }} color="primary" fontSize="medium" />
        Teacher
      </Link>
      <Link
        underline="hover"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "text.primary",
          fontWeight: "semi-bold",
        }}
        component={RouterLink}
        to="/teacher/Register"
      >
        <List color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Register
      </Link>
    </Breadcrumbs>
  );
}
function Actions(props) {
  return (
    <Stack spacing={1} direction="row">
      <Button
        color="error"
        variant="contained"
        sx={{
          transition: "0.3s",
        }}
        component={RouterLink}
        to={`/teacher/register/absenceAndLateness/${props.item.classes_id}`}
      >
        Absence and lateness Register
      </Button>
    </Stack>
  );
}
export default RegisterAL;
