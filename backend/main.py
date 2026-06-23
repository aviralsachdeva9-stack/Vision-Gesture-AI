import base64
import numpy as np
import cv2
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mediapipe as mp
import pyautogui

# Failsafe: Agar mouse control out of control ho jaye toh mouse ko screen ke ekdum corner mein le jana, program ruk jayega.
pyautogui.FAILSAFE = False

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.7)

ACTION_MAPPING = {
    "Palm": "Stop / Reset",
    "Fist": "Volume Down",
    "Thumbs Up": "Volume Up",
    "Peace Sign": "Play / Pause",
    "Index Pointing": "Next Track / Slide",
    "Unknown": "None"
}

class ImageData(BaseModel):
    image: str

# Cooldown Timer (Taaki 1 gesture se 10 baar button press na ho jaye)
last_action_time = 0
COOLDOWN_SECONDS = 2.0  # Ek baar button dabane ke baad 2 second ka wait

def detect_gesture_from_landmarks(landmarks):
    thumb_tip = landmarks[4]
    thumb_ip = landmarks[3]
    index_tip = landmarks[8]
    index_pip = landmarks[6]
    middle_tip = landmarks[12]
    middle_pip = landmarks[10]
    ring_tip = landmarks[16]
    ring_pip = landmarks[14]
    pinky_tip = landmarks[20]
    pinky_pip = landmarks[18]

    index_up = index_tip.y < index_pip.y
    middle_up = middle_tip.y < middle_pip.y
    ring_up = ring_tip.y < ring_pip.y
    pinky_up = pinky_tip.y < pinky_pip.y
    thumb_up = thumb_tip.y < thumb_ip.y and thumb_tip.y < index_pip.y

    if index_up and middle_up and ring_up and pinky_up: return "Palm"
    elif not index_up and not middle_up and not ring_up and not pinky_up:
        if thumb_up: return "Thumbs Up"
        else: return "Fist"
    elif index_up and middle_up and not ring_up and not pinky_up: return "Peace Sign"
    elif index_up and not middle_up and not ring_up and not pinky_up: return "Index Pointing"
    else: return "Unknown"

@app.post("/api/predict")
async def predict_gesture(data: ImageData):
    global last_action_time
    
    try:
        encoded_data = data.image.split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = hands.process(img_rgb)
        
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                gesture_name = detect_gesture_from_landmarks(hand_landmarks.landmark)
                action = ACTION_MAPPING.get(gesture_name, "None")
                confidence = 99 if gesture_name != "Unknown" else 0
                
                # ---------------------------------------------------------
                # 🔥 ASLI JAADU YAHAN HAI: Keyboard Automation
                # ---------------------------------------------------------
                current_time = time.time()
                if gesture_name != "Unknown" and (current_time - last_action_time) > COOLDOWN_SECONDS:
                    
                    if gesture_name == "Peace Sign":
                        pyautogui.press('space') # YouTube pause/play ke liye spacebar
                        last_action_time = current_time
                        
                    elif gesture_name == "Index Pointing":
                        pyautogui.press('right') # Next slide ya YouTube par 10 sec aage
                        last_action_time = current_time
                        
                    elif gesture_name == "Thumbs Up":
                        pyautogui.press('volumeup') # Awaaz badhane ke liye
                        last_action_time = current_time
                        
                    elif gesture_name == "Fist":
                        pyautogui.press('volumedown') # Awaaz kam karne ke liye
                        last_action_time = current_time
                        
                    elif gesture_name == "Palm":
                        # Palm ko humne "stop/reset" rakha hai, ispe koi button press mat karao
                        last_action_time = current_time
                # ---------------------------------------------------------

                return {
                    "gesture": gesture_name.upper(),
                    "confidence": confidence,
                    "label": gesture_name.lower(),
                    "action": action
                }
                
        return {"gesture": "NO HAND", "confidence": 0, "label": "none", "action": "Waiting..."}
        
    except Exception as e:
        print(f"Error processing frame: {e}")
        return {"gesture": "ERROR", "confidence": 0, "label": "none", "action": "None"}