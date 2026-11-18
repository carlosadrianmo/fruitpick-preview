const apiUrls = {
            '192.168.236.152:8080': 'https://192.168.236.152:8081',
            'localhost:8080': 'https://localhost:8081',
            'devignia.caradan.com.mx': 'https://devignia.caradan.com.mx/fruitpick-api',
            '10.220.232.152:8080': 'https://10.220.232.152:8081'
}


const config = {
    UI_TIMEOUT: 5000,
    FX_DURATION: 480,
    
    url: `${window.location.protocol}//${window.location.host}/gamebase`,
    name: "Fruitpick! Take your pet to the next level",
    logo: "/images/logo.png",
    version: '1.0a',
    description: 'Play now!',
    apiUrl: apiUrls[location.host],
    settings: {
                bg_music: 1,
                fx_sounds: 1
            },
            delayPerToast : 1.2

    
};


export default config;