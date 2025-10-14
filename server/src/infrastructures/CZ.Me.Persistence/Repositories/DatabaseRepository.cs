using System.Linq.Expressions;
using CZ.Me.Domain.Repositories;
using CZ.Me.Persistence.Contexts;

namespace CZ.Me.Persistence.Repositories;

public class DatabaseRepository: IDatabaseRepository
{
	public Task<IEnumerable<T>> QueryAsync<T>(string sql, object param = null, IDbTransaction transaction = null,
		int? commandTimeout = null, CommandType? commandType = null)
	{
		throw new NotImplementedException();
	}

	public Task<T> QueryFirstOrDefaultAsync<T>(string sql, object param = null, IDbTransaction transaction = null,
		int? commandTimeout = null, CommandType? commandType = null)
	{
		throw new NotImplementedException();
	}

	public Task<T> QuerySingleAsync<T>(string sql, object param = null, IDbTransaction transaction = null,
		int? commandTimeout = null, CommandType? commandType = null)
	{
		throw new NotImplementedException();
	}

	public Task<int> ExecuteAsync(string sql, object param = null, IDbTransaction transaction = null,
		int? commandTimeout = null, CommandType? commandType = null)
	{
		throw new NotImplementedException();
	}

	public Task<object> ExecuteScalarAsync(string sql, object param = null, IDbTransaction transaction = null,
		int? commandTimeout = null, CommandType? commandType = null)
	{
		throw new NotImplementedException();
	}

	public Task<IDbTransaction> BeginTransactionAsync()
	{
		throw new NotImplementedException();
	}

	public Task CommitTransactionAsync(IDbTransaction transaction)
	{
		throw new NotImplementedException();
	}

	public Task RollbackTransactionAsync(IDbTransaction transaction)
	{
		throw new NotImplementedException();
	}

	public Task<int> BulkInsertAsync<T>(IEnumerable<T> entities, string tableName = null,
		IDbTransaction transaction = null, int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<int> BulkUpdateAsync<T>(IEnumerable<T> entities, string tableName = null,
		IDbTransaction transaction = null, int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<int> BulkDeleteAsync<T>(IEnumerable<T> entities, string tableName = null,
		IDbTransaction transaction = null, int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<IEnumerable<T>> ExecuteStoredProcedureAsync<T>(string storedProcedureName, object param = null,
		IDbTransaction transaction = null, int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<T> ExecuteStoredProcedureFirstOrDefaultAsync<T>(string storedProcedureName, object param = null,
		IDbTransaction transaction = null, int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<int> ExecuteStoredProcedureAsync(string storedProcedureName, object param = null,
		IDbTransaction transaction = null, int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<IDbConnection> GetOpenConnectionAsync()
	{
		throw new NotImplementedException();
	}

	public void CloseConnection(IDbConnection connection)
	{
		throw new NotImplementedException();
	}

	public Task<IEnumerable<T>> QueryWhereAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<int> DeleteWhereAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<int> UpdateWhereAsync<T>(Expression<Func<T, bool>> predicate, object updateData, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<T> GetByIdAsync<T>(object id, IDbTransaction transaction = null, int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<IEnumerable<T>> GetAllAsync<T>(IDbTransaction transaction = null, int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<int> InsertAsync<T>(T entity, IDbTransaction transaction = null, int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<bool> UpdateAsync<T>(T entity, IDbTransaction transaction = null, int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<bool> DeleteAsync<T>(object id, IDbTransaction transaction = null, int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<bool> DeleteAsync<T>(T entity, IDbTransaction transaction = null, int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<int> InsertRangeAsync<T>(IEnumerable<T> entities, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<int> UpdateRangeAsync<T>(IEnumerable<T> entities, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<int> DeleteRangeAsync<T>(IEnumerable<T> entities, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<IEnumerable<T>> FindAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<T> FindFirstOrDefaultAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<T> FindSingleAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<int> DeleteManyAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<int> UpdateManyAsync<T>(Expression<Func<T, bool>> predicate, object updateData, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<(IEnumerable<T> Items, int TotalCount)> GetPagedAsync<T>(int page, int pageSize, Expression<Func<T, bool>> predicate = null,
		Expression<Func<T, object>> orderBy = null, bool ascending = true, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<int> CountAsync<T>(Expression<Func<T, bool>> predicate = null, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<bool> ExistsAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<IEnumerable<T>> FindWithIncludesAsync<T>(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includes)
	{
		throw new NotImplementedException();
	}

	public Task<T> FindFirstOrDefaultWithIncludesAsync<T>(Expression<Func<T, bool>> predicate = null,
		params Expression<Func<T, object>>[] includes)
	{
		throw new NotImplementedException();
	}

	public Task<IEnumerable<T>> FromSqlAsync<T>(string sql, object param = null, IDbTransaction transaction = null,
		int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}

	public Task<T> FromSqlFirstOrDefaultAsync<T>(string sql, object param = null,
		IDbTransaction transaction = null, int? commandTimeout = null)
	{
		throw new NotImplementedException();
	}
}
