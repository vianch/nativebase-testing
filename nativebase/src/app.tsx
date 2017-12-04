import React, {Component} from 'react';
import { Body, Title, Container, Header, Footer, FooterTab, Button, Text, Icon } from 'native-base';

import { MapComponent } from "./components/";

export class App extends Component {
    render() {
        console.log("rendering...");

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Google Map</Title>
                    </Body>
                </Header>
                <MapComponent></MapComponent>
                <Footer>
                    <FooterTab>
                        <Button active>
                            <Icon active name="navigate" />
                            <Text>Maps</Text>
                        </Button>
                        <Button>
                            <Icon active name="camera" />
                            <Text>Camera</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
