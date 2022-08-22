export default function AppButton({extraClassName,text, onClick, disable}) {
  return (
    <button
      className={`bg-indigo-500 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-2 px-4 rounded-full ${extraClassName}`}
      onClick={onClick}
      disable={disable}
    >
      {text}
    </button>
  );
}
