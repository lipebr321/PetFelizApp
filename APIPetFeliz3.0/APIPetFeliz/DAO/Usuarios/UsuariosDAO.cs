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
                string query = "select * from Tb_Usuario where Email = @email and Senha = @senha";

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
                var sqlEndereco = "INSERT INTO Tb_Logradouro VALUES (DEFAULT, @cep, @nomeLog, @numero);";

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

        public UsuariosDTO ListarPorId(int id)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {
                string query = @"
            SELECT * FROM Tb_Usuario u
            INNER JOIN tb_logradouro l ON u.cod_log = l.cod_log
            WHERE u.Cod_Usuario = @Id";

                var comando = new MySqlCommand(query, conexao);
                comando.Parameters.AddWithValue("@Id", id);
                var dataReader = comando.ExecuteReader();

                if (dataReader.Read())
                {
                    var usuario = new UsuariosDTO();
                    usuario.Id = int.Parse(dataReader["Cod_Usuario"].ToString());
                    usuario.Nome = dataReader["Nome_Usuario"].ToString();
                    usuario.CPF = dataReader["CPF"].ToString();
                    usuario.Email = dataReader["Email"].ToString();
                    usuario.Telefone = dataReader["Telefone"].ToString();
                    usuario.Senha = dataReader["Senha"].ToString();

                    usuario.Logradouro = new LogradouroDTO();
                    usuario.Logradouro.CEP = dataReader["CEP"].ToString();
                    usuario.Logradouro.NomeLog = dataReader["Nome_Log"].ToString();
                    usuario.Logradouro.Numero = dataReader["Numero_Log"].ToString();

                    return usuario;
                }

                // Retorna null se o usuário não for encontrado
                return null;
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

        #region Alterar Usuario
        public void AlterarUsuario(UsuariosDTO usuario)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {

                var sqlEndereco = @"update Tb_Logradouro set CEP = @cep, Nome_Log = @nomeLog, Numero_Log = @numero where Cod_Log = @Id;";

                var idEndereco = conexao.ExecuteScalar<int>(sqlEndereco, new
                {
                    Id = usuario.Logradouro.Id,
                    cep = usuario.Logradouro.CEP,
                    nomeLog = usuario.Logradouro.NomeLog,
                    numero = usuario.Logradouro.Numero
                });

                var sqlUsuario = "update Tb_Usuario set Nome_Usuario = @nome, Email = @email, Telefone = @telefone, senha = @senha where Cod_Usuario = @Id;";

                conexao.Execute(sqlUsuario, new
                {
                    Id = usuario.Id,
                    nome = usuario.Nome,
                    email = usuario.Email,
                    telefone = usuario.Telefone,
                    senha = usuario.Senha
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

