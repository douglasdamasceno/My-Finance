import React,{useState} from 'react'
import { Modal } from 'react-native'

import { Button } from '../../components/Forms/button'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import Input from '../../components/Forms/Input'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'

import CategorySelect from '../CategorySelect'

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
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });
    
    function handleTransactionTypeSelect(type:'up' | "down"){
        setTransactionType(type);
    }
    
    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }
    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
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
                    <CategorySelectButton
                        title={ category.name}
                        onPress={handleOpenSelectCategoryModal}
                    />
            </Fields>
            <Button title="Enviar"  />

            </Form>
            <Modal visible={categoryModalOpen}>
                <CategorySelect
                category={category}
                setCategory={setCategory}
                closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
    </Container>)
}