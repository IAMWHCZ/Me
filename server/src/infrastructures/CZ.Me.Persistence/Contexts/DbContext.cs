namespace CZ.Me.Persistence.Contexts;

public class DbContext
{
	public  IDbConnection CreateDbConnection(string connectionString)
	{
		return new SqlConnection(connectionString);
	}
}
