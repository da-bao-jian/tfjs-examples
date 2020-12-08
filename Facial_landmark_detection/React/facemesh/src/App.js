//install dependencies 
//import dependencies

//setup webcam
//define references
//load facemesh
//detect function 

//drawing utilities
//load triangulation 
//setup triangle path 
//setup point drawing 
//add drawmesh to detect function



import logo from './logo.svg';
import './App.css';
import React, {useRef} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';
import { drawMesh } from "./utilities";


function App() {
  //create references
  const webcamref = useRef(null);
  const canvas = useRef(null);

  //laoding facemesh
  const face = async ()=>{
    const net = await facemesh.load({
      inputResolution: {width: 600, height: 480}, scale:0.8
    })
    setInterval(()=>{
      detection(net)
    }, 100)
  };

  //setup detect function
  const detection = async (net)=>{
    if(typeof webcamref.current !== 'undefined' && webcamref.current !== null){
      //get video properties
      const video = webcamref.current.video; //HTMLVideoELement
      const videoWidth = webcamref.current.video.videoWidth;
      const videoHeight = webcamref.current.video.videoHeight;

      //set video width
      webcamref.current.video.width = videoWidth;
      webcamref.current.video.height = videoHeight;

      //set canvas width
      canvas.current.width = videoWidth;
      canvas.current.height = videoHeight;

      //make detections
      const faceDetect = await net.estimateFaces(video); //feed the video for detection thru estimateFaces API 
      console.log(faceDetect);

      //get canvas context for drawing
      const ctx = canvas.current.getContext("2d");
      drawMesh(face, ctx);

    }
  }
  //invoke the function
  face();

  return (
    <div className="App">

      <Webcam ref={webcamref} style={
        {
          position:'absolute',
          marginLeft: 'auto',
          marginRight:'auto',
          right:0,
          left:0,
          testAlign: 'centr',
          zIndex:9,
          width: 600,
          height: 480
        }
      }/>
      <canvas ref={canvas}
      style={
        {
          position:'absolute',
          marginLeft: 'auto',
          right:0,
          left:0,
          testAlign: 'centr',
          zIndex:9,
          width: 600,
          height: 480
        }
      }
      />
    </div>
  );
}

export default App;
