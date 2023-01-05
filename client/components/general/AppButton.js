export default function AppButton({className,text, onClick, disabled}) {
  return (
    <button
      className={`bg-indigo-500 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-2 px-4 rounded-full ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
