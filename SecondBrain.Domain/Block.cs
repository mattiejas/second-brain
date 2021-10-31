namespace SecondBrain.Domain;

public enum BlockData
{
    Text,
}

public class Block : BaseEntity
{
    public BlockData Type { get; set; } = BlockData.Text;
    public string Data { get; set; } = string.Empty;
    public int NoteId { get; set; }
    public Note Note { get; set; }
}
