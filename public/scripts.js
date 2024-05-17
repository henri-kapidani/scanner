const url = '/upload';
const timeout = 2000;

const width = 320;
let height = 0;
let streaming = false;
let interval = null;

video = document.getElementById('video');
canvas = document.getElementById('canvas');
btnStart = document.getElementById('btn-start');

btnStart.addEventListener('click', function () {
    if (interval) {
        console.log('true');
        clearInterval(interval);
        interval = null;
    } else {
        console.log('false');
        interval = setInterval(sendPicture, timeout);
    }
});

navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.error(`An error occurred: ${err}`);
    });

video.addEventListener(
    'canplay',
    (ev) => {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);

            // Firefox currently has a bug where the height can't be read from
            // the video, so we will make assumptions if this happens.

            if (isNaN(height)) {
                height = width / (4 / 3);
            }

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
    },
    false
);

function takePicture() {
    const context = canvas.getContext('2d');
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        const data = canvas.toDataURL('image/png');
        return data;
    }
}

function sendPicture() {
    const picture = takePicture();
    console.log(picture);
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ picture }),
    });
}
