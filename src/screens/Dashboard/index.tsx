import React from "react";
import { HighlightCard } from "../../components/HighlightCard";

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
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
            <HighlightCards>
              <HighlightCard />
               <HighlightCard />
               <HighlightCard />
            </HighlightCards>
        </Container>
    )
}