import React, {useState, useEffect, useContext} from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import {FavoritesContext} from '../contexts/FavoritesContext';
import globalStyledComponents from '../styles/globalStyledComponents'

/**
 * Ce composant permet d'afficher un exercice de musculation en détails avec son nom, son image si il y en a une, et sa description
 */
const ExerciceDetails = ({ route }) => {
  //Récupère l'exercice envoyer par la route
  const {exercice, urlImage} = route.params;

  // L'api renvoie une description avec des listes directement intégrés dedans donc je reformate la description pour qu'elle s'affiche correctement
  const [descriptionList, setDescriptionList] = useState(null);

  //Récupère les fonctions du contexte favoris
  const {addFavorite, removeFavorite, isAlreadyInFavorites} = useContext(FavoritesContext);

  useEffect(() => {
    if (exercice.description) {
      setDescriptionList(exercice.description.split('<li>'));
    }


  }, [exercice]);

  return (
    <Container>
      <ScrollView>
        <Title>{exercice.name}</Title>
        <ImageContainer>
          {
            urlImage &&
              <ExerciseImage  source={{
              uri: urlImage,
            }} />
          }
        </ImageContainer>
        <Container>
        <Title>Description :</Title>
        <List>
          {descriptionList?.map((item, index) => (
            <Item key={index}>
              <Bullet>{index + 1}.</Bullet>
              <TextDescription>
                {item.replace(/<\/?[^>]+(>|$)/g, '')}
              </TextDescription>
            </Item>
          ))}
        </List>
      </Container>
      {
        !isAlreadyInFavorites(exercice) ?
          <globalStyledComponents.AddToFavoritesButton onPress={() => addFavorite(exercice)}>
            <globalStyledComponents.AddToFavoritesText>Ajouter aux favoris</globalStyledComponents.AddToFavoritesText>
          </globalStyledComponents.AddToFavoritesButton>
        :
          <globalStyledComponents.RemoveFromFavoritesButton onPress={() => removeFavorite(exercice.id)}>
            <globalStyledComponents.RemoveFromFavoritesText>Supprimer des favoris</globalStyledComponents.RemoveFromFavoritesText>
          </globalStyledComponents.RemoveFromFavoritesButton>
      }
      </ScrollView>
    </Container>
  );
};

/* Style de l'écran */
const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f8f8f8;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 250px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const TextDescription = styled.Text`
  font-size: 16px;
  color: #333;
  line-height: 24px;
`;

const List = styled.View`
  margin-left: 20px;
`;

const Item = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 5px;
`;

const Bullet = styled.Text`
  margin-right: 5px;
  font-size: 16px;
`;

const ExerciseImage = styled.Image`
  width: 100%;
  height: 150px;
  margin-top: 5px;
  border-radius: 4px;
`;

export default ExerciceDetails;

