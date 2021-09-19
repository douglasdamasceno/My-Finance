import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";

interface IconProps {
  type: "up" | "down";
}

export const Container = styled(TouchableOpacity)`
  width: 48%;

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  border: 1.5px solid ${({ theme }) => theme.colors.text};

  padding: 16px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ type, theme }) =>
    type === "up" ? theme.colors.sucess : theme.colors.attention};
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;
