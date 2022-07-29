export default function AppCard(props) {
  return (
    <div className="h-auto w-full md:h-3/5  md:w-auto md:m-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg shadow-indigo-500/40 my-auto z-40 ">
        {props.children}
    </div>
  )
}