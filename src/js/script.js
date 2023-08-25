const startBtn = document.getElementById('btn-start');
const stopBtn = document.getElementById('btn-stop');
const contentVideo = document.getElementById('content-video');


let mediaRecorded ;
let recored = []

async function startRecording (){
    try {

        const stream = await navigator.mediaDevices.getDisplayMedia({video:true})
        mediaRecorded = new MediaRecorder(stream)
        mediaRecorded.ondataavailable = event => {
            if(event.data.size > 0){
                recored.push(event.data)
            }
        }

        mediaRecorded.onstop = () => {
            const blob = new Blob (recored, {type: 'video/webm'})
            contentVideo.src = URL.createObjectURL(blob)
        }

        startBtn.disabled = true;
        stopBtn.disabled = false;
        mediaRecorded.start();

    } catch (error) {
        console.log('erros is:'+ error);
    }
}

function stopRecording(){
    if(mediaRecorded.state === 'recording'){
        mediaRecorded.stop();
        startBtn.disabled = false
        stopBtn.disabled = true
        recored = []
    }
}

startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);