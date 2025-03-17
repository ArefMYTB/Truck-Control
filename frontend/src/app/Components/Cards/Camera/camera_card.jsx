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
    <div className="w-full max-w-[400px] bg-white rounded-2xl shadow p-2 flex flex-col">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <FaExpand className="text-gray-600 cursor-pointer" onClick={handleFullScreen} />
        <h4 className="font-bold text-base">{title}</h4>
      </div>
      <div className="relative">
        <video
          id={`${title}-video`}
          ref={videoSrc}
          autoPlay
          loop
          muted
          className="video-js vjs-default-skin w-full h-[225px] rounded-lg"
        />
      </div>
    </div>
  );
};

export default Camera_Card;
