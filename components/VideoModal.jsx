import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function VideoModal({ selectedVideo, open, setOpen }) {
  if (Object.keys(selectedVideo).length === 0) {
    return;
  }

  const videoLink = `https://www.youtube.com/embed/${selectedVideo.id.videoId}`;

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
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
