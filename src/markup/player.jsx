import React from 'react';
import ReactPlayer from 'react-player';

const Player = ({ url, preview, videoId }) => {
 const playerRef = React.useRef();

 const onReady = React.useCallback(() => {
     const timeToStart = JSON.parse(localStorage.getItem("videoplayer-current-time"));
     timeToStart.forEach(it => {
    if (it.videoId === videoId) {
        playerRef.current.seekTo(it.currentTime, 'seconds');
    }})
}, [ videoId]);
    
    function setCurrentTime(seconds, id) {

        let newLocalStorageItem = { currentTime: seconds, videoId: id }
        let localStorageData = JSON.parse(localStorage.getItem("videoplayer-current-time"))

        if (!localStorageData) {
            localStorage.setItem('videoplayer-current-time', JSON.stringify([newLocalStorageItem]))
        } else {
            const updateData = localStorageData.filter(it => it.videoId !== newLocalStorageItem.videoId)
            const newLocalStorageData = [newLocalStorageItem, ...updateData ]            
            setTimeout(() => {
                localStorage.setItem('videoplayer-current-time', JSON.stringify(newLocalStorageData))
            }, 3000);
        }
    }

    return (
     
   
               <ReactPlayer
                    ref={playerRef}
                    onReady={onReady}
                    onProgress={(progress) => {
                        setCurrentTime(progress.playedSeconds, videoId)
                    }}
                    url={url}
                    light={preview }
            controls 
            width="100%"
                    /> 

     
 )
}

export default Player;