import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Camera_Card from '@/app/Components/Cards/Camera/camera_card';

const Camera = () => {
    const container_videoRef = useRef(null);
    const plate_videoRef = useRef(null);
    const face_videoRef = useRef(null);

    useEffect(() => {
        const container_player = videojs(container_videoRef.current, {
            controls: true,
            autoplay: true,
            fluid: true,
            preload: 'auto',
            liveui: true,
            sources: [{
                src: "/stream_container.m3u8",
                type: "application/x-mpegURL"
            }]
        });

        return () => {
            if (container_player) {
                container_player.dispose();
            }
        };
    }, []);

    useEffect(() => {
        const plate_player = videojs(plate_videoRef.current, {
            controls: true,
            autoplay: true,
            fluid: true,
            sources: [{
                src: "/stream_plate.m3u8",
                type: "application/x-mpegURL"
            }]
        });

        return () => {
            if (plate_player) {
                plate_player.dispose();
            }
        };
    }, []);

    useEffect(() => {
        const face_player = videojs(face_videoRef.current, {
            controls: true,
            autoplay: true,
            fluid: true,
            sources: [{
                src: "/stream_face.m3u8",
                type: "application/x-mpegURL"
            }]
        });

        return () => {
            if (face_player) {
                face_player.dispose();
            }
        };
    }, []);


    return (
        <div className="m-4 flex items-center justify-center gap-5">
            <Camera_Card title={"دوربین کانتینر"} videoSrc={container_videoRef}/>
            <Camera_Card title={"دوربین پلاک خوان"} videoSrc={plate_videoRef}/>
            <Camera_Card title={"دوربین تشخیص چهره"} videoSrc={face_videoRef}/>
            
        </div>
    );
};

export default Camera;
