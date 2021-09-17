import React from "react";

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon
} from './styles'

export default function Dashboard(){
    return (
        <Container>
            <Header >
                <UserWrapper>
               
                <UserInfo>
                    <Photo source={{uri:'https://avatars.githubusercontent.com/u/33847803?v=4'}}/>
                    <User>
                        <UserGreeting>Olá,</UserGreeting>
                        <UserName>Douglas</UserName>
                    </User>
                </UserInfo>
                <Icon name="power" />
                </UserWrapper>
            </Header>
        </Container>
    )
}