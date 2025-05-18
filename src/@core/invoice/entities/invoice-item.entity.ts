export class InvoiceItem {
  constructor(
    public readonly description: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
  ) {}

  get total(): number {
    return this.quantity * this.unitPrice;
  }
}
