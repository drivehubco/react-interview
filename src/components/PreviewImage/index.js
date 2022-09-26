import { useState, useEffect } from "react";
import { Box, Fade, Backdrop } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const PreviewImage = (props) => {
  const { imgUrl, openAlertPreview, setOpenAlertPreview } = props;

  const [previewFile, setPreviewFile] = useState("");
  const handleCloseAlertPreview = () => setOpenAlertPreview(false);
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(
    () => {
      if (imgUrl != "" && openAlertPreview) {
        setOpenAlertPreview(true);
        setPreviewFile(imgUrl);
      }
    },
    [imgUrl],
    [openAlertPreview]
  );

  return (
    <>
      {/* Modal (Show Image) */}
      <Modal
        open={openAlertPreview}
        onClose={handleCloseAlertPreview}
        aria-labelledby="modal-alert-title"
        aria-describedby="modal-alert-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAlertPreview}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#FFFFFF",
              border: "1px solid #707070",
              borderRadius: "10px",
              boxShadow: 24,
              maxHeight: isDownSm ? 256 : 624,
              mt: "1%",
              ...(isDownSm ? { height: "65%" } : { height: "100%" }),
            }}
          >
            <img src={previewFile} style={{ height: "100%" }} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default PreviewImage;
