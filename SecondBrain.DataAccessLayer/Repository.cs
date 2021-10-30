using Microsoft.EntityFrameworkCore;
using SecondBrain.Business;

namespace SecondBrain.DataAccessLayer;

public class Repository<T> : IRepository<T> where T : class
{
    private BrainContext _context;

    public Repository()
    {
        this._context = new BrainContext();
    }
    public Repository(BrainContext _context)
    {
        this._context = _context;
    }
    public IEnumerable<T> GetAll()
    {
        return _context.Set<T>().ToList();
    }
    public void Insert(T obj)
    {
        _context.Set<T>().Add(obj);
    }
    public void Update(T obj)
    {
        _context.Set<T>().Attach(obj);
        _context.Entry(obj).State = EntityState.Modified;
    }
    public void Delete(object id)
    {
        T existing = _context.Set<T>().Find(id);
        _context.Set<T>().Remove(existing);
    }
    public void Save()
    {
        _context.SaveChanges();
    }
    public T FindById(object id)
    {
        return _context.Set<T>().Find(id);
    }
    public async Task<T> FindByIdAsync(object id)
    {
        return await _context.Set<T>().FindAsync(id);
    }
}
