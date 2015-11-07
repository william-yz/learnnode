Ext.ns 'AR.util'

utilFunction = AR.util.fn = {}

Ext.apply utilFunction,
  toggleSelectAll : (thisScrope) ->
    thisScrope = jQuery thisScrope
    costCheckBoxs = thisScrope.closest 'table'
                    .find '.chargeCheckBox'
    checkedAll = thisScrope.attr 'checked'
    for costCheckBox in costCheckBoxs
      c = jQuery costCheckBox
      c.attr 'checked', checkedAll unless  c.hasClass 'DisplayNone'
    return

  selectCheckBox : (thisScrope) ->
    thisScrope = jQuery thisScrope
    thisTable = thisScrope.closest 'table'
    checkBoxHeader = jQuery '#chargeCheckBoxHeader'
    if thisScrope.attr 'checked' isnt checkBoxHeader.attr 'checked'
      allSelect = true
      itemCheckBoxList = thisTable.find 'input.chargeCheckBox'
      for itemCheckBox in itemCheckBoxList
        item = jQuery itemCheckBox
        allSelect = false unless item.attr 'checked'
        break
      checkBoxHeader.attr 'checked', allSelect
      return

  initToolTop : ->
    listener =
      beforeshow : (tip, e) ->
        field = tip.triggerElement
        tip.update jQuery tip.triggerElement
        .next()
        .html()
        true
    Ext.widget 'tooltip',
      cls : 'x-tip-form-invalid'
      target : Ext.getBody()
      delegate : '.ErrorCls'
      trackMouse : true
      anchor : 'top'
      listeners : listener

    Ext.widget 'tooltip',
      target : Ext.getBody()
      delegate : '.WarnCls'
      trackMouse : true
      anchor : 'top'
      listeners : listener
    return

  showWarn : (cmp,errMsg) ->
    div = cmp.next 'div'
    if div.length > 0
      div.html errMsg
    else
      cmp.after "<div style=\"display:none\">#{errMsg}</div>"
    cmp.addClass 'ErrorCls'
    return

  hideError : (cmp) -> cmp.removeClass 'WarnCls'

  hideWarn : (cmp) -> cmp.removeClass 'WarnCls'

  checkValid : (input, errMsg) ->
    if errMsg
      @.showError input, errMsg
      return false
    else
      @hideError input
      return true

  calculateCharge : (invoiceDto, chargeDto) ->
    chargeMeasurementList = chargeDto.chargeMeasurementList
    unitRate = parseFloat chargeDto.unitRate or 0
    roundingOption = invoiceDto.currency.roudingOption
