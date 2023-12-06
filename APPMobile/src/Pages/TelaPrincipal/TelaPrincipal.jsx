import React, { useEffect, useState } from "react";
import {  View, ActivityIndicator,  Text,  ScrollView,  TouchableOpacity,  Image,  Picker,  Modal, } from "react-native";
import axios from "axios";
import styles from "../../Pages/TelaPrincipal/styles";
import Footer from "../../Components/Footer/Footer";


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
        cidade: "",
        castrado: "",
      });

      const [placeholderPorte, setPlaceholderPorte] = useState('Selecione o porte');
      const [placeholderCastrado, setplaceholderCastrado]= useState('Status castração');
      const [placeholderCidade, setplaceholderCidade] =  useState ('Selecione a cidade');
      const [placeholderSexo, setPlaceholderSexo] = useState('Selecione o sexo');
      const [placeholderTipo, setPlaceholderTipo] = useState('Selecione o tipo');
      const [placeholderUf, setPlaceholderUf] = useState('Selecione a UF');

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

      const castrado = [
        { value: "Sim", label: "Sim" },
        { value: "Não", label: "Não" }
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
            if (filters.cidade) {
              queryString += "cidade=" + filters.cidade + "&";
          }
          if (filters.castrado) {
              queryString += "castrado=" + filters.castrado + "&";
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

      const resetPicker = () => {
        setFilters({
          porte: '',
          sexo: '',
          tipo: '',
          uf: '',
          cidade: "",
          castrado: "",
        });

        setPlaceholderPorte('Selecione o porte');
        setPlaceholderSexo('Selecione o sexo');
        setPlaceholderTipo('Selecione o tipo');
        setPlaceholderUf('Selecione a UF');
        setplaceholderCastrado('Status castração');
        setplaceholderCidade('Selecione a cidade');
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

        <View 
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        style={styles.container}>

          <View style={styles.alignRight}>
      <TouchableOpacity onPress={handleFilter} style={styles.button}>
        <Image
          source={{ uri: 'https://testesluis.blob.core.windows.net/teste/filtro.png' }}
          style={styles.icon}
        />
        <Text style={styles.menuItem}>Filtrar</Text>
      </TouchableOpacity>
    </View>

          <ScrollView
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
      

          {pets.map((pet, index) => (
            <TouchableOpacity key={index} onPress={() => handleCardPress(pet)}>
              <View style={styles.card}>
                <Image source={{ uri: pet.foto_Pet }} style={styles.image} />

                <Text style={styles.nome}>{pet.nome_Pet}</Text>
                <Text style={styles.descricao}>{pet.cidade.nome_Cidade}/{pet.estado.nome_Estado}</Text>
                <Text style={styles.descricao}>{pet.descricao_Pet}</Text>
              </View>
            </TouchableOpacity>
          ))}

    <Modal visible={showModal} animationType="slide" transparent>
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
      <View style={styles.alignRight}>
      <View style={styles.modalFiltro}>
              <Image
          source={{ uri: 'https://testesluis.blob.core.windows.net/teste/filtro.png' }}
          style={styles.icon}
              />
              <Text style={styles.menuItem}>Filtros</Text>
          </View>
          </View>
          <Picker
      style={styles.picker}
      selectedValue={filters.porte}
      onValueChange={(selectedPorte) => {
        if (selectedPorte === '') {
          setFilters({ ...filters, porte: '' });
          setPlaceholderPorte('Selecione o porte');
        } else {
          setFilters({ ...filters, porte: selectedPorte });
          setPlaceholderPorte(''); 
        }
      }}
    >

      <Picker.Item label={placeholderPorte} value="" />

      {porte_Pet.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>

        <Picker
                  style={styles.picker}
                  selectedValue={filters.sexo}
                  onValueChange={(selectedSexo) => {
                    if (selectedSexo === '') {
                      setFilters({ ...filters, sexo: '' });
                      setPlaceholderSexo('Selecione o sexo');
                    } else {
                      setFilters({ ...filters, sexo: selectedSexo });
                      setPlaceholderSexo(''); 
                    }
                  }}
                >
                  <Picker.Item label={placeholderSexo} value="" />

                  {sexo_Pet.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                  ))}
                </Picker>

                <Picker
                  style={styles.picker}
                  selectedValue={filters.tipo}
                  onValueChange={(selectedTipo) => {
                    if (selectedTipo === '') {
                      setFilters({ ...filters, tipo: '' });
                      setPlaceholderTipo('Selecione o sexo');
                    } else {
                      setFilters({ ...filters, tipo: selectedTipo });
                      setPlaceholderTipo(''); 
                    }
                  }}
                >
                  <Picker.Item label={placeholderTipo} value="" />
                  {nome_Animal.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                  ))}
                </Picker>
                <Picker
      style={styles.picker}
      selectedValue={filters.uf}
      onValueChange={(selectedUf) => setFilters({ ...filters, uf: selectedUf })}
    >
      <Picker.Item label={placeholderUf} value="" />
      <Picker.Item label="Acre" value="AC" />
      <Picker.Item label="Alagoas" value="AL" />
      <Picker.Item label="Amapá" value="AP" />
      <Picker.Item label="Amazonas" value="AM" />
      <Picker.Item label="Bahia" value="BA" />
      <Picker.Item label="Ceará" value="CE" />
      <Picker.Item label="Distrito Federal" value="DF" />
      <Picker.Item label="Espírito Santo" value="ES" />
      <Picker.Item label="Goiás" value="GO" />
      <Picker.Item label="Maranhão" value="MA" />
      <Picker.Item label="Mato Grosso" value="MT" />
      <Picker.Item label="Mato Grosso do Sul" value="MS" />
      <Picker.Item label="Minas Gerais" value="MG" />
      <Picker.Item label="Pará" value="PA" />
      <Picker.Item label="Paraíba" value="PB" />
      <Picker.Item label="Paraná" value="PR" />
      <Picker.Item label="Pernambuco" value="PE" />
      <Picker.Item label="Piauí" value="PI" />
      <Picker.Item label="Rio de Janeiro" value="RJ" />
      <Picker.Item label="Rio Grande do Norte" value="RN" />
      <Picker.Item label="Rio Grande do Sul" value="RS" />
      <Picker.Item label="Rondônia" value="RO" />
      <Picker.Item label="Roraima" value="RR" />
      <Picker.Item label="Santa Catarina" value="SC" />
      <Picker.Item label="São Paulo" value="SP" />
      <Picker.Item label="Sergipe" value="SE" />
      <Picker.Item label="Tocantins" value="TO" />
      </Picker>
        <View   style={styles.containerButtons} >
        <TouchableOpacity style={styles.Button} onPress={confirmFilter}>
          <Text>Filtrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={resetPicker}>
          <Text>Limpar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={cancelFilter}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
          </Modal>
        </ScrollView>
        <Footer/>
      </View>
        
      );
    };

    export default TelaPrincipal;
