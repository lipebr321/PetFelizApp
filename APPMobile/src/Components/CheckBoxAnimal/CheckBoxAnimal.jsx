import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Checkbox = ({ label, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked); // Chama a função de callback com o novo estado
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isChecked ? (
          <Icon name="check-square" size={24} color="green" />
        ) : (
          <Icon name="square" size={24} color="gray" />
        )}
        <Text style={{ marginLeft: 8 }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;
