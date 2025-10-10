import './spinner.css';

interface SpinnerProps {
  className?: string;
}


const Spinner = ({className=''}: SpinnerProps) => {
  return (
    <svg className={`spinner ${className}`} viewBox="0 0 50 50">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,110,219,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <circle
        stroke="url(#gradient)"
        className="spinner-path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      />
    </svg>
  );
};

export default Spinner;
