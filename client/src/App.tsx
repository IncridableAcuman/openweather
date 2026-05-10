import {  useState, type KeyboardEvent } from "react";
import type WeatherDto from "./interface/weather.interface";
import axios from "axios";
import {toast} from "react-toastify";

const App = () =>{
    const [weather,setWeather]=useState<WeatherDto>();
    const [search,setSearch]=useState("");


        const getWeather = async () => {
        try {
            const {data} = await axios.get(`https://openweather-backend-6nyd.onrender.com/api/v1/weather?q=${search}`);
            setWeather(data);
        } catch (error) {
            toast.error("Something went wrong!");
            console.log(error);
        }
    }

    const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter'){
               await getWeather();
            }
    }

    return (
        <>
           <div className={"w-full h-screen flexing"}>
               <div className={"w-full max-w-3xl mx-auto shadow-md text-center border border-blue-200 rounded-md p-4 hover:shadow-lg transition duration-300"}>
                   <h2 className={"text-3xl font-extrabold text-blue-600"}>{weather?.name ?? "Your City"} <span className="text-blue-900">({weather?.sys.country ?? "UZ"})</span></h2>
                   <h1 className={"text-6xl font-extrabold py-6"}>{weather?.main.temp ?? 0}°C</h1>
                   <h2>{weather?.weather[0]?.main}</h2>
                   <div className="space-y-4 px-6">
                    <div className="shadow-md border border-blue-200 rounded-md p-4 hover:shadow-lg transition duration-300 w-full text-lg font-semibold">
                        <p>Feels Like: <span>{weather?.main.feels_like ?? 0}°C</span></p>
                    </div>
                    <div className="shadow-md border border-blue-200 rounded-md p-4 hover:shadow-lg transition duration-300 w-full text-lg font-semibold">
                        <p>Humidity: <span>{weather?.main.humidity ?? 0}%</span></p>
                    </div>
                    <div className="shadow-md border border-blue-200 rounded-md p-4 hover:shadow-lg transition duration-300 w-full text-lg font-semibold">
                        <p>Wind: <span>{weather?.wind.speed ?? 0}km/h</span></p>
                    </div>
                   </div>
                   <div className={"w-full p-5"}>
                       <div className={"flex items-center gap-2 border border-blue-200 p-1 md:p-2 rounded-md" +
                           "shadow-md hover:shadow-lg transition duration-300 rounded-md"}>
                           <input type={"text"} 
                           placeholder={"Enter your city or country...."}
                            className={"outline-none w-full bg-transparent"}
                            value={search}
                                  onKeyDown={handleKeyDown}
                            onChange={(e)=>setSearch(e.target.value)}
                             />
                           <button
                               type={"submit"}
                               onClick={getWeather}
                               className={"bg-blue-500 text-white px-8 text-sm py-2 md:py-4 rounded-md hover:shadow-lg transition duration-300"}>Search</button>
                       </div>
                   </div>
               </div>
           </div>
        </>
    );
}
export default App;
