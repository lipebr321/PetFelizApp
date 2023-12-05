using APIPetFeliz.DTO;
using Dapper;
using MySql.Data.MySqlClient;
using System.Data;

namespace APIPetFeliz.DAO.Usuarios
{
    public class UsuariosDAO
    {
        #region Login Usuario
        public UsuariosDTO LoginUsuario(UsuariosDTO usuario)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {
                string query = @"SELECT * FROM Tb_Usuario u left JOIN tb_logradouro l ON u.cod_log = l.cod_log left join Tb_Cidade c on l.Cod_Cidade = c.Cod_Cidade left join Tb_Estado e on c.Cod_Estado = e.Cod_Estado left join Tb_Pet p on p.Cod_Usuario = u.Cod_Usuario where Email = @email and Senha = @senha";

                var comando = new MySqlCommand(query, conexao);
                comando.Parameters.AddWithValue("@email", usuario.Email);
                comando.Parameters.AddWithValue("@senha", usuario.Senha);

                var dataReader = comando.ExecuteReader();

                var usu = new UsuariosDTO();
                while (dataReader.Read())
                {
                    usu.Id = int.Parse(dataReader["Cod_Usuario"].ToString());
                    usu.CPF = dataReader["CPF"].ToString();
                    usu.Nome = dataReader["Nome_Usuario"].ToString();
                    usu.Email = dataReader["Email"].ToString();
                    usu.Telefone = dataReader["Telefone"].ToString();
                    usu.Senha = dataReader["Senha"].ToString();
                    usu.Logradouro = new LogradouroDTO();
                    usu.Logradouro.Id = int.Parse(dataReader["Cod_Log"].ToString());
                    usu.Logradouro.NomeLog = dataReader["Nome_Log"].ToString();
                    usu.Logradouro.CEP = dataReader["CEP"].ToString();
                    usu.Logradouro.Numero = dataReader["Numero_Log"].ToString();
                    usu.Cidade = new CidadeDTO();
                    usu.Cidade.Cod_Cidade = int.Parse(dataReader["Cod_Cidade"].ToString());
                    usu.Cidade.Nome_Cidade = dataReader["Nome_Cidade"].ToString();
                    usu.Estado = new EstadoDTO();
                    usu.Estado.Cod_Estado = int.Parse(dataReader["Cod_Estado"].ToString());
                    usu.Estado.Nome_Estado = dataReader["Nome_Estado"].ToString();
                    usu.Pet = new PetsDTO();
                    usu.Pet.Id_Pet = int.Parse(dataReader["Cod_Pet"].ToString());
                }
                return usu;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conexao.Close();
            }
        }
        #endregion

        #region Cadastrar Usuario

        public void CadastrarUsuario(UsuariosDTO usuario)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {
                var sqlEstado = "insert into Tb_Estado (Cod_Estado, Nome_Estado) values (default, @estado);";

                var idEstado = conexao.ExecuteScalar<int>(sqlEstado, new
                {
                    estado = usuario.Estado.Nome_Estado,
                });

                var sqlCidade = "Insert into Tb_Cidade (Cod_Cidade, Nome_Cidade, Cod_Estado) values (default, @cidade, last_insert_id());";

                var idCidade = conexao.ExecuteScalar<int>(sqlCidade, new
                {
                    cidade = usuario.Cidade.Nome_Cidade,
                });

                var sqlEndereco = "INSERT INTO Tb_Logradouro (Cod_Log, CEP, Nome_Log, Numero_Log, Cod_Cidade) VALUES (DEFAULT, @cep, @nomeLog, @numero, last_insert_id());";

                var idEndereco = conexao.ExecuteScalar<int>(sqlEndereco, new
                {
                    cep = usuario.Logradouro.CEP,
                    nomeLog = usuario.Logradouro.NomeLog,
                    numero = usuario.Logradouro.Numero
                });

                var sqlUsuario = "insert into Tb_Usuario (Cod_Usuario, CPF, Nome_Usuario, Email, Telefone, senha, Cod_Log) values (DEFAULT, @CPF, @nome, @email, @telefone, @senha, last_insert_id());";

                conexao.Execute(sqlUsuario, new
                {
                    CPF = usuario.CPF,
                    nome = usuario.Nome,
                    email = usuario.Email,
                    telefone = usuario.Telefone,
                    senha = usuario.Senha
                });

                conexao.Close();
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

        #region Listar Usuario

        public IEnumerable<UsuariosDTO> Listar()
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {
                string query = @"
                    SELECT * FROM Tb_Usuario u
                    left JOIN tb_logradouro l ON u.cod_log = l.cod_log left join Tb_Cidade c on l.Cod_Cidade = c.Cod_Cidade left join Tb_Estado e on c.Cod_Estado = e.Cod_Estado";

                /* var usuarioDictionary = new Dictionary<int, UsuariosDTO>();

                 var usuarios = conexao.Query<UsuariosDTO, LogradouroDTO, UsuariosDTO>(
                     query,
                     (usuario, logradouro) =>
                     {
                         if (!usuarioDictionary.TryGetValue(usuario.Id, out UsuariosDTO usuarioEntry))
                         {
                             usuarioEntry = usuario;
                             usuarioEntry.Logradouro = logradouro;
                             usuarioDictionary.Add(usuario.Id, usuarioEntry);
                         }
                         return usuarioEntry;
                     },
                     splitOn: "cod_log"
                 ).AsList();*/

                var comando = new MySqlCommand(query, conexao);
                var dataReader = comando.ExecuteReader();

                var usuarios = new List<UsuariosDTO>();

                while (dataReader.Read())
                {
                    var usuario = new UsuariosDTO();
                    usuario.Id = int.Parse(dataReader["Cod_Usuario"].ToString());
                    usuario.Nome = dataReader["Nome_Usuario"].ToString();
                    usuario.CPF = dataReader["CPF"].ToString();
                    usuario.Email = dataReader["Email"].ToString();
                    usuario.Telefone = dataReader["Telefone"].ToString();
                    usuario.Senha = dataReader["Senha"].ToString();

                    usuario.Logradouro = new LogradouroDTO();
                    usuario.Logradouro.Id = int.Parse(dataReader["Cod_Log"].ToString());
                    usuario.Logradouro.CEP = dataReader["CEP"].ToString();
                    usuario.Logradouro.NomeLog = dataReader["Nome_Log"].ToString();
                    usuario.Logradouro.Numero = dataReader["Numero_Log"].ToString();

                    usuario.Cidade = new CidadeDTO();
                    usuario.Cidade.Cod_Cidade = int.Parse(dataReader["Cod_Cidade"].ToString());
                    usuario.Cidade.Nome_Cidade = dataReader["Nome_Cidade"].ToString();

                    usuario.Estado = new EstadoDTO();
                    usuario.Estado.Cod_Estado = int.Parse(dataReader["Cod_Estado"].ToString());
                    usuario.Estado.Nome_Estado = dataReader["Nome_Estado"].ToString();

                    usuarios.Add(usuario);
                }

                return usuarios;

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

        #region Listar Usuario por id

        public UsuariosDTO ListarPorId(int id)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {
                string query = @"
                    SELECT * FROM Tb_Usuario u
                    left JOIN tb_logradouro l ON u.cod_log = l.cod_log left join Tb_Cidade c on l.Cod_Cidade = c.Cod_Cidade left join Tb_Estado e on c.Cod_Estado = e.Cod_Estado where Cod_Usuario = @id";

                var comando = new MySqlCommand(query, conexao);
                comando.Parameters.AddWithValue("@id", id);

                var dataReader = comando.ExecuteReader();

                var usuario = new UsuariosDTO();

                while (dataReader.Read())
                {
                    usuario.Id = int.Parse(dataReader["Cod_Usuario"].ToString());
                    usuario.Nome = dataReader["Nome_Usuario"].ToString();
                    usuario.CPF = dataReader["CPF"].ToString();
                    usuario.Email = dataReader["Email"].ToString();
                    usuario.Telefone = dataReader["Telefone"].ToString();
                    usuario.Senha = dataReader["Senha"].ToString();

                    usuario.Logradouro = new LogradouroDTO();
                    usuario.Logradouro.Id = int.Parse(dataReader["Cod_Log"].ToString());
                    usuario.Logradouro.CEP = dataReader["CEP"].ToString();
                    usuario.Logradouro.NomeLog = dataReader["Nome_Log"].ToString();
                    usuario.Logradouro.Numero = dataReader["Numero_Log"].ToString();

                    usuario.Cidade = new CidadeDTO();
                    usuario.Cidade.Cod_Cidade = int.Parse(dataReader["Cod_Cidade"].ToString());
                    usuario.Cidade.Nome_Cidade = dataReader["Nome_Cidade"].ToString();

                    usuario.Estado = new EstadoDTO();
                    usuario.Estado.Cod_Estado = int.Parse(dataReader["Cod_Estado"].ToString());
                    usuario.Estado.Nome_Estado = dataReader["Nome_Estado"].ToString();

                }

                return usuario;

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

        #region Atualizar Usuario

        public void AtualizarUsuario(UsuariosDTO usuario)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {

                var sqlUsuario = @"UPDATE Tb_Usuario SET Nome_Usuario = @Nome, Telefone = @Telefone, Senha = @senha WHERE Cod_Usuario = @IdUsuario;
                                    SELECT cod_log FROM Tb_Usuario WHERE  Cod_Usuario = @IdUsuario;";
                var idLogradouro = conexao.QueryFirstOrDefault<int>(sqlUsuario, new { IdUsuario = usuario.Id, Nome = usuario.Nome, Telefone = usuario.Telefone, senha = usuario.Senha });
                var idCidade = 0;
                var idEstado = 0;
                if (usuario.Logradouro != null)
                {
                    var sqlLogradouro = @"UPDATE Tb_Logradouro SET Nome_Log = @NomeLog, CEP = @CEP, Numero_Log = @Numero WHERE Cod_Log = @IdLogradouro;
                                            Select Cod_Cidade from Tb_Logradouro where Cod_Log = @IdLogradouro";
                    idCidade = conexao.QueryFirstOrDefault<int>(sqlLogradouro, new { IdLogradouro = idLogradouro, NomeLog = usuario.Logradouro.NomeLog, CEP = usuario.Logradouro.CEP, Numero = usuario.Logradouro.Numero });
                }

                if (usuario.Cidade != null)
                {
                    var sqlCidade = @"UPDATE Tb_Cidade SET Nome_Cidade = @NomeCidade WHERE Cod_Cidade = @IdCidade;
                                        Select Cod_Estado from Tb_Cidade where Cod_Cidade = @IdCidade";
                    idEstado = conexao.QueryFirstOrDefault<int>(sqlCidade, new { IdCidade = idCidade, NomeCidade = usuario.Cidade.Nome_Cidade });
                }

                if (usuario.Estado != null)
                {
                    var sqlEstado = "UPDATE Tb_Estado SET Nome_Estado = @NomeEstado WHERE Cod_Estado = @IdEstado";
                    conexao.Execute(sqlEstado, new { IdEstado = idEstado, NomeEstado = usuario.Estado.Nome_Estado });
                }



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

        #region Apagar Usuario
        public void RemoverUsuario(int idUsuario)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            using (MySqlCommand cmd = new MySqlCommand())
                try
                {

                    cmd.Connection = conexao;

                    cmd.CommandText = "SELECT Cod_Log FROM Tb_Usuario WHERE Cod_Usuario = @IdUsuario";
                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);
                    int codLog = (int)cmd.ExecuteScalar();

                    cmd.Parameters.Clear();
                    cmd.CommandText = "UPDATE Tb_Usuario SET Cod_Log = NULL WHERE Cod_Usuario = @IdUsuario";
                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);
                    int linhasAfetadasChaveEstrangeira = cmd.ExecuteNonQuery();

                    cmd.Parameters.Clear();
                    cmd.CommandText = "DELETE FROM Tb_Usuario WHERE Cod_Usuario = @IdUsuario";
                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);
                    int linhasAfetadasUsuario = cmd.ExecuteNonQuery();

                    cmd.Parameters.Clear();
                    cmd.CommandText = "DELETE FROM Tb_Logradouro WHERE Cod_Log = @CodLog";
                    cmd.Parameters.AddWithValue("@CodLog", codLog);
                    int linhasAfetadasLogradouro = cmd.ExecuteNonQuery();
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

        #region Recuperar Senha
        public string RecuperarSenha(string email)
        {
            string senha = null;

            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {
                string query = @"select Senha from Tb_Usuario where Email = @email";

                using (MySqlCommand comando = new MySqlCommand(query, conexao))
                {
                    //var comando = new MySqlCommand(query, conexao);
                    comando.Parameters.AddWithValue("@email", email);

                    using (MySqlDataReader reader = comando.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            senha = reader["Senha"].ToString();
                        }
                    }
                }
                return senha;
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

