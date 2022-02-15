import React,{ useCallback, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import HistoryCard from "../../components/HistoryCard";
import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadContainer,
} from './styles';
import { categories } from "../../utils/categories";
import { VictoryPie } from 'victory-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {addMonths, subMonths, format} from "date-fns"
import {ptBR} from "date-fns/locale"
import { useTheme } from 'styled-components';
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
interface TransactionData {
    type: 'positive'| 'negative';
    name: string;
    amount: string;
    category:string,
    date: string;
}
interface CategoryData{
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percentFormatted: string;
    percent: number;
}
export default function Resume() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
    const theme = useTheme();
    
    function handleDateChange(action: 'next' | 'prev') {
      
        if (action === 'next') {
            const newDate = addMonths(selectedDate, 1);
            setSelectedDate(newDate);
        } else {
            const newDate = subMonths(selectedDate, 1);
            setSelectedDate(newDate);
        }
    }
    async function loadData() {
        setIsLoading(true);
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];
        
        const expensives = responseFormatted
            .filter((expensive: TransactionData) => (
                expensive.type === 'negative')
                && new Date(expensive.date).getMonth() === selectedDate.getMonth()
                && new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
            )
        
        const expensivesTotal = expensives
            .reduce((accumulator: number, expensive: TransactionData) => {
                return accumulator + Number(expensive.amount);
            }, 0);
        console.log(expensivesTotal)
        
        const totalByCategory: CategoryData[] = [];
        categories.forEach(category => {
            let categorySum = 0;
            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount);
                }
            });
            if (categorySum > 0) {
                const totalFormatted = categorySum
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });
                const percent = (categorySum / expensivesTotal * 100);
                const percentFormatted = `${percent.toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent,
                    percentFormatted,
                });
            }
        });
        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectedDate]));

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            size='large'
                            color={theme.colors.primary} />
                    </LoadContainer> :
                
                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom:useBottomTabBarHeight(),
                    }}
                >
                    <MonthSelect>
                        <MonthSelectButton onPress={()=> handleDateChange('prev')}>
                            <MonthSelectIcon name="chevron-left" />
                        </MonthSelectButton>
                        <Month>{format(selectedDate,'MMMM,yyyy',{locale:ptBR}) }</Month>
                        <MonthSelectButton onPress={()=> handleDateChange('next')}>
                            <MonthSelectIcon name="chevron-right"/>
                        </MonthSelectButton>

                    </MonthSelect>
                    <ChartContainer>
                        <VictoryPie
                            colorScale={totalByCategories.map(category => category.color)}
                            style={{
                                labels: {
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    fill:theme.colors.shape
                                }
                            }}
                            labelRadius={50}
                            data={totalByCategories}
                            x="percentFormatted"
                            y="total"
                            />
                    </ChartContainer>
                    {
                        totalByCategories.map(item => (
                            <HistoryCard
                                key={item.key}
                                title={item.name}
                                amount={item.totalFormatted}
                                color={item.color}
                            />
                            ))
                    }
                </Content>
            }
        </Container>
    )
}