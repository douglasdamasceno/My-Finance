import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";

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
    Transctions,
    Title,
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
                <HighlightCard
                    type="up"
                    title="Entrada" amount="R$ 17.400,00" lastTransaction="Última entrada dia 13 de abril" />
                <HighlightCard
                    type="down"
                    title="Saídas" amount="R$ 1.259,00" lastTransaction="Última saída dia 03 de abril" />
                <HighlightCard
                    type="total"
                    title="Total" amount="R$ 16.141,00" lastTransaction="01 à 16 de abril" />
            </HighlightCards>

            <Transctions>
                <Title>Listagem</Title>
                <TransactionCard>
                </TransactionCard>
            </Transctions>
        </Container>
    )
}