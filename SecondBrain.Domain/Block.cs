namespace SecondBrain.Domain;

public enum BlockType
{
    Text,
}

public class Block : BaseEntity
{
    public BlockType Type { get; set; } = BlockType.Text;
    public string Data { get; set; } = string.Empty;
    public int NoteId { get; set; }
    public Note Note { get; set; }
}
