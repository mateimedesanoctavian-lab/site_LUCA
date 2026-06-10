import { useRef, useState } from "react";
import { GripVertical } from "lucide-react";

export const BeforeAfterSlider = ({ before, after, label = "" }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  };

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseUp = () => { isDragging.current = false; };
  const onMouseMove = (e) => {
    if (isDragging.current) handleMove(e.clientX);
  };
  const onTouchMove = (e) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-muted"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={onMouseDown}
      onTouchEnd={onMouseUp}
      onTouchMove={onTouchMove}
      data-testid={`before-after-slider-${label}`}
    >
      {/* After image (background) */}
      <img
        src={after}
        alt="După"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable="false"
      />
      <div className="absolute bottom-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider z-10">
        După
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt="Înainte"
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${(100 / position) * 100}%`, maxWidth: "none" }}
          draggable="false"
        />
        <div className="absolute bottom-4 left-4 bg-earth/95 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider"
          style={{ backgroundColor: "#78350F" }}
        >
          Înainte
        </div>
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center">
          <GripVertical size={20} className="text-primary" />
        </div>
      </div>

      {/* Invisible range input for accessibility / keyboard */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        data-testid={`before-after-input-${label}`}
        aria-label="Slider înainte și după"
      />
    </div>
  );
};
