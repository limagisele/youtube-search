import styles from "../styles/Home.module.css";

const VideoPlayer = ({ selectedVideo }) => {
  if (Object.keys(selectedVideo).length === 0) {
    return
  }

  const videoLink = `https://www.youtube.com/embed/${selectedVideo.id.videoId}`;
  return (
    <div className={styles.videoPlayer}>
      <iframe
        src={videoLink}
        allowFullScreen
        title={selectedVideo.snippet.title}
        width="480"
        height="360"
      />
      <h4>{selectedVideo.snippet.title}</h4>
      <p>Description: {selectedVideo.snippet.description}</p>
    </div>
  );
};

export default VideoPlayer