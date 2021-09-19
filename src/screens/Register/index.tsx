import React,{useState} from 'react'

import { Button } from '../../components/Forms/button'
import { CategorySelect } from '../../components/Forms/CategorySelect'
import Input from '../../components/Forms/Input'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from './styles'


export default function Register() {
    const [transactionType, setTransactionType] = useState('');
    
    
    function handleTransactionTypeSelect(type:'up' | "down"){
        setTransactionType(type);
    }

    return (
    <Container>
        <Header>
            <Title>Cadastro</Title>
        </Header>
        <Form>
            <Fields>
                <Input placeholder="Nome" />
                <Input placeholder="Preço" />
                <TransactionTypes>    
                    <TransactionTypeButton
                        isActive={transactionType=='up'}
                        type="up"
                        title="Income"
                        onPress={() => handleTransactionTypeSelect('up')}
                    />
                    <TransactionTypeButton
                        isActive={transactionType == 'down'}
                        type="down" title="Outcome"
                        onPress={() => handleTransactionTypeSelect('down')}
                    />
                    </TransactionTypes>
                    <CategorySelect title="Categoria" />
            </Fields>
            <Button title="Enviar"  />

        </Form>
    </Container>)
}