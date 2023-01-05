export default function AppCard(props) {
  return (
    <div className={`${props.className} h-auto w-full  md:w-auto md:m-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg shadow-indigo-500/40 my-auto z-40`}>
        {props.children}
    </div>
  )
}