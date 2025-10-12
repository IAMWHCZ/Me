using CZ.Me.Domain.Base;

namespace CZ.Me.Domain.Extensions;

public static class DateRangeExtensions
{
	// 静态工厂方法
	public static DatetimeRange FromDuration(DateTime start, TimeSpan duration)
	{
		return new DatetimeRange(start, start.Add(duration));
	}

	public static DatetimeRange Today()
	{
		var today = DateTime.Today;
		return new DatetimeRange(today, today.AddDays(1).AddTicks(-1));
	}

	public static DatetimeRange ThisWeek(DayOfWeek firstDayOfWeek = DayOfWeek.Monday)
	{
		var today = DateTime.Today;
		var diff = (7 + (today.DayOfWeek - firstDayOfWeek)) % 7;
		var startOfWeek = today.AddDays(-diff);
		var endOfWeek = startOfWeek.AddDays(6);
		return new DatetimeRange(startOfWeek, endOfWeek.AddDays(1).AddTicks(-1));
	}

	public static DatetimeRange ThisMonth()
	{
		var today = DateTime.Today;
		var startOfMonth = new DateTime(today.Year, today.Month, 1);
		var endOfMonth = startOfMonth.AddMonths(1).AddDays(-1);
		return new DatetimeRange(startOfMonth, endOfMonth.AddDays(1).AddTicks(-1));
	}

	public static DatetimeRange ThisYear()
	{
		var today = DateTime.Today;
		var startOfYear = new DateTime(today.Year, 1, 1);
		var endOfYear = new DateTime(today.Year, 12, 31);
		return new DatetimeRange(startOfYear, endOfYear.AddDays(1).AddTicks(-1));
	}

	public static DatetimeRange LastWeek(DayOfWeek firstDayOfWeek = DayOfWeek.Monday)
	{
		var today = DateTime.Today;
		var diff = (7 + (today.DayOfWeek - firstDayOfWeek)) % 7;
		var startOfLastWeek = today.AddDays(-diff - 7);
		var endOfLastWeek = startOfLastWeek.AddDays(6);
		return new DatetimeRange(startOfLastWeek, endOfLastWeek.AddDays(1).AddTicks(-1));
	}

	public static DatetimeRange LastMonth()
	{
		var today = DateTime.Today;
		var startOfLastMonth = new DateTime(today.Year, today.Month, 1).AddMonths(-1);
		var endOfLastMonth = startOfLastMonth.AddMonths(1).AddDays(-1);
		return new DatetimeRange(startOfLastMonth, endOfLastMonth.AddDays(1).AddTicks(-1));
	}

	public static DatetimeRange LastYear()
	{
		var today = DateTime.Today;
		var startOfLastYear = new DateTime(today.Year - 1, 1, 1);
		var endOfLastYear = new DateTime(today.Year - 1, 12, 31);
		return new DatetimeRange(startOfLastYear, endOfLastYear.AddDays(1).AddTicks(-1));
	}

	// 验证方法
	public static bool IsValid(this DatetimeRange range)
	{
		if (!range.Start.HasValue || !range.End.HasValue)
			return false;
		
		return range.Start.Value <= range.End.Value;
	}

	// 检查方法
	public static bool Contains(this DatetimeRange range, DateTime dateTime)
	{
		if (!range.IsValid())
			return false;
			
		return dateTime >= range.Start!.Value && dateTime <= range.End!.Value;
	}

	public static bool Contains(this DatetimeRange range, DatetimeRange otherRange)
	{
		if (!range.IsValid() || !otherRange.IsValid())
			return false;
			
		return otherRange.Start!.Value >= range.Start!.Value && otherRange.End!.Value <= range.End!.Value;
	}

	// 检查是否与另一个时间范围重叠
	public static bool Overlaps(this DatetimeRange range, DatetimeRange otherRange)
	{
		if (!range.IsValid() || !otherRange.IsValid())
			return false;
			
		return range.Start!.Value < otherRange.End!.Value && range.End!.Value > otherRange.Start!.Value;
	}

	// 检查是否与另一个时间范围相邻
	public static bool IsAdjacentTo(this DatetimeRange range, DatetimeRange otherRange)
	{
		if (!range.IsValid() || !otherRange.IsValid())
			return false;
			
		return range.End!.Value == otherRange.Start!.Value || range.Start!.Value == otherRange.End!.Value;
	}

	// 获取与另一个时间范围的交集
	public static DatetimeRange? Intersection(this DatetimeRange range, DatetimeRange otherRange)
	{
		if (!range.Overlaps(otherRange))
			return null;
			
		var newStart = range.Start!.Value > otherRange.Start!.Value ? range.Start!.Value : otherRange.Start!.Value;
		var newEnd = range.End!.Value < otherRange.End!.Value ? range.End!.Value : otherRange.End!.Value;
		
		return new DatetimeRange(newStart, newEnd);
	}

	// 合并两个时间范围
	public static DatetimeRange? Union(this DatetimeRange range, DatetimeRange otherRange)
	{
		if (!range.Overlaps(otherRange) && !range.IsAdjacentTo(otherRange))
			return null;
			
		var newStart = range.Start!.Value < otherRange.Start!.Value ? range.Start!.Value : otherRange.Start!.Value;
		var newEnd = range.End!.Value > otherRange.End!.Value ? range.End!.Value : otherRange.End!.Value;
		
		return new DatetimeRange(newStart, newEnd);
	}

	// 操作方法
	public static DatetimeRange Expand(this DatetimeRange range, TimeSpan amount)
	{
		var newStart = range.Start.HasValue ? range.Start.Value.Subtract(amount) : (DateTime?)null;
		var newEnd = range.End.HasValue ? range.End.Value.Add(amount) : (DateTime?)null;
		return new DatetimeRange(newStart, newEnd);
	}

	public static DatetimeRange Shift(this DatetimeRange range, TimeSpan amount)
	{
		var newStart = range.Start.HasValue ? range.Start.Value.Add(amount) : (DateTime?)null;
		var newEnd = range.End.HasValue ? range.End.Value.Add(amount) : (DateTime?)null;
		return new DatetimeRange(newStart, newEnd);
	}

	public static DatetimeRange Shorten(this DatetimeRange range, TimeSpan amount)
	{
		if (!range.IsValid())
			return range;
			
		var duration = range.End!.Value - range.Start!.Value;
		if (amount >= duration)
			return new DatetimeRange(range.Start, range.Start);
			
		var newEnd = range.End.Value.Subtract(amount);
		return new DatetimeRange(range.Start, newEnd);
	}

	public static DatetimeRange Extend(this DatetimeRange range, TimeSpan amount)
	{
		if (!range.Start.HasValue)
			return range;
			
		var newEnd = range.End.HasValue ? range.End.Value.Add(amount) : range.Start.Value.Add(amount);
		return new DatetimeRange(range.Start, newEnd);
	}

	// 实用方法
	public static DateTime? GetRandomTime(this DatetimeRange range)
	{
		if (!range.IsValid())
			return null;
			
		var totalSeconds = (range.End!.Value - range.Start!.Value).TotalSeconds;
		var randomSeconds = new Random().NextDouble() * totalSeconds;
		return range.Start.Value.AddSeconds(randomSeconds);
	}

	public static List<DatetimeRange> Split(this DatetimeRange range, int count)
	{
		if (!range.IsValid() || count <= 0)
			return new List<DatetimeRange> { range };
			
		var ranges = new List<DatetimeRange>();
		var totalDuration = range.End!.Value - range.Start!.Value;
		var segmentDuration = TimeSpan.FromTicks(totalDuration.Ticks / count);
		
		for (int i = 0; i < count; i++)
		{
			var segmentStart = range.Start.Value.AddTicks(segmentDuration.Ticks * i);
			var segmentEnd = (i == count - 1) 
				? range.End.Value 
				: segmentStart.AddTicks(segmentDuration.Ticks);
				
			ranges.Add(new DatetimeRange(segmentStart, segmentEnd));
		}
		
		return ranges;
	}

	public static List<DateTime> GetDates(this DatetimeRange range)
	{
		if (!range.IsValid())
			return new List<DateTime>();
			
		var dates = new List<DateTime>();
		var currentDate = range.Start!.Value.Date;
		var endDate = range.End!.Value.Date;
		
		while (currentDate <= endDate)
		{
			dates.Add(currentDate);
			currentDate = currentDate.AddDays(1);
		}
		
		return dates;
	}

	public static List<DatetimeRange> GetDays(this DatetimeRange range)
	{
		var dates = range.GetDates();
		return dates.Select(date => 
			new DatetimeRange(date, date.AddDays(1).AddTicks(-1))).ToList();
	}

	public static List<DatetimeRange> GetWeeks(this DatetimeRange range, DayOfWeek firstDayOfWeek = DayOfWeek.Monday)
	{
		if (!range.IsValid())
			return new List<DatetimeRange>();
			
		var weeks = new List<DatetimeRange>();
		var currentWeek = ThisWeek(firstDayOfWeek);
		
		// 调整到包含开始时间的周
		while (!currentWeek.Contains(range.Start!.Value))
		{
			currentWeek = currentWeek.Shift(TimeSpan.FromDays(7));
		}
		
		// 添加所有周，直到包含结束时间
		while (currentWeek.Overlaps(range))
		{
			var intersection = currentWeek.Intersection(range);
			if (intersection != null)
			{
				weeks.Add(intersection);
			}
			currentWeek = currentWeek.Shift(TimeSpan.FromDays(7));
		}
		
		return weeks;
	}

	public static List<DatetimeRange> GetMonths(this DatetimeRange range)
	{
		if (!range.IsValid())
			return new List<DatetimeRange>();
			
		var months = new List<DatetimeRange>();
		var currentMonth = new DateTime(range.Start!.Value.Year, range.Start.Value.Month, 1);
		
		// 添加所有月，直到包含结束时间
		while (currentMonth <= range.End!.Value)
		{
			var monthRange = new DatetimeRange(
				currentMonth, 
				currentMonth.AddMonths(1).AddDays(-1).AddDays(1).AddTicks(-1));
				
			var intersection = monthRange.Intersection(range);
			if (intersection != null)
			{
				months.Add(intersection);
			}
			
			currentMonth = currentMonth.AddMonths(1);
		}
		
		return months;
	}

	// 格式化方法
	public static string ToShortString(this DatetimeRange range)
	{
		if (!range.Start.HasValue && !range.End.HasValue)
			return "未指定";
			
		if (!range.Start.HasValue)
			return $"截止 {range.End.Value:yyyy-MM-dd}";
			
		if (!range.End.HasValue)
			return $"从 {range.Start.Value:yyyy-MM-dd}";
			
		return $"{range.Start.Value:yyyy-MM-dd} - {range.End.Value:yyyy-MM-dd}";
	}

	public static string ToLongString(this DatetimeRange range)
	{
		if (!range.Start.HasValue && !range.End.HasValue)
			return "未指定时间范围";
			
		if (!range.Start.HasValue)
			return $"截止于 {range.End.Value:yyyy-MM-dd HH:mm:ss}";
			
		if (!range.End.HasValue)
			return $"开始于 {range.Start.Value:yyyy-MM-dd HH:mm:ss}";
			
		return $"{range.Start.Value:yyyy-MM-dd HH:mm:ss} 至 {range.End.Value:yyyy-MM-dd HH:mm:ss}";
	}
}
