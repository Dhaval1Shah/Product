import AuthApi from './components/Services/Authapi';

let captureStream;

export const getAccess = async () => {
    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia();
        // console.log(captureStream)
    } catch (err) {
        console.error("Error: " + err);
    }
};


export const capture = async () => {

    console.log("heelo")

    // let canvas = document.createElement('canvas');

    // // Request media
    // navigator.mediaDevices.getDisplayMedia().then(stream => {
    //     // Grab frame from stream
    //     let track = stream.getVideoTracks()[0];
    //     let capture = new ImageCapture(track);
    //     capture.grabFrame().then(bitmap => {
    //         // Stop sharing
    //         track.stop();

    //         // Draw the bitmap to canvas
    //         canvas.width = bitmap.width;
    //         canvas.height = bitmap.height;
    //         canvas.getContext('2d').drawImage(bitmap, 0, 0);
    //         const image = canvas.toDataURL("image/png")
    //         console.log(image)
    //         return image;
    //         // Grab blob from canvas
    //         canvas.toBlob(blob => {
    //             // Do things with blob here
    //             console.log('output blob:', blob);
    //         });
    //     });
    // })
    //     .catch(e => console.log(e));

    // const stream = await navigator.mediaDevices.getDisplayMedia({
    //     video: { mediaSource: 'screen' },
    // })
    // // get correct video track
    // const track = stream.getVideoTracks()[0]
    // // init Image Capture and not Video stream
    // const imageCapture = new ImageCapture(track)
    // // take first frame only
    // const bitmap = await imageCapture.grabFrame()
    // // destory video track to prevent more recording / mem leak
    // track.stop()

    // const canvas = document.createElement("canvas");
    // console.log(canvas)
    // canvas.width = bitmap.width
    // canvas.height = bitmap.height
    // const context = canvas.getContext('2d')
    // context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
    // const image = canvas.toDataURL("image/png")
    // console.log(image)

    // // this turns the base 64 string to a [File] object
    // const res = await fetch(image)
    // const buff = await res.arrayBuffer()
    // // clone so we can rename, and put into array for easy proccessing
    // const file = [
    //     new File([buff], `photo_${new Date()}.jpg`, {
    //         type: 'image/jpeg',
    //     }),
    // ]
    // return file

    // if (captureStream !== undefined || captureStream !== 'undefined') {
    //     let frame
    //     try {
    //         const canvas = document.createElement("canvas");
    //         const context = canvas.getContext("2d");
    //         const video = document.createElement("video");
    //         video.srcObject = captureStream;
    //         context.drawImage(video, 0, 0, window.width, window.height);
    //         console.log(context)
    //         frame = canvas.toDataURL("image/png");


    //         // window.location.href = frame;
    //         console.log(frame)
    //         // let get = await AuthApi.screenShotCapture();
    //         // console.log(get)
    //         return frame;
    //     } catch (err) {
    //         console.error("Error: " + err);
    //     }

    // }
    // return null;
};



export const revokeAccess = async () => {
    try {
        captureStream.getTracks().forEach(track => track.stop());
    } catch (err) {
        console.error("Error: " + err);
    }
};

