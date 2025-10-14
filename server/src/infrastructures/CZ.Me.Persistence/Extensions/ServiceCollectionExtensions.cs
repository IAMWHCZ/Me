using CZ.Me.Persistence.Contexts;
using Microsoft.Extensions.DependencyInjection;

namespace CZ.Me.Persistence.Extensions;

public static class ServiceCollectionExtensions
{
	public static IServiceCollection AddMePersistence(this IServiceCollection services)
	{
		services.AddSingleton<DbContext>();
		
		return services;
	}
}
