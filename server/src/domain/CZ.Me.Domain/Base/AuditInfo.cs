namespace CZ.Me.Domain.Base;

public class AuditInfo
{
	public DateTime CreatedTime { get; set; }
	public Guid CreatedBy { get; set; }
	public DateTime UpdatedTime { get; set; } = DateTime.Now;
	public Guid UpdatedBy { get; set; }
}
