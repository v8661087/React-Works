import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
//import sunriseAndSunsetData from "./sunrise-sunset.json";
import { ThemeProvider } from "emotion-theming";
import WeatherCard from "./WeatherCard";
import useWeatherApi from "./useWeatherApi";
import WeatherSetting from "./WeatherSetting";
import { findLocation } from "./utils";

const theme = {
    light: {
        backgroundColor: "#ededed",
        foregroundColor: "#f9f9f9",
        boxShadow: "0 1px 3px 0 #999999",
        titleColor: "#212121",
        temperatureColor: "#757575",
        textColor: "#828282"
    },
    dark: {
        backgroundColor: "#1F2022",
        foregroundColor: "#121416",
        boxShadow:
            "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
        titleColor: "#f9f9fa",
        temperatureColor: "#dddddd",
        textColor: "#cccccc"
    }
};

const Container = styled.div`
    background-color: ${({ theme }) => theme.backgroundColor};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const WeatherApp = () => {
    console.log("--- invoke function component ---");
    const storageCity = localStorage.getItem("cityName");
    const [currentCity, setCurrentCity] = useState(storageCity || "臺北市");
    const currentLocation = findLocation(currentCity) || {};
    const [weatherElement, fetchData] = useWeatherApi(currentLocation);

    const storageTheme = localStorage.getItem("theme");
    const [currentTheme, setCurrentTheme] = useState(storageTheme||"light");
    const [currentPage, setCurrentPage] = useState("WeatherCard");

    //當 currentCity 有改變的時候，儲存到 localStorage 中
    useEffect(() => {
        localStorage.setItem("cityName", currentCity);
        localStorage.setItem("theme", currentTheme);
        //dependencies 中放入 currentCity
    }, [currentCity,currentTheme]);

    return (
        <ThemeProvider theme={theme[currentTheme]}>
            <Container>
                {currentPage === "WeatherCard" && (
                    <WeatherCard
                        cityName={currentLocation.cityName}
                        weatherElement={weatherElement}
                        fetchData={fetchData}
                        setCurrentPage={setCurrentPage}
                    />
                )}

                {currentPage === "WeatherSetting" && (
                    <WeatherSetting
                        setCurrentCity={setCurrentCity}
                        setCurrentPage={setCurrentPage}
                        cityName={currentLocation.cityName}
                        setCurrentTheme={setCurrentTheme}
                        currentTheme={currentTheme}
                    />
                )}
            </Container>
        </ThemeProvider>
    );
};

export default WeatherApp;
