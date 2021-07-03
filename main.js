//https://teachablemachine.withgoogle.com/models/vlSWt-V7S/

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
    });
}

console.log("ML5 Version: ",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/vlSWt-V7S/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    synth=window.speechSynthesis;
    speakdata=prediction1;
    utterThis=new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        prediction1=results[0].label;
        speak();
        if(results[0].label=="Peace Sign"){
            document.getElementById("update_gesture").innerHTML="&#9996;";
        }
        if(results[0].label=="Perfect Sign"){
            document.getElementById("update_gesture").innerHTML="&#128076;";
        }
        if(results[0].label=="Thumbs Up"){
            document.getElementById("update_gesture").innerHTML="&#128077;";
        }
        if(results[0].label=="Thumbs Down"){
            document.getElementById("update_gesture").innerHTML="&#128078";
        }
        if(results[0].label=="Rock & Roll Sign"){
            document.getElementById("update_gesture").innerHTML="&#129304;";
        }
    }
}
