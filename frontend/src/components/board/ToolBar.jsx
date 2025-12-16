import { Pencil, Eraser, Trash2 } from "lucide-react";

const Toolbar = ({ setTool, clearCanvas, currentTool }) => {
  return (
    <div className="fixed top-6 left-6 bg-white shadow-xl rounded-2xl p-3 flex flex-col gap-2 z-50 border border-slate-200">
      {/* Pen Tool */}
      <button
        onClick={() => setTool("pen")}
        className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
          currentTool === "pen"
            ? "bg-blue-500 text-white shadow-lg scale-105"
            : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:scale-105"
        }`}
        title="Pen Tool"
      >
        <Pencil size={20} />
        
        {/* Tooltip */}
        <span className="absolute left-16 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium">
          Pen (P)
        </span>
      </button>

      {/* Eraser Tool */}
      <button
        onClick={() => setTool("eraser")}
        className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
          currentTool === "eraser"
            ? "bg-blue-500 text-white shadow-lg scale-105"
            : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:scale-105"
        }`}
        title="Eraser Tool"
      >
        <Eraser size={20} />
        
        {/* Tooltip */}
        <span className="absolute left-16 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium">
          Eraser (E)
        </span>
      </button>

      {/* Divider */}
      <div className="h-px bg-slate-200 my-1"></div>

      {/* Clear Canvas */}
      <button
        onClick={clearCanvas}
        className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-red-500 hover:bg-red-50 hover:text-red-600 hover:scale-105 transition-all duration-200"
        title="Clear Canvas"
      >
        <Trash2 size={20} />
        
        {/* Tooltip */}
        <span className="absolute left-16 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium">
          Clear All
        </span>
      </button>
    </div>
  );
};

export default Toolbar;