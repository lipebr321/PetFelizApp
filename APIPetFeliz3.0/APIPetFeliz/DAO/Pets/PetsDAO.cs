using APIPetFeliz.DTO;
using Dapper;
using MySql.Data.MySqlClient;

namespace APIPetFeliz.DAO.Pets
{
    public class PetsDAO
    {
        #region Cadastrar Pet
        public void CadastrarPet(PetsDTO pet)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();
            using (MySqlCommand cmd = new MySqlCommand())
            try
            {
              

                /*cmd.CommandText = "SELECT Cod_Usuario FROM Tb_Usuario WHERE Cod_Usuario = @IdUsuario";
                cmd.Parameters.AddWithValue("@IdUsuario", pet);
                int codLog = (int)cmd.ExecuteScalar();*/

                    var sqlEspecie = "insert into Tb_Especie values (DEFAULT, @N_Especie);";
                    var idEspecie = conexao.ExecuteScalar<int>(sqlEspecie, new
                    {
                        N_Especie = pet.Especie.Nome_Especie
                    });

                    var sqlRaca = "insert into Tb_Raca values (DEFAULT, @N_Raca, last_insert_id());";
                    var idRaca = conexao.ExecuteScalar<int>(sqlRaca, new
                    {
                        N_Raca = pet.Raca.Nome_Raca
                    });

                    var sqlAnimal = "insert into Tb_Animal values (DEFAULT, @N_Animal, last_insert_id());";
                    var idAnimal = conexao.ExecuteScalar<int>(sqlAnimal, new
                    {
                        N_Animal = pet.Animal.Nome_Animal
                    });

                    var sqlPet = "insert into Tb_Pet (Nome_Pet, Sexo_Pet, Descricao_Pet, Idade_Pet, Foto_Pet, Porte_Pet, Status_Pet, Castrato, Nome_img, Cod_Usuario, Cod_Animal) values (@N_Pet, @Sexo_Pet, @Desc_Pet, @Idade_Pet, @Img_Pet, @Porte_Pet, @Stat_Pet, @castrado, @nome_foto, 1, last_insert_id());";
                  //  cmd.Parameters.AddWithValue("@Cod_Usu", pet);
                    var idPet = conexao.ExecuteScalar<int>(sqlPet, new
                    {
                        N_Pet = pet.Nome_Pet,
                        Sexo_Pet = pet.Sexo_Pet,
                        Desc_Pet = pet.Descricao_Pet,
                        Idade_Pet = pet.Idade_Pet,
                        Img_Pet = pet.Foto_Pet,
                        Porte_Pet = pet.Porte_Pet,
                        Stat_Pet = pet.Status_Pet,
                        castrado = pet.Castrado,
                        nome_foto = pet.Nome_Foto,
                    });

                    var sqlVacina = @"insert into Tb_Vacina values (default, @dataVacina, @situacao, @descricao);";
                    var idVacina = conexao.ExecuteScalar<int>(sqlVacina, new
                    {
                        dataVacina = pet.Vacina.data_vacina,
                        situacao = pet.Vacina.status,
                        descricao = pet.Vacina.descricao
                    });
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                conexao.Close();
            }

        }
        #endregion

        #region Listar Pets
        public IEnumerable<PetsDTO> ListarPets()
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {
                string query = @"
                    select * from Tb_Pet p 
                    inner join Tb_Animal a on p.Cod_Animal = a.Cod_Animal 
                    inner join Tb_Raca r on a.Cod_Raca = r.Cod_Raca 
                    inner join Tb_Especie e on r.Cod_Especie = e.Cod_Especie;";

                var comando = new MySqlCommand(query, conexao);
                var dataReader = comando.ExecuteReader();

                var pets = new List<PetsDTO>();

                while (dataReader.Read())
                {
                    var pet = new PetsDTO();
                    pet.Id_Pet = int.Parse(dataReader["Cod_Pet"].ToString());
                    pet.Nome_Pet = dataReader["Nome_Pet"].ToString();
                    pet.Sexo_Pet = dataReader["Sexo_Pet"].ToString();
                    pet.Descricao_Pet = dataReader["Descricao_Pet"].ToString();
                    pet.Idade_Pet = dataReader["Idade_Pet"].ToString();
                    pet.Foto_Pet = dataReader["Foto_Pet"].ToString();
                    pet.Porte_Pet = dataReader["Porte_Pet"].ToString();
                    pet.Status_Pet = dataReader["Status_Pet"].ToString();

                    pet.Especie = new EspecieDTO();
                    pet.Especie.Nome_Especie = dataReader["Nome_Especie"].ToString();

                    pet.Raca = new RacaDTO();
                    pet.Raca.Nome_Raca = dataReader["Nome_Raca"].ToString();

                    pet.Animal = new AnimalDTO();
                    pet.Animal.Nome_Animal = dataReader["Nome_Animal"].ToString();

                    pets.Add(pet);
                }
                return pets;
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                conexao.Close();
            }
        }
        #endregion

        #region Excluir Pet
        public void RemoverPet(int idPet)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            using (MySqlCommand comando = new MySqlCommand())
                try
                {
                    comando.Connection = conexao;

                    comando.CommandText = @"select Cod_Pet from Tb_Pet where Cod_Pet = @idpet;";
                    comando.Parameters.AddWithValue("@idpet", idPet);
                    int codPet = (int)comando.ExecuteScalar();

                    comando.Parameters.Clear();
                    comando.CommandText = @"delete from Tb_Pet where Cod_Pet = @idpet;";
                    comando.Parameters.AddWithValue("@idpet", idPet);
                    int linhasAfetadasPet = comando.ExecuteNonQuery();

                }
                catch (Exception)
                {

                    throw;
                }
                finally
                {
                    conexao.Close();
                }
        }
        #endregion

        #region Alterar Pet
        public void AlterarPet(PetsDTO pet)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {
                var sqlEspecie = @"update Tb_Especie set Nome_Especie = @nomeEspecie where Cod_Especie = @IdEspecie;";

                var idEspecie = conexao.ExecuteScalar<int>(sqlEspecie, new
                {
                    IdEspecie = pet.Especie.Id_Especie,
                    nomeEspecie = pet.Especie.Nome_Especie
                });

                var sqlRaca = @"update Tb_Raca set Nome_Raca = @nomeRaca where Cod_Raca = @IdRaca;";

                var idRaca = conexao.ExecuteScalar<int>(sqlRaca, new
                {
                    IdRaca = pet.Raca.Id_Raca,
                    nomeRaca = pet.Raca.Nome_Raca
                });

                var sqlAnimal = @"update Tb_Animal set Nome_Animal = @nomeAnimal where Cod_Animal = @IdAnimal;";

                var idAnimal = conexao.ExecuteScalar<int>(sqlAnimal, new
                {
                    IdAnimal = pet.Animal.Id_Animal,
                    nomeRaca = pet.Animal.Nome_Animal
                });

                var sqlPet = @"update Tb_Pet set Nome_Pet = @nomePet, Sexo_Pet = @sexoPet, Descricao_Pet = @descricaoPet, Idade_Pet = @idadePet, Foto_Pet = @fotoPet, Porte_Pet = @portePet, Status_Pet = @statusPet where Cod_Pet = @IdPet";

                conexao.Execute(sqlPet, new
                {
                    IdPet = pet.Id_Pet,
                    nomePet = pet.Nome_Pet,
                    sexoPet = pet.Sexo_Pet,
                    descricaoPet = pet.Descricao_Pet,
                    idadePet = pet.Idade_Pet,
                    fotoPet = pet.Foto_Pet,
                    portePet = pet.Porte_Pet,
                    statusPet = pet.Status_Pet
                });
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                conexao.Close();
            }
        }
        #endregion


    }
}
