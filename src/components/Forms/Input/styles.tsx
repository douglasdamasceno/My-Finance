import { RFValue } from "react-native-responsive-fontsize";
import { TextInputProps } from 'react-native'

import styled from "styled-components/native";

export const Container = styled.TextInput<TextInputProps>`
width:100%;
padding: 16px 18px;

margin-bottom: 5px;
background-color: ${({ theme }) => theme.colors.shape};

font-family: ${({theme})=> theme.fonts.regular};
font-size: ${RFValue(14)}px;
color: ${({ theme }) => theme.colors.title};

border-radius: 5px;
`;