import React, { useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import Swal from "sweetalert2";

var match = "";
let studentdata;

const CompareImage = (props) => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);

  useEffect(() => {
    const setData = async () => {
      studentdata = await JSON.parse(localStorage.getItem("student"));
    };
    setData();
  }, []);

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";

      Promise.all([
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      ]).then(() => {
        setModelsLoaded(true);
        startVideo();
      });
    };
      loadModels();
    
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const loadLabledImages = () => {
    const labels = [];
    labels.push(studentdata.name);

    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];

        const imgUrl = await faceapi.fetchImage(studentdata.image);

        const detections = await faceapi
          .detectSingleFace(imgUrl)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);

        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  };

  const handleVideoOnPlay = async () => {
    const labeledDescriptors = await loadLabledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
    var idx = 0;

    var x = setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(videoRef.current)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, videoWidth, videoHeight);

        const results = resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });

        results.forEach((result, i) => {
          if (result._label === studentdata.name) {
            
            function showCanvas() {
              const box = resizedDetections[i].detection.box;
              const drawBox = new faceapi.draw.DrawBox(box, {
                label: result._label.toString(),
              });
              drawBox.draw(canvasRef.current);
            }
            showCanvas();
            idx++;
            if (idx === 15) {
              match = studentdata.name;
              clearInterval(x);
              closeWebcam();
            }
          } else {
            const box = resizedDetections[i].detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, {
              label: result._label.toString(),
            });
            drawBox.draw(canvasRef.current);
            idx++;
            if (idx === 15) {
              Swal.fire({
                icon: "error",
                title: "Failed to mark attendance. Your face does not match",
              });
              closeWebcam();
            }
          }
        });
      }
    }, 100);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
    props.handleClose();
  };
  return (
    <div className="popup">
      <div className="popup-inner">
        {captureVideo && modelsLoaded && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <video
              ref={videoRef}
              height={videoHeight}
              width={videoWidth}
              onPlay={handleVideoOnPlay}
              style={{ borderRadius: "10px" }}
            />
            <canvas ref={canvasRef} style={{ position: "absolute" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export { match };
export default CompareImage;
