song1= "";
song2="";
leftWristX = 0;
leftWristY = 0;
rightWristX =0;
rightWristY = 0;
scoreLeftWrist = 0;
song_status = "";
scoreRightWrist = "0";


function preload() {
 song1 = loadSound("music.mp3");
 song2 = loadSound("music2.mp3");
}

function setup() {
canvas = createCanvas(600 , 500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video , modelLoaded);
poseNet.on('pose' , gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized!')
}

function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video , 0 , 0 , 600 , 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX , leftWristY , 20);
        song_status = song1.isPlaying();

        if(song_status == false)
        {
            song2.stop();
            console.log("Song is playing!");
            song1.play();
            document.getElementById("song_name").innerHTML = "Harry Potter Theme Song"
        }

        

    }

    if(scoreRightWrist > 0.2)
    {
        circle(leftWristX , leftWristY , 20);
        song_status = song2.isPlaying();

        if(song_status == false)
        {
            song1.stop();
            console.log("Song is playing!");
            song2.play();
            document.getElementById("song_name").innerHTML = "Peter pan Theme Song"
        }

        

    }

}

function play() {
    song1.play();
    song2.stop();
}