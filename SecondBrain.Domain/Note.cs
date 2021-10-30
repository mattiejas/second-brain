namespace SecondBrain.Domain;
public class Note : BaseEntity
{
    public string Title { get; set; } = "";
    public ICollection<Block> Content { get; set; } = new List<Block>();
    public int AuthorId { get; set; }
    public User Author { get; set; }
}


