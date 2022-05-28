import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

// capturing student image using webcam

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

let imageSrc = "";

// capturing student image with the help of react-webcam

const CaptureImage = (props) => {
  const [image, setImage] = useState("");
  const webcamRef = useRef(null);

  const capture = React.useCallback(() => {
    imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner animate">
        {image === "" ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="video"
          />
        ) : (
          <img className="video" src={image} alt="profileImage" />
        )}

        {image !== "" ? (
          <div style={{ marginLeft: "14rem", marginTop: "1rem" }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setImage("");
              }}
              className="webcam-btn"
            >
              Retake Image
            </button>
            <button className="webcam-btn" onClick={props.handleClose}>
              Close
            </button>
          </div>
        ) : (
          <div style={{ marginLeft: "14rem", marginTop: "1rem" }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="webcam-btn"
            >
              Capture
            </button>
            <button className="webcam-btn" onClick={props.handleClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export { imageSrc };
export default CaptureImage;
