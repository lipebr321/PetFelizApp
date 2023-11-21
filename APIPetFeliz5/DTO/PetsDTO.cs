namespace APIPetFeliz.DTO
{
    public class PetsDTO
    {
        public int Id_Pet { get; set; }
        public string Nome_Pet { get; set; }
        public string Sexo_Pet { get; set; }
        public string Descricao_Pet { get; set; }
        public string Idade_Pet { get; set; }
        public string Foto_Pet { get; set; }
        public string Nome_Foto { get; set; }
        public string Base64 { get; set; }
        public string Porte_Pet { get; set; }
        public string Status_Pet { get; set; }
        public string Castrado { get; set; }
        public int Cod_Usuario { get; set; }
        public AnimalDTO Animal { get; set; }
        public EspecieDTO Especie { get; set; }
        public RacaDTO Raca { get; set; }
        public VacinaDTO Vacina { get; set; }
        public UsuariosDTO? Usuario { get; set; }
        public LogradouroDTO? logradouro { get; set; }
        public CidadeDTO? Cidade { get; set; }
        public EstadoDTO? Estado { get; set; }
    }
}
