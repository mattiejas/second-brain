using SecondBrain.Domain;

namespace SecondBrain.Business.Notes
{
    public interface INoteRepository : IRepository<Note>
    {
        Task<ICollection<Note>> GetNotesByUserId(string userId);
    }
}
