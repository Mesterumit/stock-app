import {
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    AreaChart,
    Area,
  } from "recharts";
  
  const Chart = ({ name, data }) => {
    const [chart, setChart] = useState("line");
  
    return (
      <Card>
        <CardContent>
          <Stack direction="row">
            <Typography variant="h4" flexGrow={1} align="center">
              {name}
            </Typography>
            <FormControl sx={{ width: "120px" }}>
              <InputLabel>ChartType </InputLabel>
              <Select
                label="Chart Type"
                value={chart}
                onChange={(e) => setChart(e.target.value)}
              >
                <MenuItem value="bar">Bar Chart</MenuItem>
                <MenuItem value="line">Line Chart</MenuItem>
                <MenuItem value="area">Area Chart</MenuItem>
              </Select>
            </FormControl>
          </Stack>
  
          {chart === "line" && (
            <LineChart
              width={700}
              height={250}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                activeDot={{ r: 10 }}
              />
            </LineChart>
          )}
          {chart === "bar" && (
            <BarChart width={700} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#8884d8" />
            </BarChart>
          )}
          {chart === "area" && (
            <AreaChart
              width={700}
              height={250}
              data={data}
              margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          )}
        </CardContent>
      </Card>
    );
  };
  
  export default Chart;