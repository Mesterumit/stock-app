import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../store/sales";
import { getPurchases } from "../store/purchase";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
import Chart from "../components/Chart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sales.data);
  const purchases = useSelector((state) => state.purchases.data);

  useEffect(() => {
    dispatch(getSales());
    dispatch(getPurchases());
    // eslint-disable-next-line
  }, []);

  const purchasesCount = purchases.map((p) => parseFloat(p.price_total));
  const purchasesTotal = purchasesCount.reduce((sum, num) => sum + num, 0);

  const salesCount = sales.map((s) => parseFloat(s.price_total));
  const salesTotal = salesCount.reduce((sum, num) => sum + num, 0);
  const total = salesTotal - purchasesTotal;

  const pieData = [
    { id: 0, value: purchasesTotal, label: "Purchases" },
    { id: 1, value: salesTotal, label: "Sales" },
  ];

  const salesData = sales.map((item) => ({
    time: item.time_hour,
    price: parseInt(item.price_total),
  }));

  const purchasesData = purchases.map((item) => ({
    time: item.time_hour,
    price: parseInt(item.price_total),
  }));
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  return (
    <Box p={5} style={{ marginLeft: sidebarOpen ? '15rem' : '5rem' }}>
      <Container maxWidth="xl">
        <Grid container spacing={5} mb={5}>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <PieChart
                  series={[{ data: pieData }]}
                  width={600}
                  height={200}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card sx={{ height: 240 }}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  p={2}
                >
                  <Typography variant="h5"> Sales</Typography>
                  <Typography variant="h6" color="green">
                    {" "}
                    +${salesTotal}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  p={2}
                >
                  <Typography variant="h5"> Purchases</Typography>
                  <Typography variant="h6" color="error">
                    {" "}
                    -${purchasesTotal}
                  </Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  p={2}
                >
                  <Typography variant="h5"> Total</Typography>
                  <Typography
                    variant="h6"
                    color={total < 0 ? "error" : "green"}
                  >
                    {" "}
                    ${total}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          <Grid item xs={12} lg={6}>
            <Chart name="Sales" data={salesData} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TableContainer component={Paper} sx={{ height: 350 }}>
              <Typography variant="h6" align="center" p={2}>
                {" "}
                Recent Sales{" "}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"> # </TableCell>
                    <TableCell align="center"> Product</TableCell>
                    <TableCell align="center"> Brand</TableCell>
                    <TableCell align="center"> Category</TableCell>
                    <TableCell align="center"> Price</TableCell>
                    <TableCell align="center"> Qty</TableCell>
                    <TableCell align="center"> Total Price</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {sales
                    .slice(-3)
                    .reverse()
                    .map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:lastchild td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center"> {index + 1}</TableCell>
                        <TableCell align="center"> {row.product}</TableCell>
                        <TableCell align="center"> {row.brand}</TableCell>
                        <TableCell align="center">
                          {" "}
                          {row.category[0].name}
                        </TableCell>
                        <TableCell align="center"> {row.price}</TableCell>
                        <TableCell align="center"> {row.quantity}</TableCell>
                        <TableCell align="center"> {row.price_total}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container spacing={5} mt={1}>
          <Grid item xs={12} lg={6}>
            <Chart name="Purchases" data={purchasesData} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TableContainer component={Paper} sx={{ height: 350 }}>
              <Typography variant="h6" align="center" p={2}>
                {" "}
                Recent Purchases{" "}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"> # </TableCell>
                    <TableCell align="center"> Product</TableCell>
                    <TableCell align="center"> Firm</TableCell>
                    <TableCell align="center"> Brand</TableCell>
                    <TableCell align="center"> Category</TableCell>
                    <TableCell align="center"> Price</TableCell>
                    <TableCell align="center"> Qty</TableCell>
                    <TableCell align="center"> Total Price</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {purchases
                    .slice(-3)
                    .reverse()
                    .map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:lastchild td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center"> {index + 1}</TableCell>
                        <TableCell align="center"> {row.product}</TableCell>
                        <TableCell align="center"> {row.firm}</TableCell>
                        <TableCell align="center"> {row.brand}</TableCell>
                        <TableCell align="center">
                          {" "}
                          {row.category[0].name}
                        </TableCell>
                        <TableCell align="center"> {row.price}</TableCell>
                        <TableCell align="center"> {row.quantity}</TableCell>
                        <TableCell align="center"> {row.price_total}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;