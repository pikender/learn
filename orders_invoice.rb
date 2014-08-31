# encoding: utf-8
class OrdersInvoice < Prawn::Document

  include OrderConcern

  attr_reader :filename, :orders
  attr_accessor :order

  def initialize(orders, pdf_opts = {})
    super(pdf_opts)
    @orders = orders
    @filename = "orders_invoice.pdf"
    build_all
  end

  private

    def build_all
      orders.each_with_index do |o, i|
        self.order = o
        build
        start_new_page unless i == (orders.size - 1)
      end
    end

    def inspect_text
      "Multiple Order"
    end

end
