import { StyleSheet, ScrollView} from 'react-native';
import PetList from '../../Components/AnimalCard/AnimalCard';


export default function TelaPrincipal() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <PetList/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});