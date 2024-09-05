import numpy as np
import supervision as sv
from ultralytics import YOLO,RTDETR
from flask import Flask, request, send_file
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

box_annotator = sv.BoundingBoxAnnotator()

model = RTDETR("best_rtdetr.pt")
# model = YOLO("best_yolo.pt")

def frame_callback(frame: np.ndarray, _: int) -> np.ndarray:
    results = model(frame, conf=0.6)[0]
    detections = sv.Detections.from_ultralytics(results)
    return box_annotator.annotate(frame.copy(), detections=detections)


@app.route('/parking', methods=['POST'])
def detect():
    
    data = request.get_json()
    
    cam_name = data.get("cam_name")
    print(cam_name)
    
    sv.process_video(
        source_path=f"test/{cam_name}.mp4",
        target_path="result.mp4",
        callback=frame_callback
    )
    
    return send_file(
        "result.mp4",
        as_attachment=True,  # This tells the browser to download the file
        download_name=cam_name + '.mp4',  # Default filename for download
        mimetype='video/mp4'  # MIME type of the file
    )

app.run()