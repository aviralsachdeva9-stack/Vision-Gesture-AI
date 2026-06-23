import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CameraOff, Activity, Zap } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const CAPTURE_INTERVAL_MS = 500;

const videoConstraints = {
  width: 720,
  height: 540,
  facingMode: "user",
};

export const Detector = () => {
  const webcamRef = useRef(null);
  const intervalRef = useRef(null);
  const inFlightRef = useRef(false);

  const [cameraOn, setCameraOn] = useState(true);
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]); // last few predictions
  const [error, setError] = useState(null);
  const [frameCount, setFrameCount] = useState(0);

  const captureAndPredict = useCallback(async () => {
    if (!webcamRef.current || inFlightRef.current) return;
    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) return;

    inFlightRef.current = true;
    try {
      const { data } = await axios.post(
        `${API}/predict`,
        { image: screenshot },
        { timeout: 4000 }
      );
      setPrediction(data);
      setFrameCount((n) => n + 1);
      setHistory((prev) => {
        if (prev[0]?.gesture === data.gesture && prev[0]?.label === data.label) {
          return prev;
        }
        return [data, ...prev].slice(0, 5);
      });
      setError(null);
    } catch (e) {
      setError(e?.message || "Prediction failed");
    } finally {
      inFlightRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (cameraOn) {
      intervalRef.current = setInterval(captureAndPredict, CAPTURE_INTERVAL_MS);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cameraOn, captureAndPredict]);

  const toggleCamera = () => {
    setCameraOn((v) => !v);
    if (cameraOn) {
      setPrediction(null);
    }
  };

  const confidencePct = prediction
    ? Math.round(prediction.confidence * 100)
    : 0;

  return (
    <main
      data-testid="detector-page"
      className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
        <div>
          <p className="font-mono-data text-xs uppercase tracking-[0.25em] text-[#E63946] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E63946] pulse-dot" />
            Live Studio
          </p>
          <h1
            data-testid="detector-title"
            className="font-display font-bold text-4xl md:text-6xl tracking-tighter leading-[0.95]"
          >
            Gesture Recognition<br />
            <span className="italic">Studio</span>
            <span className="text-[#E63946]">.</span>
          </h1>
        </div>
        <div className="flex items-center gap-6 font-mono-data text-xs uppercase tracking-widest text-[#555]">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-[#E63946]" />
            <span>500ms tick</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-[#E63946]" />
            <span>{frameCount} frames</span>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Webcam */}
        <div className="lg:col-span-7">
          <div className="relative border-2 border-[#111] bg-white p-2 shadow-[10px_10px_0_0_#111]">
            <div className="relative aspect-[4/3] bg-[#0a0a0a] overflow-hidden">
              {cameraOn ? (
                <>
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    screenshotQuality={0.7}
                    videoConstraints={videoConstraints}
                    mirrored
                    data-testid="webcam-feed"
                    className="w-full h-full object-cover"
                  />
                  {/* HUD overlays */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono-data text-[10px] uppercase tracking-widest text-white pointer-events-none">
                    <span className="bg-[#E63946] px-2 py-1">● REC</span>
                    <span className="bg-black/60 px-2 py-1 backdrop-blur">
                      720 × 540 · JPEG
                    </span>
                  </div>
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-6 top-6 w-8 h-8 border-t-2 border-l-2 border-[#E63946]" />
                    <div className="absolute right-6 top-6 w-8 h-8 border-t-2 border-r-2 border-[#E63946]" />
                    <div className="absolute left-6 bottom-6 w-8 h-8 border-b-2 border-l-2 border-[#E63946]" />
                    <div className="absolute right-6 bottom-6 w-8 h-8 border-b-2 border-r-2 border-[#E63946]" />
                  </div>
                  <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E63946] to-transparent scan-line opacity-70 pointer-events-none" />
                </>
              ) : (
                <div
                  data-testid="webcam-off-placeholder"
                  className="flex flex-col items-center justify-center h-full text-[#F7F5F0]/60 gap-3"
                >
                  <CameraOff size={48} strokeWidth={1.5} />
                  <p className="font-mono-data text-xs uppercase tracking-widest">
                    Camera is off
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={toggleCamera}
              data-testid="toggle-camera-button"
              className={`inline-flex items-center gap-3 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold border-2 border-[#111] transition-colors ${
                cameraOn
                  ? "bg-[#111] text-[#F7F5F0] hover:bg-[#E63946] hover:border-[#E63946]"
                  : "bg-[#F7F5F0] text-[#111] hover:bg-[#111] hover:text-[#F7F5F0]"
              }`}
            >
              {cameraOn ? <CameraOff size={16} /> : <Camera size={16} />}
              {cameraOn ? "Stop Camera" : "Start Camera"}
            </button>
            {error && (
              <span
                data-testid="detector-error"
                className="font-mono-data text-xs text-[#E63946] uppercase tracking-widest"
              >
                ⚠ {error}
              </span>
            )}
          </div>

          {/* Hint strip */}
          <div className="mt-6 border-t border-[#111]/20 pt-4 font-mono-data text-xs text-[#555] uppercase tracking-widest">
            Tip · keep your hand 30–60 cm from the lens. Plain background works best.
          </div>
        </div>

        {/* Result Card */}
        <div className="lg:col-span-5">
          <div
            data-testid="result-card"
            className="bg-[#111] text-[#F7F5F0] p-8 md:p-10 min-h-[520px] flex flex-col justify-between relative overflow-hidden border-2 border-[#111]"
          >
            {/* Background glyph */}
            <div className="absolute -right-10 -bottom-16 font-display font-bold text-[14rem] leading-none text-white/[0.04] select-none pointer-events-none">
              VGAi
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono-data text-[10px] uppercase tracking-[0.3em] text-[#F7F5F0]/60">
                  Detected Gesture
                </span>
                <span
                  className={`font-mono-data text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 ${
                    cameraOn ? "text-[#E63946]" : "text-[#F7F5F0]/40"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 ${
                      cameraOn ? "bg-[#E63946] pulse-dot" : "bg-[#F7F5F0]/40"
                    }`}
                  />
                  {cameraOn ? "LIVE" : "IDLE"}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={prediction?.gesture ?? "idle"}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  data-testid="prediction-result"
                  className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.95] uppercase text-[#E63946] glow-red"
                >
                  {prediction?.gesture || (cameraOn ? "Reading…" : "—")}
                </motion.div>
              </AnimatePresence>

              {prediction && (
                <div className="mt-8 space-y-4">
                  <div>
                    <div className="flex items-center justify-between font-mono-data text-[10px] uppercase tracking-widest text-[#F7F5F0]/60 mb-2">
                      <span>Confidence</span>
                      <span data-testid="prediction-confidence">
                        {confidencePct}%
                      </span>
                    </div>
                    <div className="h-1 bg-[#F7F5F0]/15 overflow-hidden">
                      <motion.div
                        animate={{ width: `${confidencePct}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-[#E63946]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="font-mono-data text-[10px] uppercase tracking-widest text-[#F7F5F0]/60 mb-1">
                        Label
                      </p>
                      <p
                        data-testid="prediction-label"
                        className="font-mono-data text-sm"
                      >
                        {prediction.label}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono-data text-[10px] uppercase tracking-widest text-[#F7F5F0]/60 mb-1">
                        Action
                      </p>
                      <p
                        data-testid="prediction-action"
                        className="font-mono-data text-sm"
                      >
                        {prediction.action}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recent log */}
            <div className="relative z-10 pt-8 mt-8 border-t border-white/10">
              <p className="font-mono-data text-[10px] uppercase tracking-[0.3em] text-[#F7F5F0]/60 mb-3">
                Recent Sequence
              </p>
              {history.length === 0 ? (
                <p className="font-mono-data text-xs text-[#F7F5F0]/40">
                  No frames analyzed yet.
                </p>
              ) : (
                <ul
                  data-testid="prediction-history"
                  className="space-y-1.5 font-mono-data text-xs text-[#F7F5F0]/80"
                >
                  {history.map((h, idx) => (
                    <li
                      key={`${h.timestamp}-${idx}`}
                      className="flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[#E63946]">▸</span>
                        {h.gesture}
                      </span>
                      <span className="text-[#F7F5F0]/40">
                        {Math.round(h.confidence * 100)}%
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Detector;