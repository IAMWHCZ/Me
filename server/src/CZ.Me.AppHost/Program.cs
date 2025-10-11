var builder = DistributedApplication.CreateBuilder(args);

var sqlServerPassword = builder.AddParameter("sqlserver-password", secret: false);
var sqlServer = builder.AddSqlServer("mssql", sqlServerPassword, 1433)
	.WithDataVolume("mssql-data");
			
var userHubDb = sqlServer
	.AddDatabase("UserHub");

var keycloakDb = sqlServer
	.AddDatabase("KeycloakHub");

var keycloakUsername = builder.AddParameter("keycloak-username");
var keycloakPassword = builder.AddParameter("keycloak-password", secret: false);

builder
	.AddKeycloak("keycloak",6060, keycloakUsername, keycloakPassword)
	.WithDataVolume("keycloak-data")
	.WaitFor(keycloakDb)
	.WithEnvironment("KC_DB_VENDOR", "mssql")
	.WithEnvironment("KC_DB", "mssql")
	.WithEnvironment("KC_DB_USERNAME", "sa")
	.WithEnvironment("KC_DB_PASSWORD", sqlServerPassword)
	.WithEnvironment("KC_DB_URL", "jdbc:sqlserver://mssql:1433;databaseName=KeycloakHub;encrypt=true;trustServerCertificate=true");

await builder
	.Build()
	.RunAsync();
