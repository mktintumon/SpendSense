import { useState, useEffect } from "react";
import API from "../api/api";
import {
  Button,
  MenuItem,
  TextField,
  Box,
  Typography,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"; // Optional icon

const MONTHS = [
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 },
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1; // getMonth is 0-indexed
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - i);
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

function Dashboard() {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [vendorData, setVendorData] = useState<any[]>([]);
  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state

  const [insightsOpen, setInsightsOpen] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const [insightLoading, setInsightLoading] = useState(false);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const result = await API.get<any>(`/dashboard?month=${month}&year=${year}`);

      // category data
      const formattedCategories = Object.entries(
        result.monthlyCategoryTotals,
      ).map(([key, value]) => ({ category: key, total: value }));

      // top 5 vendors data
      const formattedVendors = Object.entries(result.topVendors).map(
        ([key, value]) => ({ name: key, value: value }),
      );

      setCategoryData(formattedCategories);
      setVendorData(formattedVendors);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false); // Stop loading regardless of success/fail
    }
  };


  const fetchInsights = async () => {
    setInsightLoading(true);

    try {
      const result = await API.get<string>("/insights");

      const parsedInsights = result.split("\n");

      setInsights(parsedInsights);
      setInsightsOpen(true);
    } catch (error) {
      console.error("Error fetching insights", error);
    } finally {
      setInsightLoading(false);
    }
};

  useEffect(() => {
    fetchDashboard();
  }, []);


  // Helper to render "No Data" placeholder
  const NoDataPlaceholder = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 350,
        bgcolor: "#fafafa",
        borderRadius: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 48, color: "#bdbdbd", mb: 1 }} />
      <Typography variant="body1" color="textSecondary">
        No data available for this period
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 4, mt: -5 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          bgcolor: "#f5f5f5",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            select
            label="Month"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            sx={{ minWidth: 150 }}
          >
            {MONTHS.map((m) => (
              <MenuItem key={m.value} value={m.value}>
                {m.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            sx={{ minWidth: 120 }}
          >
            {YEARS.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            onClick={fetchDashboard}
            disabled={loading}
          >
            {loading ? "Loading..." : "Show Data"}
          </Button>
        </Box>

        {/* Insights Button */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={fetchInsights}
          disabled={insightLoading}
        >
          {insightLoading ? "Generating..." : "Analyze My Spending"}
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Category Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 2, border: "1px solid #ddd" }}>
            <Typography variant="h6" align="center" gutterBottom>
              Spending by Category
            </Typography>
            {categoryData.length > 0 ? (
              <Box sx={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#1976d2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <NoDataPlaceholder />
            )}
          </Paper>
        </Grid>

        {/* Vendor Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 2, border: "1px solid #ddd" }}>
            <Typography variant="h6" align="center" gutterBottom>
              Top Vendors
            </Typography>
            {vendorData.length > 0 ? (
              <Box sx={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={vendorData}
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {vendorData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <NoDataPlaceholder />
            )}
          </Paper>
        </Grid>
      </Grid>

       {/* AI Insights Dialog */}
      <Dialog
        open={insightsOpen}
        onClose={() => setInsightsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle style={{color:"blue", fontWeight:"bold"}}>Smart Spending Insights</DialogTitle>

        <DialogContent>
          <List>
            {insights.map((insight, index) => (
              <ListItem key={index}>
                <ListItemText primary={`• ${insight}`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Dashboard;
