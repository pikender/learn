# encoding: utf-8
class OrderInvoice < Prawn::Document

  include OrderConcern

  attr_reader :filename, :order

  def initialize(order, pdf_opts = {})
    super(pdf_opts)
    @order = order
    @filename = "order_invoice#{order.order_number}.pdf"
    self.font_size = 12
    build
  end
end
