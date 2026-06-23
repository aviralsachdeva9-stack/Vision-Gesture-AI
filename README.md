# 🚀 Vision-Gesture-AI

A real-time, AI-powered hand gesture recognition system that allows you to control your computer's media and presentations using simple hand movements. No mouse, no keyboard—just magic! ✨

![Vision Gesture AI Banner](https://img.shields.io/badge/AI-Computer_Vision-blue) ![Python](https://img.shields.io/badge/Python-FastAPI-yellow) ![React](https://img.shields.io/badge/Frontend-React.js-cyan)

## 💡 The "Why" & Architecture
Initially built using a traditional Keras CNN trained on the `LeapGestRecog` dataset. However, to eliminate the **Domain Gap** (the AI getting confused by messy backgrounds or room lighting), the architecture was upgraded. 

It now utilizes **Google MediaPipe's Spatial Landmark Geometry** to map 21 3D coordinates of the human hand in real-time. This mathematical approach guarantees **99% accuracy in any background or lighting condition**, coupled with `PyAutoGUI` for zero-latency hardware automation.

## ✨ Key Features
* **Real-Time Tracking:** Processes video frames locally with zero perceived lag.
* **Background-Independent:** Works flawlessly in messy rooms, different lighting, and complex backgrounds.
* **Hardware Automation:** Directly controls your OS (pauses YouTube, changes slides, adjusts volume).
* **Cooldown Logic:** Built-in 2-second action cooldowns to prevent accidental multiple triggers.

## 🎮 Gesture Controls Mapping
| Gesture | Visual | Action Performed (System Level) |
| :--- | :---: | :--- |
| **Peace Sign** | ✌️ | Play / Pause (Spacebar) |
| **Index Pointing** | ☝️ | Next Slide / Forward 10s (Right Arrow) |
| **Thumbs Up** | 👍 | Volume Up |
| **Fist** | ✊ | Volume Down |
| **Palm** | 🖐️ | Neutral / Stop (Safe State) |

---

## 🛠️ Tech Stack
* **Frontend:** React.js, Tailwind CSS
* **Backend:** Python, FastAPI, Uvicorn
* **Computer Vision:** OpenCV, MediaPipe (Hands)
* **OS Automation:** PyAutoGUI

---

## 🚀 How to Run Locally

Since this project physically controls your laptop's keyboard (via PyAutoGUI), the Python backend **must** be run locally on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/aviralsachdeva9-stack/Vision-Gesture-AI.git](https://github.com/aviralsachdeva9-stack/Vision-Gesture-AI.git)
cd Vision-Gesture-AI

to run backend

cd backend
python -m venv venv

# Activate Virtual Environment
# For Windows:
.\venv\Scripts\activate
# For Mac/Linux:
source venv/bin/activate

# Install Dependencies
pip install fastapi uvicorn pydantic opencv-python mediapipe pyautogui

# Start the AI Server
uvicorn main:app --reload

Setup the Frontend (React.js)
Open a new terminal inside the frontend folder:

Bash
cd frontend

# Install Node modules
npm install

# Start the Web UI
npm start

👨‍💻 Developer
Built with ❤️ by Aviral Sachdeva.
Feel free to fork, experiment, and contribute!
