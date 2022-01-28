import React, { useState,useEffect } from 'react';
import {
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';

import * as Yup from 'yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { yupResolver} from '@hookform/resolvers/yup';
import  Button  from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';

import InputForm from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import CategorySelect from '../CategorySelect';
import { useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native'
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

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor númerico')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatório')

});

export default function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const dataKey = "@gofinances:transactions";
    
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        reset,
        formState:{errors}
    } = useForm({
         resolver:yupResolver(schema)
     });

    function handleTransactionTypeSelect(type:'positive' | "negative"){
        setTransactionType(type);
    }
    
    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }
    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }
    async function handleRegister(form: FormData) {
        if (!transactionType)
            return Alert.alert('Selecione o tipo da transação');
        if (category.key==='category')
            return Alert.alert('Selecione a categoria');
        
        const newTransaction = {
            id:String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type:transactionType,
            category: category.key,
            date:new Date()
        }
        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [      
                ...currentData,
                newTransaction
            ];
            

            await AsyncStorage.setItem(dataKey,JSON.stringify(dataFormatted));
            
            reset()
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria',
            })
            navigation.navigate("Listagem");
        } catch (error) {
            console.log(error);
            Alert.alert("Nao foi possivel salvar")
        }
    }

    useEffect(() => {
        async function loadData() {
            const data = await AsyncStorage.getItem(dataKey);
            console.log(JSON.parse(data!));
        }
        loadData();
        async function limpar() {
            await AsyncStorage.clear();
            console.log('limpo');
        }
        
    },[]);

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <Container>
        <Header>
            <Title>Cadastro</Title>
        </Header>
        <Form>
            <Fields>
                    <InputForm
                        name="name"
                        control={control}
                        placeholder="Nome"
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.name && errors.name.message}
                    />
                    <InputForm
                        name="amount"
                        control={control}
                        placeholder="Preço"
                        keyboardType="numeric"
                        error={errors.amount && errors.amount.message}
                    />
                <TransactionTypes>    
                    <TransactionTypeButton
                        isActive={transactionType=='positive'}
                        type="up"
                        title="Income"
                        onPress={() => handleTransactionTypeSelect('positive')}
                    />
                    <TransactionTypeButton
                        isActive={transactionType == 'negative'}
                        type="down" title="Outcome"
                        onPress={() => handleTransactionTypeSelect('negative')}
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
            </Container>
    </TouchableWithoutFeedback>
   
)
}