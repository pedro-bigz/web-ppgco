export function formatCellMoneyValue(value: string) {
  return (
    <div className="whitespace-nowrap" style={{ textAlign: "right" }}>
      {`R$ ${value}`}
    </div>
  );
}
