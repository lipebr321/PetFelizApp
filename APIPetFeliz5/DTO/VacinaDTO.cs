using System;

namespace APIPetFeliz.DTO
{
    public class VacinaDTO
    {
        public int Id_Vacina { get; set; }
        public DateTime data_vacina { get; set; }
        public string status { get; set; }
        public string descricao { get; set; }
    }
}
