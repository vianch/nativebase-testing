import React, {Component} from 'react';
import { Body, Content, Title, Container, Header, Footer, FooterTab, Button, Icon } from 'native-base';
import { Text } from 'react-native';

import { MapComponent } from "./components/";

interface Props { }
interface States {
    buttonActive: string;
}

export class App extends Component<Props, States> {

    constructor(props: any) {
        super(props);
        this.state = {
          buttonActive: "navigate",
        };
    }

    private activateButton(buttonActive: string): void {
        this.setState({
            buttonActive: buttonActive,
        });
    }

    render() {
        let container: JSX.Element  = null;
        if (this.state.buttonActive === "navigate") {
            container = <MapComponent></MapComponent>;
        }

        if (this.state.buttonActive === "camera") {
            container = <Content><Text>CAMERA</Text></Content>;
        }

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Google Map</Title>
                    </Body>
                </Header>
                {container}
                <Footer>
                    <FooterTab>
                        <Button active={this.state.buttonActive === "navigate"} onPress= {() => {this.activateButton("navigate")}}>
                            <Icon active={this.state.buttonActive === "navigate"} name="navigate" />
                            <Text>Maps</Text>
                        </Button>
                        <Button active={this.state.buttonActive === "camera"} onPress= {() => {this.activateButton("camera")}}>
                            <Icon active={this.state.buttonActive === "camera"} name="camera" />
                            <Text>Camera</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
