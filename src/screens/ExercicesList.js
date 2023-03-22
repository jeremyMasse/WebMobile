import React, {useEffect, useState, useContext} from 'react';
import {FlatList, View, ActivityIndicator } from 'react-native';
import {FavoritesContext} from '../contexts/FavoritesContext';
import { ToasterContext } from '../contexts/ToasterContext';
import api from '../services/api';
import ExerciceItem from '../components/ExerciceItem';
import ExerciseSearchBar from '../components/SearchBar';
import globalStyledComponents from '../styles/globalStyledComponents'

/**
 * Ce composant permet d'afficher la liste des exercices Avec leur nom et une image si il y en a une
 */
const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {addFavorite} = useContext(FavoritesContext);
  const { addMessage } = useContext(ToasterContext);

  useEffect(() => {
    setIsLoading(true);
    api.getExercises().then(data => {
      setExercises(data);
      setFilteredExercises(data);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  const handleSearch = search => {
    const exercicesFiltered = exercises.filter(exercise => {
      return (
        exercise.name.toLowerCase().includes(search.toLowerCase()) ||
        exercise.description.toLowerCase().includes(search.toLowerCase())
      );
    })
    if(!exercicesFiltered.length) {
      addMessage('Aucune recherche trouvé', 'error')
    }
    setFilteredExercises(exercicesFiltered);
  };

  const renderItem = ({item}) => (
    <ExerciceItem exercice={item}>
      <globalStyledComponents.AddToFavoritesButton onPress={() => addFavorite(item)}>
        <globalStyledComponents.AddToFavoritesText>Ajouter aux favoris</globalStyledComponents.AddToFavoritesText>
      </globalStyledComponents.AddToFavoritesButton>
    </ExerciceItem>
  );

  return (
    <View>
      <ExerciseSearchBar onSearch={handleSearch} />
      { isLoading ?
        <ActivityIndicator size="large" color="#0000ff" />
        : 
        <FlatList
          data={filteredExercises}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      }
      
    </View>
  );
};

export default ExerciseList;
