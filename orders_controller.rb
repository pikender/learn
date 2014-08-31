class OrdersController < ApplicationController

  before_filter :load_order, :only => [:show]

  def show
    respond_to do |format|
      format.html
      format.pdf do
        if params[:more].present?
          pdf = OrdersInvoice.new([@order, Order.first, Order.last])
          send_data(pdf.render, filename: pdf.filename, type: "application/pdf", disposition: "inline")
        else
          pdf = OrderInvoice.new(@order)
          send_data(pdf.render, filename: pdf.filename, type: "application/pdf", disposition: "inline")
        end
      end
    end
  end

  private

  def load_order
    unless @order = Order.where(:id => params[:id]).first
      flash[:error] = "Order not found"
      redirect_to root_path
    end
  end
end
