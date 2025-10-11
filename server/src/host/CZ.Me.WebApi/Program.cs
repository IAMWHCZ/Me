using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddProblemDetails();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication()
	.AddKeycloakJwtBearer(
		serviceName: "keycloak",
		realm: "api",
		options =>
		{
			options.Audience = "store.api";
			if (builder.Environment.IsDevelopment())
			{
				options.RequireHttpsMetadata = false;
			}
		});

builder.Services.AddAuthorizationBuilder();

var app = builder.Build();

app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger(opt => opt.RouteTemplate = "openapi/{documentName}.json");
	app.MapScalarApiReference();
}

app.MapControllers();

await app.RunAsync();
