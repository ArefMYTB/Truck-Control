while true; do
    ffmpeg -rtsp_transport tcp -i "rtsp://admin:Admin@123@192.168.10.10:554" \
        -vf scale=640:480 \
        -c:v libx264 -preset ultrafast -crf 30 -f hls \
        -hls_time 2 -hls_list_size 5 -hls_flags delete_segments+append_list stream_plate.m3u8

    echo "FFmpeg crashed. Restarting..."
done
