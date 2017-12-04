import React, {Component} from 'react';
import MapView from 'react-native-maps';
import { View, Text, GeolocationReturnType } from 'react-native';
import { Content, Spinner,  } from 'native-base';

import { MapStyles } from "./map.styles";
import { MapCoordinatesData, GeoOptions } from "./map.models";

const markerImage = require('../../../assets/images/marker.png');

interface Props {
}

interface States {
    mapCoordinates: MapCoordinates,
    markPoint: MarkLocation,
}

export class MapComponent extends Component<Props, States> {
    private watchId: number;
    private pinColor: string;

    constructor(props: any) {
        super(props);
        this.watchId = null;
        this.pinColor = "#0000ff";
        this.state = {
            mapCoordinates: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
            markPoint: {
                latitude: 0,
                longitude: 0,
            }
        }
    }

    public componentDidMount(): void {
        this.setCurrentPosition();
        this.setWatchPosition();
    }

    public componentWillUnmount(): void {
        navigator.geolocation.clearWatch(this.watchId);
    }

    private setCurrentPosition(): void {
        navigator.geolocation.getCurrentPosition((position: GeolocationReturnType) => {

            }, (error) => {
                console.log(`ERROR(${error.code}): ${error.message}`);
            },
            GeoOptions);
    }

    private setWatchPosition(): void {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setMapCoordinates(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.log(`ERROR(${error.code}): ${error.message}`);
            },
            GeoOptions,
        );
    }

    private setMapCoordinates(latitude: number, longitude: number): void {
        this.setState({
            mapCoordinates: new MapCoordinatesData(latitude, longitude).getCoordinates(),
            markPoint: {
                latitude: latitude,
                longitude: longitude
            }
        });
    }

    private onRegionChange(region: MapCoordinates) {
        this.setState({ mapCoordinates: region });
    }

    render() {

        if (this.state.mapCoordinates.longitude === 0 || this.state.mapCoordinates.latitude === 0) {
            return (
                <View style={MapStyles.container}>
                    <Spinner color='blue' />
                </View>
            );
        }

        return (
                <Content>
                        <View style={MapStyles.container}>
                            <MapView
                                initialRegion={this.state.mapCoordinates}
                                style={MapStyles.map}
                                region={this.state.mapCoordinates}
                                onRegionChange={this.onRegionChange.bind(this)}
                            >
                                <MapView.Marker
                                    draggable
                                    coordinate={this.state.markPoint}
                                    pinColor={this.pinColor}
                                    image={markerImage}
                                    onDragEnd={(e:any) => this.setState({ markPoint: e.nativeEvent.coordinate })}
                                />
                            </MapView>

                            <Text>
                                Latitude: {this.state.mapCoordinates.longitude}
                            </Text>
                            <Text>Longitude: {this.state.mapCoordinates.latitude}</Text>
                        </View>
                </Content>
        );
    }
}