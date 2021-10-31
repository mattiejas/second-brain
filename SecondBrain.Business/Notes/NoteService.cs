using SecondBrain.Business.Auth;
using SecondBrain.Domain;
using SecondBrain.Domain.Exceptions;

namespace SecondBrain.Business.Notes;

public class NoteService
{
    private readonly INoteRepository _noteRepository;
    private readonly IUserRepository _userRepository;

    public NoteService(INoteRepository noteRepository, IUserRepository userRepository)
    {
        _noteRepository = noteRepository;
        _userRepository = userRepository;
    }

    public async Task<ICollection<Note>> GetNotesByUserId(string userId)
    {
        var user = await _userRepository.FindByIdAsync(userId);

        if (user == null)
        {
            throw new NotFoundException($"User with ID = {userId} has not been found.");
        }

        return await _noteRepository.GetNotesByUserId(userId);
    }

    public object? CreateNote(Note? note)
    {
        throw new NotImplementedException();
    }
}
