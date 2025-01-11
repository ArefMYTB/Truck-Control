"use client";
import React, { useEffect, useState } from 'react';
import './camera.scss';
import Camera_Card from '@/app/Components/Cards/Camera/camera_card';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Camera = () => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
          try {
            const response = await fetch("http://localhost:8000/api/videos/");
            if (!response.ok) throw new Error("Failed to fetch videos");
            const data = await response.json();
            setVideos(data);
          } catch (error) {
            console.error("Error fetching video data:", error);
            setLoading(false);
          }
        };
    
        fetchVideos();
      }, []);

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        
        // If dropped outside the list, do nothing
        if (!destination) return;

        // Reorder the items
        const reorderedVideos = Array.from(videos);
        const [removed] = reorderedVideos.splice(source.index, 1);
        reorderedVideos.splice(destination.index, 0, removed);

        setVideos(reorderedVideos);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="video-list" direction="horizontal">
                {(provided) => (
                <div
                    className="camera-section"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {videos.map((video, index) => (
                    <Draggable key={video.id} draggableId={video.id} index={index}>
                        {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <Camera_Card title={video.title} videoSrc={video.video_src} />
                        </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default Camera;
