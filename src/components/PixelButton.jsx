export default function PixelButton({
  children,
  onClick,
  className = ''
}) {

  return (

    <button
      onClick={onClick}
      className={`
        pixel-btn
        rounded-2xl
        text-xs
        ${className}
      `}
    >

      {children}

    </button>

  )
}