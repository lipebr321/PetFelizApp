import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useEstados } from '../Hooks/UseEstados';

const SelectEstado = ({ onChange }) => {
  const { estados } = useEstados();
  const [selectedEstado, setSelectedEstado] = useState(null);

  const estadoOptions = estados.map((estado) => ({
    value: estado.id,
    label: estado.nome,
  }));

  const selectedOptionEstado = estadoOptions.find((e) => e.value === selectedEstado);

  const handleEstadoUpdate = (event) => {
    setSelectedEstado(event.value);
    const selectedUf = estados.find((e) => e.id === event.value)?.sigla;
    onChange(selectedUf);
  };

  return (
    <Select
      placeholder="Selecione um estado"
      options={estadoOptions}
      value={selectedOptionEstado}
      onChange={handleEstadoUpdate}
    />
  );
};

SelectEstado.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SelectEstado;