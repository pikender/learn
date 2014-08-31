# encoding: utf-8
module OrderConcern

  # Print Functionality : prawn-print
  def render
    print
    super
  end

  private

  def build
    text inspect_text
    letterhead
    address
    title(:title)
    order_details
    body_text(:body_text1)
    state_aid_amount
    body_text(:body_text2)
  end

  def logo
    Rails.root.join('app', 'assets', 'images', 'admin', 'pod_image.png')
  end

  def letterhead
    #logo = order.logo

    if logo # && logo.exists?
      image logo, height: 50
      move_down 40
    else
      move_down 90
    end
  end

  def address
    text "Applicant Name"
    move_down 20
    text "Applicant Address"
    move_down 20
    text "Date"
    move_down 60
  end

  def title(translation_key)
    text I18n.t(translation_key, scope: translation_scope).upcase, size: 15, style: :bold
    move_down 20
  end

  def order_details
    data = [
      ["Details:", order.user_id],
      ["Option:", order.status],
      ["Order Number:", order.order_number],
      ["Price:", order.sub_total],
      ["Qty:", order.made_from],
      ["Total:", order.sub_total]
    ]

    table(data) do
      cells.borders = []
      columns(0).font_style = :bold
    end

    move_down 20
  end

  def state_aid_amount
    text I18n.t(:state_aid, scope: translation_scope, amount: order.sub_total)
    move_down 20
  end

  def body_text(translation_key, opts = {})
    bottom_margin = opts.delete(:margin) || 20
    text I18n.t(translation_key, scope: translation_scope), opts
    move_down(bottom_margin)
  end

  def indented_text(translation_key, opts = {})
    bottom_margin = opts.delete(:margin) || 20
    indent_size = opts.delete(:indent) || 20

    indent(indent_size) do
      text I18n.t(translation_key, scope: translation_scope), opts
      move_down(bottom_margin)
    end
  end

  def translation_scope
    'pdfs.order_invoice'
  end

  ## Only For test purpose
  def inspect_text
    "Single Order"
  end
end
