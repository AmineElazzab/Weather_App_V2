import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import SearchBar from './SearchBar';
import {
    haze,
    rainy,
    sunny,
    cloudy,
    snowy,
    mist,
    thunderstorm,
    drizzle,
    fog,
    smoke,
    dust,
    sand,
    tornado
} from '../assets/backgroundImages/index';

export default function Weather({ weatherData, fetchWeatherData }) {

    const [backgroundImage, setBackgroundImage] = useState(null);

    const { weather,
        name,
        main: { temp,
            feels_like,
            temp_min,
            temp_max,
            pressure,
            sea_level,
            grnd_level,
            humidity, },
        wind: { speed },
        rain,
        clouds,
        sys: { country, sunrise, sunset },
        dt,
        id,
        cod
    } = weatherData;
    const [{ main }] = weather;

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main));
    }, [weatherData])

    function getBackgroundImg(weather) {
        if (weather === 'Snow') return snowy;
        if (weather === 'Clear') return sunny;
        if (weather === 'Rain') return rainy;
        if (weather === 'Haze') return haze;
        if (weather === 'Clouds') return cloudy;
        if (weather === 'Mist') return mist;
        if (weather === 'Thunderstorm') return thunderstorm;
        if (weather === 'Drizzle') return drizzle;
        if (weather === 'Fog') return fog;
        if (weather === 'Smoke') return smoke;
        if (weather === 'Dust') return dust;
        if (weather === 'Sand') return sand;
        if (weather === 'Tornado') return tornado;

    }

    let textColor = backgroundImage !== sunny ? 'white' : 'black'

    return (

        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='darkgray' />
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >
                <SearchBar fetchWeatherData={fetchWeatherData} />
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={[styles.headerText, { color: textColor }]}>{name}</Text>
                    <Text style={[styles.headerText, { color: textColor }]}>{temp}°C</Text>
                    <Text style={[styles.headerText, { color: textColor }]}>{main}</Text>

                    <View style={styles.extraInfo}>
                        <View style={styles.info}>
                            <Text style={{ color: textColor }}>Feels Like: {feels_like}°C</Text>
                            <Text style={{ color: textColor }}>Min: {temp_min}°C</Text>
                            <Text style={{ color: textColor }}>Max: {temp_max}°C</Text>
                            </View>
                            </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 36,
        marginTop: 10,
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        padding: 10
    },
    info: {
        width: Dimensions.get('screen').width / 2.5,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center'
    }
});
