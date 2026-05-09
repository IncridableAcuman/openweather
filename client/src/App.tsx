
const App = () =>{
    return (
        <>
           <div className={"w-full h-screen flex flex-col items-center justify-center"}>
               <div className={"w-full max-w-3xl mx-auto shadow-lg text-center"}>
                   <h2 className={"text-3xl font-extrabold text-blue-600"}>Tashkent City</h2>
                   <h1 className={"text-6xl font-extrabold py-6"}>0C</h1>
                   <div className={"w-full p-5"}>
                       <div className={"flex items-center gap-2 border border-blue-500 p-2 rounded-md"}>
                           <input type={"text"} placeholder={"Search your city...."} className={"outline-none w-full bg-transparent"} />
                           <button className={"bg-blue-500 text-white px-8 text-sm py-4 rounded-md"}>Search</button>
                       </div>
                   </div>
               </div>
           </div>
        </>
    );
}
export default App;