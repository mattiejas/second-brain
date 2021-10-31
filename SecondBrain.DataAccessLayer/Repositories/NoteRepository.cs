using SecondBrain.Domain;
using SecondBrain.Business.Notes;
using Microsoft.EntityFrameworkCore;

namespace SecondBrain.DataAccessLayer.Repositories;

public class NoteRepository : Repository<Note>, INoteRepository
{
    private readonly BrainContext _context;
    public NoteRepository(BrainContext context) : base(context)
    {
        _context = context;
    }

    public async Task<ICollection<Note>> GetNotesByUserId(string userId)
    {
        return await _context.Notes.Where(n => n.AuthorId == userId).ToListAsync();
    }
}
