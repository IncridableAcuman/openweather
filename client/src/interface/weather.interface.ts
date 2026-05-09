interface IMain {
    temp:number;
    feels_like:number;
    humidity:number;
}
interface ISys {
    country:string;
}
interface IWeather {
    main:string;
    description:string;
    icon:string;
}
interface IWind {
    speed:number;
}

export default interface WeatherDto {
    weather: IWeather[];
    main: IMain;
    wind: IWind;
    sys: ISys;
    name:string;
}