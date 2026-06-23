import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, BrainCircuit, Gauge, ArrowUpRight } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-time Processing",
    desc: "Live frames are streamed and analyzed every 500ms. No lag, no buffering — pure responsive vision.",
    tag: "01",
  },
  {
    icon: BrainCircuit,
    title: "CNN Intelligence",
    desc: "A multi-layer Convolutional Neural Network learns the geometry of your hand — fingers, palm, orientation.",
    tag: "02",
  },
  {
    icon: Gauge,
    title: "Low Latency",
    desc: "FastAPI + optimized TensorFlow inference keeps the round-trip under a heartbeat.",
    tag: "03",
  },
];

const stack = [
  { name: "Python", note: "Backend runtime" },
  { name: "TensorFlow", note: "CNN training & inference" },
  { name: "OpenCV", note: "Frame preprocessing" },
  { name: "FastAPI", note: "Async API layer" },
  { name: "React", note: "Interactive client" },
];

export const Home = () => {
  return (
    <main data-testid="home-page" className="relative z-10">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8 font-mono-data text-xs uppercase tracking-[0.25em] text-[#555]">
              <span className="w-2 h-2 bg-[#E63946] pulse-dot" />
              Vision Gesture AI · v1.0
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              data-testid="hero-title"
              className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.92]"
            >
              Master Your<br />
              Machines with<br />
              <span className="italic">a Wave</span>
              <span className="text-[#E63946]">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-8 max-w-xl text-base md:text-lg text-[#333] leading-relaxed"
            >
              A frontier interface where computer vision reads your hand in
              real-time and translates intent into action. No remotes. No
              keyboards. Just gestures.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/detector"
                data-testid="hero-launch-button"
                className="inline-flex items-center gap-3 bg-[#111] text-[#F7F5F0] px-8 py-4 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-[#E63946] transition-colors group"
              >
                Launch App
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </Link>
              <a
                href="#how"
                data-testid="hero-how-link"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm uppercase tracking-[0.2em] font-semibold border border-[#111] hover:bg-[#111] hover:text-[#F7F5F0] transition-colors"
              >
                How it works
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <div className="relative border-2 border-[#111] bg-white p-2 shadow-[10px_10px_0_0_#111]">
              <img
                src="https://images.unsplash.com/photo-1635781348389-25f14601a340?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwyfHxodW1hbiUyMGhhbmQlMjBhYnN0cmFjdHxlbnwwfHx8fDE3ODIxMTMyNzd8MA&ixlib=rb-4.1.0&q=85"
                alt="Hand reaching"
                className="w-full aspect-[4/5] object-cover grayscale"
              />
              <div className="absolute top-4 left-4 bg-[#111] text-[#F7F5F0] px-3 py-1 font-mono-data text-[10px] uppercase tracking-widest">
                Live · 30 fps
              </div>
              <div className="absolute bottom-4 right-4 bg-[#E63946] text-white px-3 py-1 font-mono-data text-[10px] uppercase tracking-widest">
                Gesture detected
              </div>
            </div>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="mt-20 border-y border-[#111]/30 py-5 overflow-hidden">
          <div className="flex items-center gap-12 font-mono-data text-xs uppercase tracking-[0.3em] text-[#555]">
            <span>Thumbs Up → Confirm</span>
            <span className="text-[#E63946]">●</span>
            <span>Peace Sign → Pause</span>
            <span className="text-[#E63946]">●</span>
            <span>Open Palm → Stop</span>
            <span className="text-[#E63946]">●</span>
            <span>Pointing → Move</span>
            <span className="text-[#E63946]">●</span>
            <span>Fist → Grab</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="how" className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <p className="font-mono-data text-xs uppercase tracking-[0.25em] text-[#E63946] mb-4">
              [ How it Works ]
            </p>
            <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tighter leading-[0.95] max-w-2xl">
              Three pillars,<br />
              one fluid system.
            </h2>
          </div>
          <p className="md:max-w-sm text-sm text-[#555] leading-relaxed">
            From the lens of your webcam to a prediction inside a heartbeat —
            here's what makes the pipeline tick.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-testid={`feature-card-${i}`}
              className={`group bg-[#EFECE6] border-2 border-[#111] p-8 md:p-10 hover:bg-[#111] hover:text-[#F7F5F0] transition-colors duration-300 ${
                i === 1 ? "md:mt-12" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-8">
                <f.icon
                  size={36}
                  strokeWidth={1.5}
                  className="text-[#E63946]"
                />
                <span className="font-mono-data text-xs opacity-60">
                  {f.tag}
                </span>
              </div>
              <h3 className="font-display font-semibold text-2xl md:text-3xl tracking-tight mb-4">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-80">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-[#111] text-[#F7F5F0] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="font-mono-data text-xs uppercase tracking-[0.25em] text-[#E63946] mb-4">
              [ About the Project ]
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.95]">
              Where neural<br />
              networks meet<br />
              <span className="italic">human nuance</span>.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg md:text-xl leading-relaxed text-[#F7F5F0]/85">
              Vision Gesture AI is built on a tight stack of{" "}
              <span className="text-[#E63946] font-semibold">Python</span>,{" "}
              <span className="text-[#E63946] font-semibold">TensorFlow</span>,
              and{" "}
              <span className="text-[#E63946] font-semibold">OpenCV</span>.
              OpenCV captures and pre-processes every frame from your webcam.
              TensorFlow runs a Convolutional Neural Network — trained on
              15,000+ images across skin tones, hand sizes and backgrounds —
              that maps spatial features to a gesture vocabulary. FastAPI
              wraps it all in an async layer so React can render predictions
              with sub-second latency.
            </p>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 border-t border-white/15 pt-10">
              {stack.map((s) => (
                <div key={s.name}>
                  <p className="font-display font-bold text-2xl tracking-tight">
                    {s.name}
                  </p>
                  <p className="font-mono-data text-xs uppercase tracking-widest text-[#F7F5F0]/50 mt-1">
                    {s.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                to="/detector"
                data-testid="about-launch-button"
                className="inline-flex items-center gap-3 bg-[#E63946] text-white px-8 py-4 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-[#F7F5F0] hover:text-[#111] transition-colors"
              >
                Launch App
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;