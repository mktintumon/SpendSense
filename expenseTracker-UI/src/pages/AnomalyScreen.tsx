import { useEffect, useState } from "react";
import API from "../api/api";
import { Card, CardContent, Typography, Grid } from "@mui/material";

function AnomalyScreen() {
  const [anomalies, setAnomalies] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnomalyData = async () => {
      const result = await API.get<any[]>("/expenses");
      setAnomalies(result.filter((exp: any) => exp.anomaly));
    };

    fetchAnomalyData();
  }, []);

  return (
    <>
      <h2>Anomaly Screen</h2>

      {anomalies.length == 0 ? (
        <h4 style={{"color":"green"}}>No Anomaly found</h4>
      ) : (
        <Grid container spacing={2}>
          {anomalies.map((a) => (
            <Grid size={{ xs: 12, md: 4 }} key={a.id}>
              <Card sx={{ border: "2px solid red" }}>
                <CardContent>
                  <Typography variant="h6">{a.vendor}</Typography>
                  <Typography>₹ {a.amount}</Typography>
                  <Typography>{a.date}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default AnomalyScreen;
