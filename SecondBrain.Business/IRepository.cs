namespace SecondBrain.Business;

public interface IRepository<T> where T : class
{
    IEnumerable<T> GetAll();
    T FindById(object id);
    Task<T> FindByIdAsync(object id);
    void Insert(T obj);
    void Update(T obj);
    void Delete(object id);
    void Save();
}
