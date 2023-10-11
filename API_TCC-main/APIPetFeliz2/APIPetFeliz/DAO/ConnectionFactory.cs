using MySql.Data.MySqlClient;
using MySqlConnection = MySql.Data.MySqlClient.MySqlConnection;

namespace APIPetFeliz.DAO
{
    public class ConnectionFactory
    {
        public static MySqlConnection Build()
        {
            return new MySqlConnection("Server=localhost;Database=Bd_Pet_Feliz;Uid=root;Pwd=root;");
        }
    }
}
