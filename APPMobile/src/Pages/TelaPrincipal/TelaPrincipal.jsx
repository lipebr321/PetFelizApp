import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Picker,
  Modal,
} from "react-native";
import axios from "axios";
import styles from "../../Pages/TelaPrincipal/styles";

const TelaPrincipal = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    porte: "",
    sexo: "",
    tipo: "",
    uf: "",
  });

  const porte_Pet = [
    { value: "anao", label: "Anão" },
    { value: "pequeno", label: "Pequeno Porte" },
    { value: "medio", label: "Médio Porte" },
    { value: "grande", label: "Grande Porte" },
    { value: "Molosso", label: "Molosso" },
  ];

  const sexo_Pet = [
    { value: "f", label: "Fêmea" },
    { value: "m", label: "Macho" },
  ];

  const nome_Animal = [
    { value: "gato", label: "Gato" },
    { value: "cao", label: "Cão" },
  ];


useEffect(() => {
    getDataFromApi();
}, [])



  async function getDataFromApi() {

    try {

        let queryString = "";


        if (filters.tipo) {
            queryString += "tipo=" + filters.tipo + "&";
        }

        if (filters.porte) {
            queryString += "porte=" + filters.porte + "&";
        }
        if (filters.sexo) {
            queryString += "sexo=" + filters.sexo + "&";
        }
        if (filters.uf) {
            queryString += "uf=" + filters.uf + "&";
        }

        const response = await axios.get(`https://petfeliz.azurewebsites.net/api/PetFeliz/ListarPet?` + queryString);
        if (response.status !== 200) {
            alert("Erro ao buscar pets!");
            return;
        }
        setPets(response.data);
        setFilteredData(response.data);
        setLoading(false);

    } catch (error) {
      setError("Erro ao buscar pets no banco de dados.");

      setLoading(false);

      console.error("Erro ao buscar pets no banco de dados.", error);
    }
}


  const handleCardPress = (pet) => {
    navigation.navigate("TelaPet", { pet });
  };

  const handleFilter = () => {
    setShowModal(true);
  };


    const confirmFilter = () => {
      getDataFromApi();
      setShowModal(false);
    };

  const cancelFilter = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F9C200" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }


  return (
    <ScrollView
    pagingEnabled={true}
    showsVerticalScrollIndicator={false}
    style={styles.container}
  >
    
      <TouchableOpacity onPress={handleFilter}>
        <Text style={styles.menuItem}>Filtrar</Text>
      </TouchableOpacity>

      {pets.map((pet, index) => (
        <TouchableOpacity key={index} onPress={() => handleCardPress(pet)}>
          <View style={styles.card}>
            <Image source={{ uri: pet.foto_Pet }} style={styles.image} />

            <Text style={styles.nome}>{pet.nome_Pet}</Text>

            <Text style={styles.descricao}>{pet.descricao_Pet}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Modal visible={showModal} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <View style={{ backgroundColor: 'white', padding: 20 }}>
    <Text>Filtro</Text>
    <Picker
              style={styles.picker}
              selectedValue={filters.porte}
              onValueChange={(porte) => setFilters({ ...filters, porte })}
            >
              {porte_Pet.map((item) => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
              ))}
            </Picker>
    <Picker
              style={styles.picker}
              selectedValue={filters.sexo}
              onValueChange={(sexo) => setFilters({ ...filters, sexo })}
            >
              {sexo_Pet.map((item) => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
              ))}
            </Picker>
            <Picker
              style={styles.picker}
              selectedValue={filters.tipo}
              onValueChange={(tipo) => setFilters({ ...filters, tipo })}
            >
              {nome_Animal.map((item) => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
              ))}
            </Picker>
            <Picker
      style={styles.picker}
      selectedValue={filters.uf}
      onValueChange={(uf) => setFilters({ uf })}
    >
      <Picker.Item label="SP" value="sp" />
      <Picker.Item label="RJ" value="rj" />
      <Picker.Item label="MG" value="mg" />
    </Picker>
    <TouchableOpacity onPress={confirmFilter}>
      <Text>Confirmar</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={cancelFilter}>
      <Text>Cancelar</Text>
    </TouchableOpacity>
  </View>
</View>
      </Modal>
    </ScrollView>
  
  );
};

export default TelaPrincipal;
