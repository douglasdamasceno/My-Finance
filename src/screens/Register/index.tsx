import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import { Button } from '../../components/Forms/button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import Input from '../../components/Forms/Input';
import InputForm from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import CategorySelect from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from './styles';

interface FormData{
    name: string;
    amount: string;
}

export default function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });
    
    const {
        control,
        handleSubmit,
     } = useForm();

    function handleTransactionTypeSelect(type:'up' | "down"){
        setTransactionType(type);
    }
    
    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }
    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }
    function handleRegister(form: FormData) {
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category:category.key
        }
        console.log(data);
    }

    return (
    <Container>
        <Header>
            <Title>Cadastro</Title>
        </Header>
        <Form>
            <Fields>
                    <InputForm
                        name="name"
                        control={control}
                        placeholder="Nome" />
                    <InputForm
                        name="amount"
                        control={control}
                        placeholder="Preço" />
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
                <Button
                    onPress={handleSubmit(handleRegister)}
                    title="Enviar" />

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