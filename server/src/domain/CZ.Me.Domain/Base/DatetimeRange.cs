namespace CZ.Me.Domain.Base;

public class DatetimeRange
{
	public DateTime? Start { get; set; }
	public DateTime? End { get; set; }
	
	public TimeSpan? Duration
	{
		get
		{
			if (Start.HasValue && End.HasValue)
			{
				return End.Value - Start.Value;
			}
			return null;
		}
	}
	
	public DatetimeRange()
	{
	}
	
	public DatetimeRange(DateTime? start, DateTime? end)
	{
		Start = start;
		End = end;
	}
	
	public bool IsValid()
	{
		if (!Start.HasValue || !End.HasValue)
			return false;
		
		return Start.Value <= End.Value;
	}
	
	public bool Contains(DateTime dateTime)
	{
		if (!IsValid())
			return false;
			
		return dateTime >= Start!.Value && dateTime <= End!.Value;
	}
	
	public bool Overlaps(DatetimeRange range)
	{
		if (!IsValid() || !range.IsValid())
			return false;
			
		return Start!.Value < range.End!.Value && End!.Value > range.Start!.Value;
	}
	
	public DatetimeRange? Intersection(DatetimeRange range)
	{
		if (!Overlaps(range))
			return null;
			
		var newStart = Start!.Value > range.Start!.Value ? Start.Value : range.Start.Value;
		var newEnd = End!.Value < range.End!.Value ? End.Value : range.End.Value;
		
		return new DatetimeRange(newStart, newEnd);
	}
	
	public DatetimeRange Expand(TimeSpan amount)
	{
		var newStart = Start?.Subtract(amount);
		var newEnd = End?.Add(amount);
		return new DatetimeRange(newStart, newEnd);
	}
	
	public DatetimeRange Shift(TimeSpan amount)
	{
		var newStart = Start?.Add(amount);
		var newEnd = End?.Add(amount);
		return new DatetimeRange(newStart, newEnd);
	}
	
	public override string ToString()
	{
		return Start switch
		{
			null when !End.HasValue => "未指定时间范围",
			null => $"截止于 {End.Value:yyyy-MM-dd HH:mm:ss}",
			_ => !End.HasValue
				? $"开始于 {Start.Value:yyyy-MM-dd HH:mm:ss}"
				: $"{Start.Value:yyyy-MM-dd HH:mm:ss} 至 {End.Value:yyyy-MM-dd HH:mm:ss}"
		};
	}

	public override bool Equals(object? obj)
	{
		if (obj is not DatetimeRange other)
			return false;
			
		return Start == other.Start && End == other.End;
	}

	public override int GetHashCode()
	{
		return HashCode.Combine(Start, End);
	}
}
