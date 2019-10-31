import React, { useState } from "react";
import styled from "@emotion/styled";
import { availableLocations } from "./utils";

const WeatherSettingWrapper = styled.div`
    position: relative;
    min-width: 360px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor};
    box-sizing: border-box;
    padding: 20px;
`;

const Title = styled.div`
    font-size: 28px;
    color: ${({ theme }) => theme.titleColor};
    margin-bottom: 30px;
`;

const StyledLabel = styled.label`
    display: block;
    font-size: 16px;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 15px;
`;

const StyledSelectList = styled.select`
    width: 100%;
    max-width: 100%;
    background: transparent;
    padding: 6px 9px;
    margin-bottom: 30px;
    outline: none;
    font-size: 16px;
    color: ${({ theme }) => theme.textColor};
    option {
        background: ${({ theme }) => theme.backgroundColor};
        color: ${({ theme }) => theme.textColor};
    }
`;
const RadioGroup = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    color: ${({ theme }) => theme.textColor};
    input {
        width: 18px;
        height: 18px;
    }
`;
const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > button {
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        user-select: none;
        margin: 0;
        letter-spacing: 0.3px;
        line-height: 1;
        cursor: pointer;
        overflow: visible;
        text-transform: none;
        border: 1px solid transparent;
        background-color: transparent;
        height: 35px;
        width: 80px;
        border-radius: 5px;

        &:focus,
        &.focus {
            outline: 0;
            box-shadow: none;
        }

        &::-moz-focus-inner {
            padding: 0;
            border-style: none;
        }
    }
`;

const Back = styled.button`
    && {
        color: ${({ theme }) => theme.textColor};
        border-color: ${({ theme }) => theme.textColor};
    }
`;

const Save = styled.button`
    && {
        color: white;
        background-color: #056efd;
    }
`;

const locations = availableLocations.map(location => location.cityName);
//Component
const WeatherSetting = ({
    setCurrentPage,
    cityName,
    setCurrentCity,
    setCurrentTheme,
    currentTheme
}) => {
    const [locationName, setLocationName] = useState(cityName);
    const [theme, setTheme] = useState(currentTheme);
    const handleChange = e => {
        setLocationName(e.target.value);
    };
    const handleClick = e => {
        setTheme(e.target.value);
    };
    const handleSave = () => {
        if (locations.includes(locationName)) {
            // TODO: 儲存地區資訊...
            console.log(`儲存的地區資訊為：${locationName}`);
            setCurrentPage("WeatherCard");
            setCurrentCity(locationName);
            setCurrentTheme(theme);
        } else {
            alert(`儲存失敗：您輸入的 ${locationName} 並非有效的地區`);
            return;
        }
    };

    return (
        <WeatherSettingWrapper>
            <Title>設定</Title>
            <StyledLabel htmlFor="location">地區</StyledLabel>
            <StyledSelectList onChange={handleChange} defaultValue={cityName}>
                {locations.map(location => (
                    <option value={location} key={location}>
                        {location}
                    </option>
                ))}
            </StyledSelectList>
            <StyledLabel htmlFor="theme">主題</StyledLabel>
            <RadioGroup>
                <input
                    type="radio"
                    name="theme"
                    value="light"
                    onClick={handleClick}
                    defaultChecked={theme === "light"}
                />
                淺色
                <input
                    type="radio"
                    name="theme"
                    value="dark"
                    onClick={handleClick}
                    defaultChecked={theme === "dark"}
                />
                深色
            </RadioGroup>

            <ButtonGroup>
                <Back onClick={() => setCurrentPage("WeatherCard")}>返回</Back>
                <Save onClick={handleSave}>儲存</Save>
            </ButtonGroup>
        </WeatherSettingWrapper>
    );
};
export default WeatherSetting;
