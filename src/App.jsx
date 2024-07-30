import React, { useRef, useState } from "react";
const Api_key = "d5d21d222802cf9cebba9c6dbd8d960b";
const lang = "es";

export default function App() {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setshowWeather] = useState(null);
  const [loading, setloading] = useState(false);

  const weatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/2204/2204346.png",
      description: "Despejado",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/1208/1208526.png",
      description: "Lluvia",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/2204/2204360.png",
      description: "Nevando",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/7284/7284299.png",
      description: "Nublado",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/128/7284/7284299.png",
      description: "Brumoso",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/10735/10735516.png",
      description: "Contaminación",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/128/3750/3750506.png",
      description: "Neblina",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/128/3750/3750367.png",
      description: "Llovizna",
    },
  ];

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&appid=${Api_key}&units=metric&lang=${lang}`;
    setloading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);
        if (data.cod === 404 || data.cod === 400) {
          // Array of objects
          setshowWeather([
            {
              type: "No se encontró",
              img: "https://cdn-icons-png.flaticon.com/512/6665/6665325.png",
              description: "No se encontró",
            },
          ]);
        }
        setshowWeather(
          weatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        console.log(data);
        setApiData(data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };
  return (
    <div className="bg-gray-800 h-screen grid place-items-center">
      <h1 className="text-4xl text-center w-screen font-extrabold uppercase text-white">
        The Weather App ☀️
      </h1>
      <div className="bg-white w-96 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <input
            type="text"
            ref={inputRef}
            placeholder="Escribe tu ubicación"
            className="text-xl border-b p-1 border-gray-200 font-semibold uppercase flex-1"
          />
          <button onClick={fetchWeather}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/758/758651.png"
              alt="find"
              className="w-8 ml-4"
            />
          </button>
        </div>
        <div
          className={`duration-300 delay-75 overflow-hidden ${
            showWeather ? "h-[27rem]" : "h-0"
          }`}
        >
          {loading ? (
            <div className="grid place-items-center h-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                alt="..."
                className="w-14 mx-auto mb-2 animate-spin"
              />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {apiData && (
                  <p className="text-xl font-semibold">
                    {apiData?.name + ", " + apiData?.sys.country}
                  </p>
                )}
                <img
                  src={showWeather[0]?.img}
                  alt="..."
                  className="w-52 mx-auto"
                />
                <h3 className="text-2xl font-bold text-zinc-800">
                  {showWeather[0]?.description}
                </h3>
                {apiData && (
                  <>
                    <div className="flex justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/14036/14036261.png"
                        alt="..."
                        className="h-10 mt-1"
                      />
                      <h2 className="text-4xl ml-2 font-extrabold">
                        {apiData?.main?.temp}&#176;c
                      </h2>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
