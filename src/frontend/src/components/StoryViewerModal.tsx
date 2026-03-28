import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface StoryViewerModalProps {
  story: { username: string; avatar: string } | null;
  onClose: () => void;
}

export function StoryViewerModal({ story, onClose }: StoryViewerModalProps) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!story) {
      setProgress(0);
      return;
    }
    setProgress(0);
    const start = Date.now();
    const duration = 5000;
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(intervalRef.current!);
        onClose();
      }
    }, 50);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [story, onClose]);

  return (
    <AnimatePresence>
      {story && (
        <motion.div
          data-ocid="story.modal"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-sm h-[90vh] max-h-[700px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Story image */}
            <img
              src={`https://picsum.photos/seed/${story.username}/400/700`}
              alt={`${story.username}'s story`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay top */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 pointer-events-none" />

            {/* Progress bar */}
            <div className="absolute top-3 left-3 right-3">
              <div className="h-0.5 rounded-full bg-white/30 overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Header */}
            <div className="absolute top-7 left-0 right-0 flex items-center gap-3 px-4">
              <div className="w-10 h-10 rounded-full story-ring flex-shrink-0">
                <div className="bg-black rounded-full p-0.5">
                  <img
                    src={story.avatar}
                    alt={story.username}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-white font-semibold text-sm drop-shadow">
                {story.username}
              </span>
              <button
                type="button"
                data-ocid="story.close_button"
                className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                onClick={onClose}
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
