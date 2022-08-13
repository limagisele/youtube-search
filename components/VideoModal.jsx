import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../styles/Pages.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function VideoModal({ selectedVideo, open, handleClose }) {
  if (Object.keys(selectedVideo).length === 0) {
    return;
  }

  const videoLink = `https://www.youtube.com/embed/${selectedVideo.id.videoId}`;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="video-player"
        aria-describedby="modal-to-play-selected-youtube-video"
      >
        <Card sx={style}>
          <IconButton className={styles.closeModal} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <CardActionArea>
            <CardMedia
              component="iframe"
              height="360"
              src={videoLink}
              allowFullScreen
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {selectedVideo.snippet.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedVideo.snippet.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Modal>
    </div>
  );
}
