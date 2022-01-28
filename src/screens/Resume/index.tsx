import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

import HistoryCard from "../../components/HistoryCard";


import {Container,Header,Title } from './styles';

export default function Resume() {

    async function loadData() {
        
    }

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            
            <HistoryCard
                title="Compras"
                amount="R$ 150,50"
                color="red"
            />
        </Container>
    )
}