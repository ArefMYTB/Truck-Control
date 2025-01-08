import { FaExpand } from "react-icons/fa";
import './camera_card.scss';

const Camera_Card = ({ title, videoSrc }) => {

  const handleFullScreen = () => {
    const videoElement = document.getElementById(`${title}-video`);
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } 
    // else if (videoElement.webkitRequestFullscreen) {
    //   videoElement.webkitRequestFullscreen(); // Safari
    // } else if (videoElement.msRequestFullscreen) {
    //   videoElement.msRequestFullscreen(); // IE/Edge
    // }
  };

  return (
    <div className="camera_card">
      <div className="camera_card-header">
        <h4 className="camera_card-title">{title}</h4>
        <FaExpand className="fullscreen-icon" onClick={handleFullScreen} />
      </div>
      <div className="camera_card-video">
        <video
          id={`${title}-video`}
          src={videoSrc}
          autoPlay
          loop
          muted
          className="video"
        />
      </div>
    </div>
  );
};

export default Camera_Card;
