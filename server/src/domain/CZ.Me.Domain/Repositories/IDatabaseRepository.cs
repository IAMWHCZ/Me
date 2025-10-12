using System.Data;
using System.Linq.Expressions;

namespace CZ.Me.Domain.Repositories;

/// <summary>
/// 通用数据访问接口，提供基于Dapper的数据访问功能
/// </summary>
public interface IDatabaseRepository
{
    // 基础查询方法（保留原始方法以便需要时使用）
    
    /// <summary>
    /// 执行SQL查询并返回多个结果
    /// </summary>
    /// <typeparam name="T">返回结果的类型</typeparam>
    /// <param name="sql">要执行的SQL语句</param>
    /// <param name="param">SQL参数对象</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <param name="commandType">命令类型</param>
    /// <returns>查询结果集合</returns>
    Task<IEnumerable<T>> QueryAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null);
    
    /// <summary>
    /// 执行SQL查询并返回第一个结果或默认值
    /// </summary>
    /// <typeparam name="T">返回结果的类型</typeparam>
    /// <param name="sql">要执行的SQL语句</param>
    /// <param name="param">SQL参数对象</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <param name="commandType">命令类型</param>
    /// <returns>查询结果或默认值</returns>
    Task<T> QueryFirstOrDefaultAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null);
    
    /// <summary>
    /// 执行SQL查询并返回单个结果，如果没有结果或多个结果则抛出异常
    /// </summary>
    /// <typeparam name="T">返回结果的类型</typeparam>
    /// <param name="sql">要执行的SQL语句</param>
    /// <param name="param">SQL参数对象</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <param name="commandType">命令类型</param>
    /// <returns>查询结果</returns>
    Task<T> QuerySingleAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null);
    
    // 基础执行方法（保留原始方法以便需要时使用）
    
    /// <summary>
    /// 执行SQL命令并返回受影响的行数
    /// </summary>
    /// <param name="sql">要执行的SQL语句</param>
    /// <param name="param">SQL参数对象</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <param name="commandType">命令类型</param>
    /// <returns>受影响的行数</returns>
    Task<int> ExecuteAsync(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null);
    
    /// <summary>
    /// 执行SQL命令并返回第一行第一列的值
    /// </summary>
    /// <param name="sql">要执行的SQL语句</param>
    /// <param name="param">SQL参数对象</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <param name="commandType">命令类型</param>
    /// <returns>第一行第一列的值</returns>
    Task<object> ExecuteScalarAsync(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null);
    
    // 事务相关方法
    
    /// <summary>
    /// 开始一个数据库事务
    /// </summary>
    /// <returns>数据库事务对象</returns>
    Task<IDbTransaction> BeginTransactionAsync();
    
    /// <summary>
    /// 提交数据库事务
    /// </summary>
    /// <param name="transaction">要提交的事务</param>
    Task CommitTransactionAsync(IDbTransaction transaction);
    
    /// <summary>
    /// 回滚数据库事务
    /// </summary>
    /// <param name="transaction">要回滚的事务</param>
    Task RollbackTransactionAsync(IDbTransaction transaction);
    
    // 批量操作方法（保留原始方法以便需要时使用）
    
    /// <summary>
    /// 批量插入数据
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="entities">要插入的实体集合</param>
    /// <param name="tableName">表名，如果为null则使用实体类型名</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>受影响的行数</returns>
    Task<int> BulkInsertAsync<T>(IEnumerable<T> entities, string tableName = null, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 批量更新数据
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="entities">要更新的实体集合</param>
    /// <param name="tableName">表名，如果为null则使用实体类型名</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>受影响的行数</returns>
    Task<int> BulkUpdateAsync<T>(IEnumerable<T> entities, string tableName = null, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 批量删除数据
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="entities">要删除的实体集合</param>
    /// <param name="tableName">表名，如果为null则使用实体类型名</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>受影响的行数</returns>
    Task<int> BulkDeleteAsync<T>(IEnumerable<T> entities, string tableName = null, IDbTransaction transaction = null, int? commandTimeout = null);
    
    // 存储过程相关方法（保留原始方法以便需要时使用）
    
    /// <summary>
    /// 执行存储过程并返回多个结果
    /// </summary>
    /// <typeparam name="T">返回结果的类型</typeparam>
    /// <param name="storedProcedureName">存储过程名称</param>
    /// <param name="param">存储过程参数</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>查询结果集合</returns>
    Task<IEnumerable<T>> ExecuteStoredProcedureAsync<T>(string storedProcedureName, object param = null, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 执行存储过程并返回第一个结果或默认值
    /// </summary>
    /// <typeparam name="T">返回结果的类型</typeparam>
    /// <param name="storedProcedureName">存储过程名称</param>
    /// <param name="param">存储过程参数</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>查询结果或默认值</returns>
    Task<T> ExecuteStoredProcedureFirstOrDefaultAsync<T>(string storedProcedureName, object param = null, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 执行存储过程并返回受影响的行数
    /// </summary>
    /// <param name="storedProcedureName">存储过程名称</param>
    /// <param name="param">存储过程参数</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>受影响的行数</returns>
    Task<int> ExecuteStoredProcedureAsync(string storedProcedureName, object param = null, IDbTransaction transaction = null, int? commandTimeout = null);
    
    // 连接管理方法
    
    /// <summary>
    /// 获取打开的数据库连接
    /// </summary>
    /// <returns>打开的数据库连接</returns>
    Task<IDbConnection> GetOpenConnectionAsync();
    
    /// <summary>
    /// 关闭数据库连接
    /// </summary>
    /// <param name="connection">要关闭的数据库连接</param>
    void CloseConnection(IDbConnection connection);
    
    // 动态SQL构建方法（保留原始方法以便需要时使用）
    
    /// <summary>
    /// 根据表达式条件查询数据
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="predicate">查询条件表达式</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>查询结果集合</returns>
    Task<IEnumerable<T>> QueryWhereAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 根据表达式条件删除数据
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="predicate">删除条件表达式</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>受影响的行数</returns>
    Task<int> DeleteWhereAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 根据表达式条件更新数据
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="predicate">更新条件表达式</param>
    /// <param name="updateData">更新数据对象</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>受影响的行数</returns>
    Task<int> UpdateWhereAsync<T>(Expression<Func<T, bool>> predicate, object updateData, IDbTransaction transaction = null, int? commandTimeout = null);
    
    // ====== 新增的基于实体的基础方法 ======
    
    // 基础CRUD操作
    
    /// <summary>
    /// 根据ID获取实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="id">实体ID</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>实体对象</returns>
    Task<T> GetByIdAsync<T>(object id, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 获取所有实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>实体集合</returns>
    Task<IEnumerable<T>> GetAllAsync<T>(IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 插入单个实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="entity">要插入的实体</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>受影响的行数</returns>
    Task<int> InsertAsync<T>(T entity, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 更新单个实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="entity">要更新的实体</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>是否更新成功</returns>
    Task<bool> UpdateAsync<T>(T entity, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 根据ID删除实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="id">实体ID</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>是否删除成功</returns>
    Task<bool> DeleteAsync<T>(object id, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 删除实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="entity">要删除的实体</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>是否删除成功</returns>
    Task<bool> DeleteAsync<T>(T entity, IDbTransaction transaction = null, int? commandTimeout = null);
    
    // 批量操作
    
    /// <summary>
    /// 批量插入实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="entities">要插入的实体集合</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>受影响的行数</returns>
    Task<int> InsertRangeAsync<T>(IEnumerable<T> entities, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 批量更新实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="entities">要更新的实体集合</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>受影响的行数</returns>
    Task<int> UpdateRangeAsync<T>(IEnumerable<T> entities, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 批量删除实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="entities">要删除的实体集合</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>受影响的行数</returns>
    Task<int> DeleteRangeAsync<T>(IEnumerable<T> entities, IDbTransaction transaction = null, int? commandTimeout = null);
    
    // 条件查询
    
    /// <summary>
    /// 根据条件查询多个实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="predicate">查询条件表达式</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>实体集合</returns>
    Task<IEnumerable<T>> FindAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 根据条件查询第一个实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="predicate">查询条件表达式</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>实体对象或默认值</returns>
    Task<T> FindFirstOrDefaultAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 根据条件查询单个实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="predicate">查询条件表达式</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>实体对象</returns>
    Task<T> FindSingleAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null, int? commandTimeout = null);
    
    // 条件操作
    
    /// <summary>
    /// 根据条件批量删除
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="predicate">删除条件表达式</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>受影响的行数</returns>
    Task<int> DeleteManyAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 根据条件批量更新
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="predicate">更新条件表达式</param>
    /// <param name="updateData">更新数据对象</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>受影响的行数</returns>
    Task<int> UpdateManyAsync<T>(Expression<Func<T, bool>> predicate, object updateData, IDbTransaction transaction = null, int? commandTimeout = null);
    
    // 分页查询
    
    /// <summary>
    /// 分页查询
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="page">页码（从1开始）</param>
    /// <param name="pageSize">每页大小</param>
    /// <param name="predicate">查询条件表达式</param>
    /// <param name="orderBy">排序表达式</param>
    /// <param name="ascending">是否升序排序</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>分页结果，包含数据项和总数量</returns>
    Task<(IEnumerable<T> Items, int TotalCount)> GetPagedAsync<T>(int page, int pageSize, Expression<Func<T, bool>> predicate = null, Expression<Func<T, object>> orderBy = null, bool ascending = true, IDbTransaction transaction = null, int? commandTimeout = null);
    
    // 计数查询
    
    /// <summary>
    /// 计算满足条件的实体数量
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="predicate">查询条件表达式</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>实体数量</returns>
    Task<int> CountAsync<T>(Expression<Func<T, bool>> predicate = null, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 检查是否存在满足条件的实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="predicate">查询条件表达式</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>是否存在满足条件的实体</returns>
    Task<bool> ExistsAsync<T>(Expression<Func<T, bool>> predicate, IDbTransaction transaction = null, int? commandTimeout = null);
    
    // 包含查询
    
    /// <summary>
    /// 查询实体并包含关联实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="predicate">查询条件表达式</param>
    /// <param name="includes">要包含的关联实体表达式</param>
    /// <returns>实体集合</returns>
    Task<IEnumerable<T>> FindWithIncludesAsync<T>(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includes);
    
    /// <summary>
    /// 查询第一个实体并包含关联实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="predicate">查询条件表达式</param>
    /// <param name="includes">要包含的关联实体表达式</param>
    /// <returns>实体对象或默认值</returns>
    Task<T> FindFirstOrDefaultWithIncludesAsync<T>(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includes);
    
    // 原生SQL查询（可选）
    
    /// <summary>
    /// 执行原生SQL查询
    /// </summary>
    /// <typeparam name="T">返回结果的类型</typeparam>
    /// <param name="sql">要执行的SQL语句</param>
    /// <param name="param">SQL参数对象</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>查询结果集合</returns>
    Task<IEnumerable<T>> FromSqlAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null);
    
    /// <summary>
    /// 执行原生SQL查询并返回第一个结果
    /// </summary>
    /// <typeparam name="T">返回结果的类型</typeparam>
    /// <param name="sql">要执行的SQL语句</param>
    /// <param name="param">SQL参数对象</param>
    /// <param name="transaction">数据库事务</param>
    /// <param name="commandTimeout">命令超时时间（秒）</param>
    /// <returns>查询结果或默认值</returns>
    Task<T> FromSqlFirstOrDefaultAsync<T>(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null);
}
