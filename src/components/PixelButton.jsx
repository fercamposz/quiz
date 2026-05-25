export default function PixelButton({ children, onClick, className = '', disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`border-4 border-white bg-[#ec4899] px-5 py-3 text-xs font-black uppercase tracking-widest text-white shadow-[4px_4px_0_#831843] transition-all active:translate-y-1 disabled:cursor-not-allowed disabled:grayscale disabled:opacity-50 ${className}`}>{children}</button>
  )
}
