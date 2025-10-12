namespace CZ.Me.Core.Attribution;

// 表和列映射特性
public class TableAttribute(string tableName) : Attribute
{
	public string TableName { get; } = tableName;
	public string? Schema { get; set; }
}

public class ColumnAttribute(string column) : Attribute
{
	public string ColumnName { get; } = column;
	public int Order { get; set; }
	public string? TypeName { get; set; }
}

// 主键特性
public class KeyAttribute : Attribute
{
	public string? Name { get; set; }
}

public class PrimaryKeyAttribute : KeyAttribute
{
	public bool IsIdentity { get; set; } = true;
	public string? SequenceName { get; set; }
}

// 外键特性
public class ForeignKeyAttribute(string name) : Attribute
{
	public string Name { get; set; } = name;
	public string? PrincipalSchema { get; set; }
	public string? PrincipalTable { get; set; }
	public string? PrincipalKey { get; set; }
	public ReferentialAction OnDelete { get; set; } = ReferentialAction.NoAction;
	public ReferentialAction OnUpdate { get; set; } = ReferentialAction.NoAction;
}

// 索引特性
public class IndexAttribute : Attribute
{
	public string? Name { get; set; }
	public bool IsUnique { get; set; } = false;
	public bool IsClustered { get; set; } = false;
	public int[]? Columns { get; set; }
}

// 约束特性
public class RequiredAttribute : Attribute
{
	public bool AllowEmptyStrings { get; set; } = false;
}

public class MaxLengthAttribute(int length) : Attribute
{
	public int Length { get; } = length;
}

public class MinLengthAttribute(int length) : Attribute
{
	public int Length { get; } = length;
}

public class StringLengthAttribute(int maximumLength) : Attribute
{
	public int MaximumLength { get; } = maximumLength;
	public int MinimumLength { get; set; }
}

public class RangeAttribute(double minimum, double maximum) : Attribute
{
	public double Minimum { get; } = minimum;
	public double Maximum { get; } = maximum;
}

public class RegularExpressionAttribute(string pattern) : Attribute
{
	public string Pattern { get; } = pattern;
}

// 数据类型特性
public class DataTypeAttribute(DataType dataType) : Attribute
{
	public DataType DataType { get; } = dataType;
}

// 默认值特性
public class DefaultValueAttribute(object? value) : Attribute
{
	public object? Value { get; set; } = value;
}

public class DatabaseGeneratedAttribute(DatabaseGeneratedOption option) : Attribute
{
	public DatabaseGeneratedOption DatabaseGeneratedOption { get; } = option;
}

// 并发控制特性
public class TimestampAttribute : Attribute
{
	public string? ColumnName { get; set; }
}

public class ConcurrencyCheckAttribute : Attribute
{
}

// 关系映射特性
public class InversePropertyAttribute(string property) : Attribute
{
	public string Property { get; } = property;
}

public class NotMappedAttribute : Attribute
{
}

// 复杂类型特性
public class ComplexTypeAttribute : Attribute
{
}

// 表值函数特性
public class TableValuedFunctionAttribute(string name) : Attribute
{
	public string Name { get; } = name;
	public string? Schema { get; set; }
}

// 存储过程特性
public class StoredProcedureAttribute(string name) : Attribute
{
	public string Name { get; } = name;
	public string? Schema { get; set; }
}

// 视图特性
public class ViewAttribute(string name) : Attribute
{
	public string Name { get; } = name;
	public string? Schema { get; set; }
}

// 模式特性
public class SchemaAttribute(string schema) : Attribute
{
	public string Schema { get; } = schema;
}

// 触发器特性
public class TriggerAttribute(string name) : Attribute
{
	public string Name { get; } = name;
	public TriggerTiming Timing { get; set; } = TriggerTiming.After;
	public TriggerEvent Event { get; set; } = TriggerEvent.Insert;
}

// 计算列特性
public class ComputedColumnAttribute(string? sql = null) : Attribute
{
	public string? Sql { get; set; } = sql;
	public bool IsStored { get; set; } = false;
}

// 序列特性
public class SequenceAttribute(string name) : Attribute
{
	public string Name { get; } = name;
	public string? Schema { get; set; }
	public int StartValue { get; set; } = 1;
	public int IncrementBy { get; set; } = 1;
	public int? MinValue { get; set; }
	public int? MaxValue { get; set; }
	public bool IsCyclic { get; set; } = false;
}
