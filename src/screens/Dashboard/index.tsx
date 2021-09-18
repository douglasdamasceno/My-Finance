import React from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";
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
    TransctionList,
} from './styles'

export default function Dashboard() {
    const data = [{
        type:'positive',
        title: "Desenvolvimento de site",
        amount: "R$ 12.000,00",
        category: { name: "Vendas", icon: "dollar-sign" },
        date: "13/04/2020",
    }, {
        type:'negative',
        title: "Hamburgueria Pizzy",
        amount: "R$ 59,00",
        category: { name: "Alimentação", icon: "coffee" },
        date: "10/04/2020",
        }, {
        type:'negative',
        title: "Aluguel do apartamento",
        amount: "R$ 1.200,00",
        category: { name: "Casa", icon: "home" },
        date: "27/03/2020",
    }];
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
                <TransctionList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: getBottomSpace()
                    }}
                 data={data}
                 renderItem={({item})=>  <TransactionCard data={item} />}
                />
               
            </Transctions>
        </Container>
    )
}