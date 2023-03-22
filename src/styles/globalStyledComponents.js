import styled from 'styled-components';

const AddToFavoritesButton = styled.TouchableOpacity`
  margin-top: 5px;
  padding: 5px;
  background-color: #007bff;
  border-radius: 4px;
`;

const AddToFavoritesText = styled.Text`
  color: #ffffff;
  text-align: center;
  font-weight: bold;
`;

const RemoveFromFavoritesButton = styled.TouchableOpacity`
  margin-top: 5px;
  padding: 5px;
  background-color: #dc3545;
  border-radius: 4px;
`;

const RemoveFromFavoritesText = styled.Text`
  color: #ffffff;
  text-align: center;
  font-weight: bold;
`;

export default { AddToFavoritesButton, AddToFavoritesText, RemoveFromFavoritesButton, RemoveFromFavoritesText};