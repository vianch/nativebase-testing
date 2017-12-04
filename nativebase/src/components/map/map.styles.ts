import { StyleSheet, Dimensions } from 'react-native';

let ScreenHeight = Dimensions.get("window").height - 100;
let ScreenWidth = Dimensions.get("window").width;

const MapStyles = StyleSheet.create({
    container: {
        flex:1,
        width: ScreenWidth,
        height: ScreenHeight,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export { MapStyles }
