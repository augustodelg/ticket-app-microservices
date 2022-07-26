export default function AppButton(props) {
  return (
    <button
      className="bg-indigo-500 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-2 px-4 rounded-full"
      {...props}
    >
      {props.text}
    </button>
  );
}
