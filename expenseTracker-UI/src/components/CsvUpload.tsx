import { Button } from "@mui/material";
import API from "../api/api";
import { useSnackbar } from "notistack";

function CsvUpload() {
   const handleUpload = async (e : any) => {

        const { enqueueSnackbar } = useSnackbar();

        const formData = new FormData();
        // use name-"file" in backend --> @RequestParam MultipartFile file
        formData.append("file" , e.target.files[0]);

        await API.post("/upload" , formData)
        enqueueSnackbar("File uploaded successfully", { variant: "success" });
   }

   return (
    <Button variant="outlined" component="label">
      Upload CSV
      <input type="file" hidden onChange={handleUpload} />
    </Button>
  );
}

export default CsvUpload