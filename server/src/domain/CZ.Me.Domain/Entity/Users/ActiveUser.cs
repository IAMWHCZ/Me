using CZ.Me.Domain.Base;

namespace CZ.Me.Domain.Entity.Users;

using Core.Attribution;

[Table("ActiveUser")]
public class ActiveUser
{
	public string Id { get; set; } = Guid.NewGuid().ToString();
	
	public string Email { get; set; } = string.Empty;
	
	public string? Firstname { get; set; }
	
	public string? Lastname { get; set; }
	
	public string? Username { get; set; }

	public AuditInfo AuditInfo { get; set; } = new();
	
	[NotMapped]
	public string? FullName => string.IsNullOrEmpty(Lastname) 
		? Firstname 
		: $"{Firstname} {Lastname}";
}
