import { useEffect, useRef, useState } from "react";
import { Pencil, Eraser, Trash2, Download, Palette } from "lucide-react";

const Board = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);
  
  const colors = ["#000000", "#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ec4899"];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth - 48;
    canvas.height = window.innerHeight - 140;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, []);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    ctxRef.current.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = url;
    link.click();
  };

  useEffect(() => {
    if (tool === "eraser") {
      ctxRef.current.globalCompositeOperation = "destination-out";
      ctxRef.current.lineWidth = 20;
    } else {
      ctxRef.current.globalCompositeOperation = "source-over";
      ctxRef.current.strokeStyle = color;
      ctxRef.current.lineWidth = lineWidth;
    }
  }, [tool, color, lineWidth]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Toolbar */}
      <div className="px-6 py-4 bg-white/80 backdrop-blur-md border-b-2 border-slate-300 shadow-lg">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          {/* Left Section - Tools */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mr-2">
              Whiteboard
            </h1>
            
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-300">
              <button
                onClick={() => setTool("pen")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tool === "pen"
                    ? "bg-blue-500 text-white shadow-lg scale-105"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                <Pencil size={16} />
                <span>Pen</span>
              </button>

              <button
                onClick={() => setTool("eraser")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tool === "eraser"
                    ? "bg-blue-500 text-white shadow-lg scale-105"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                <Eraser size={16} />
                <span>Eraser</span>
              </button>
            </div>
          </div>

          {/* Middle Section - Colors & Width */}
          {tool === "pen" && (
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border-2 border-slate-300 shadow-sm">
                <Palette size={18} className="text-slate-600" />
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-8 h-8 rounded-full transition-all border-2 ${
                        color === c 
                          ? "ring-2 ring-offset-2 ring-blue-500 scale-110 border-white" 
                          : "border-slate-300 hover:scale-105"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border-2 border-slate-300 shadow-sm">
                <span className="text-sm text-slate-600 font-semibold">Size:</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={lineWidth}
                  onChange={(e) => setLineWidth(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm font-bold text-slate-700 w-6 text-center">{lineWidth}</span>
              </div>
            </div>
          )}

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={downloadCanvas}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-sm font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 border border-green-600"
            >
              <Download size={16} />
              <span>Save</span>
            </button>

            <button
              onClick={clearCanvas}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl text-sm font-semibold hover:from-red-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 border border-red-600"
            >
              <Trash2 size={16} />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Container with Border */}
      <div className="flex items-center justify-center p-6 h-[calc(100vh-92px)]">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-300 bg-white">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="cursor-crosshair bg-white"
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;