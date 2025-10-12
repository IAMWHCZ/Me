public enum ReferentialAction
{
	NoAction,
	Cascade,
	SetNull,
	SetDefault,
	Restrict
}
public enum DataType
{
	Text,
	DateTime,
	Date,
	Time,
	Decimal,
	Currency,
	Boolean,
	Binary,
	Password,
	EmailAddress,
	PhoneNumber,
	Url,
	ImageUrl,
	CreditCard,
	PostalCode,
	Upload,
	Html,
	MultilineText,
	DateTimeOffset
}

public enum DatabaseGeneratedOption
{
	None,
	Identity,
	Computed
}

public enum TriggerTiming
{
	Before,
	After,
	InsteadOf
}

public enum TriggerEvent
{
	Insert,
	Update,
	Delete
}
