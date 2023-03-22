import React, { useEffect, useState } from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

/**
 * Ce composant permet d'afficher la card d'un exercice
 */
const ExerciceItem = ({exercice, children}) => {
  // Permet d'utiliser la navigation pour rediriger vers la page de détail d'un exercice au clic sur un exercice
  const navigation = useNavigation();
  const [urlImage, setUrlImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Récupère l'image de l'exercice
    api.getImageOfExercise(exercice.exercise_base).then(data => {
      setUrlImage(data);
      setIsLoading(false);
    });
  }, [exercice]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ExerciseDetails', {exercice: exercice, urlImage: urlImage})
      }>
      <ExerciseCard>
        <ImageContainer>
          { isLoading ?
            <ActivityIndicator size="large" color="#0000ff" />
          : 
            urlImage !== null && (
              <ExerciseImage
                source={{
                  uri: urlImage,
                }}
              />
            )
          }
        </ImageContainer>
        <ExerciseTitle>{exercice.name}</ExerciseTitle>
        {children}
      </ExerciseCard>
    </TouchableOpacity>
  );
};

const ExerciseCard = styled.View`
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const ExerciseTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const ImageContainer = styled.View`
  width: 100%;
  min-height: 200px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
`;

const ExerciseImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 4px;
`;

export default ExerciceItem;
