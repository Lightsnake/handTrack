const modelParams ={
    flipHorizontal: true,
    imageScaleFactor: 0.7,
    maxNumBoxes:20,
    iouThreshold: 0.5,
    scoreThreshold: 0.79
}


navigator.getUserMedia = 
    navigator.getUserMedia||
    navigator.webkitGetUserMedia||
    navigator.mozGetUserMedia||
    navigator.msGetUserMedia;

//Select everything in the html

const video = document.getElementById('video');
const audio = document.getElementById('audio');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let model;

handTrack.startVideo(video)
    .then(status=>{
        if( status ){
            navigator.getUserMedia({video: {}}, stream => {
                video.srcObject = stream;
                setInterval(runDetection, 1000);
            },
            err =>console.log(err) 
        );
        }
    })

function runDetection(){
    model.detect(video)
        .then(predictions => {
            console.log(predictions)
            if(predictions.length>0){
                audio.play();
            }
        })
}

handTrack.load(modelParams).then(lmodel=>{
        model = lmodel;
    });