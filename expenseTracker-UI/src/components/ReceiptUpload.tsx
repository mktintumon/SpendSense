import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import API from "../api/api";
import { useSnackbar } from "notistack";


interface Props {
    onParsed : (data: any) => void;
}

function ReceiptUpload({onParsed}: Props) {

    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async(e : any) =>{
        const file = e.target.files[0];
        if(!file) return ;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const result = await API.post<any>("/scanReceipt", formData);

            onParsed(result);
            enqueueSnackbar("Receipt scanned successfully", { variant: "success" });
            
        } catch (error) {
            enqueueSnackbar("Failed to scan receipt", { variant: "error" });
        }

        setLoading(false);
    }

  return (
    <>
      <Button variant="outlined" component="label">

        {loading ? <CircularProgress size={15}/> : "Upload Receipt"}

        <input
          hidden
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleFileUpload}
        />
      </Button>
    </>
  )
}

export default ReceiptUpload
