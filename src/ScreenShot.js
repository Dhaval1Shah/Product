
let captureStream;

export const getAccess = async () => {
    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia();
    } catch (err) {
        console.error("Error: " + err);
    }
};
export const capture = async () => {
    if (captureStream !== undefined || captureStream !== 'undefined') {
        let frame
        try {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const video = document.createElement("video");
            video.srcObject = captureStream;
            context.drawImage(video, 0, 0, window.width, window.height);
            frame = canvas.toDataURL("image/png");
            // window.location.href = frame;
            // console.log(frame)
            return frame;
        } catch (err) {
            console.error("Error: " + err);
        }

    }
    return null;
};
export const revokeAccess = async () => {
    try {
        captureStream.getTracks().forEach(track => track.stop());
    } catch (err) {
        console.error("Error: " + err);
    }
};

