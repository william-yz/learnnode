do ->
  Ext.ns 'AR.util'
  utilFunction = AR.util.fn = {}
  Ext.apply utilFunction,
    toggleSelectAll: (thisScope) ->
      costCheckBoxs = jQuery(thisScope).closest('table').find('.chargeCheckBox')
      checkedAll = jQuery(thisScope).attr('checked')
      i = 0
      ln = costCheckBoxs.length
      while i < ln
        costCbx = jQuery(costCheckBoxs[i])
        if !costCbx.hasClass('DisplayNone')
          costCbx.attr 'checked', checkedAll
        i++
      return
    selectCheckBox: (thisScope) ->
      thisTable = jQuery(thisScope).closest('table')
      checkBoxHeader = jQuery('#chargeCheckBoxHeader')
      if jQuery(thisScope).attr('checked') != checkBoxHeader.attr('checked')
        allSelect = true
        itemCheckBoxList = thisTable.find('input.chargeCheckBox')
        i = 0
        ln = itemCheckBoxList.length
        while i < ln
          item = jQuery(itemCheckBoxList[i])
          if !item.attr('checked')
            allSelect = false
            break
          i++
        checkBoxHeader.attr 'checked', allSelect
      return
    initToolTip: ->
      Ext.widget 'tooltip',
        cls: 'x-tip-form-invalid'
        target: Ext.getBody()
        delegate: '.ErrorCls'
        trackMouse: true
        anchor: 'top'
        listeners: beforeshow: (tip, e) ->
          field = tip.triggerElement
          tip.update jQuery(tip.triggerElement).next().html()
          true
      Ext.widget 'tooltip',
        target: Ext.getBody()
        delegate: '.WarnCls'
        trackMouse: true
        anchor: 'top'
        listeners: beforeshow: (tip, e) ->
          field = tip.triggerElement
          tip.update jQuery(tip.triggerElement).next().html()
          true
      return
    showWarn: (cmp, errMsg) ->
      div = cmp.next('div')
      if div.length > 0
        div.html errMsg
      else
        cmp.after '<div style="display:none">' + errMsg + '</div>'
      cmp.addClass 'WarnCls'
      return
    showError: (cmp, errMsg) ->
      div = cmp.next('div')
      if div.length > 0
        div.html errMsg
      else
        cmp.after '<div style="display:none">' + errMsg + '</div>'
      cmp.addClass 'ErrorCls'
      return
    hideError: (cmp) ->
      cmp.removeClass 'ErrorCls'
      return
    hideWarn: (cmp) ->
      cmp.removeClass 'WarnCls'
      return
    checkValid: (input, errMsg) ->
      me = this
      if errMsg
        me.showError input, errMsg
        false
      else
        me.hideError input
        true
    getUnit: (tr) ->
      `var unit`
      `var ln`
      `var i`
      unitList = []
      units = tr.find('input.unit')
      if units.length > 0
        i = 0
        ln = units.length
        while i < ln
          unit = jQuery(units[i])
          unitList.push Number(unit.val())
          i++
      else
        units = tr.find('td.unit')
        i = 0
        ln = units.length
        while i < ln
          unit = jQuery(units[i])
          unitList.push Number(unit.html())
          i++
      unitList
    getChargeUnit: (tr) ->
      chargeUnit = undefined
      if tr.find('input.chargeUnit').length > 0
        chargeUnit = Number(tr.find('input.chargeUnit').val())
      else
        chargeUnit = Number(tr.find('td.chargeUnit').html())
      chargeUnit
    getExchRate: (tr) ->
      exchRate = undefined
      if tr.find('input.exchangeRate').length > 0
        exchRate = Number(tr.find('input.exchangeRate').val())
      else
        exchRate = Number(tr.find('td.exchangeRateTd').html())
      Number exchRate
    getVatRate: (tr) ->
      val = undefined
      if tr.find('select.vatRate').length > 0
        val = tr.find('select.vatRate').val()
      else
        val = tr.find('.vatRate').html()
      if val
        Number(val) / 100
      else
        0
    setChargeAmount: (tr, netAmount) ->
      tr.find('.chargeAmount').html @formatAmount(netAmount)
      return
    setExchChargeAmount: (tr, resultForDisplay) ->
      applyMinMax = ''
      if resultForDisplay.minMax
        applyMinMax = if resultForDisplay.minMax == 'MIN' then '(Min)' else '(Max)'
      minMax = '<font style="font-style:italic;">' + applyMinMax + '</font>'
      tr.find('.exchangedAmount').html @formatAmount(resultForDisplay.netExchAmt) + minMax
      return
    setVatAmount: (tr, vatAmount) ->
      tr.find('.vatAmount').html @formatAmount(vatAmount)
      return
    formatAmount: (num) ->
      integer = Number(String(num).split('.')[0])
      prefix = Number(num) < 0 and '-' or ''
      decimal = String(num).split('.')[1]
      if decimal
        prefix + Ext.util.Format.number(Math.abs(integer), ',') + '.' + decimal
      else
        prefix + Ext.util.Format.number(Math.abs(integer), ',')
    calculateCharge: (invoiceDto, chargeDto) ->
      `var vatExchAmt`
      `var netExchAmt`
      `var netAmt`
      `var vatExchAmt`
      `var vatAmt`
      `var vatExchAmt`
      `var vatAmt`
      chargeMeasurementList = chargeDto.chargeMeasurementList
      unitRate = parseFloat(chargeDto.unitRate or 0)
      roundingOption = invoiceDto.currency.roundingOption
      chargeRoundingOption = chargeDto.currency.roundingOption
      exchRate = parseFloat(chargeDto.exchRate)
      vatRate = parseFloat(chargeDto.vatRate or 0) / 100
      result = {}
      amount = 1
      roundByChrgOpt = @roundAmtFunc(chargeDto.currency.roundingOption)
      roundByInvcOpt = @roundAmtFunc(invoiceDto.currency.roundingOption)
      i = 0
      ln = chargeMeasurementList.length
      while i < ln
        numberOfUnit = chargeMeasurementList[i].numberOfUnit or 1
        chargeUnit = chargeMeasurementList[i].unit or 0
        amount *= chargeUnit * numberOfUnit
        i++
      if isNaN(amount)
        amount = 0
      amount *= unitRate
      if amount > 0 and (chargeDto.minValue or chargeDto.maxValue)
        if chargeDto.minValue and amount < chargeDto.minValue
          amount = chargeDto.minValue
          result.minMax = 'MIN'
        else if chargeDto.maxValue and amount > chargeDto.maxValue
          amount = chargeDto.maxValue
          result.minMax = 'MAX'
      result.exchRate = exchRate
      amount = roundByChrgOpt(amount)
      result.amount = result.netAmt = amount
      exchAmt = roundByInvcOpt(amount * exchRate)
      result.exchAmt = result.netExchAmt = exchAmt
      if invoiceDto.vatApplied or !Ext.isEmpty(AR.controller.ArCreateDetail.taxCodeList)
        if chargeDto.intercom
          if chargeDto.vatOption == 'SHA_VAT'
            vatAmt = roundByChrgOpt(amount / (1 + vatRate) * vatRate)
            vatExchAmt = roundByInvcOpt(vatAmt * exchRate)
            result.vatExchAmt = vatExchAmt
            netAmt = roundByChrgOpt(amount - vatAmt)
            netExchAmt = roundByInvcOpt(exchAmt - vatExchAmt)
            result.netAmt = netAmt
            result.netExchAmt = netExchAmt
          else
            vatAmt = roundByChrgOpt(amount * vatRate)
            vatExchAmt = roundByInvcOpt(vatAmt * exchRate)
            result.vatExchAmt = vatExchAmt
        else
          if chargeDto.vatOption == 'SHA_VAT'
            vatAmt = roundByChrgOpt(amount / (1 + vatRate) * vatRate)
            vatExchAmt = roundByInvcOpt(exchAmt / (1 + vatRate) * vatRate)
            result.vatExchAmt = vatExchAmt
            netAmt = roundByChrgOpt(amount - vatAmt)
            netExchAmt = roundByInvcOpt(exchAmt - vatExchAmt)
            result.netAmt = netAmt
            result.netExchAmt = netExchAmt
          else
            vatExchAmt = roundByInvcOpt(exchAmt * vatRate)
            result.vatExchAmt = vatExchAmt
      Ext.apply chargeDto, result
      return
    roundAmtFunc: (chargeRoundingOption, resultForDisplay) ->
      if resultForDisplay
        (amt, amtType) ->
          formatedAmt = icsjs.fx.roundAmount(amt, chargeRoundingOption)
          if amtType
            resultForDisplay[amtType] = formatedAmt
          Number formatedAmt
      else
        (amt) ->
          formatedAmt = icsjs.fx.roundAmount(amt, chargeRoundingOption)
          Number formatedAmt
    calculateRow: (tr) ->
      `var total`
      `var oriTotal`
      `var vatExchAmt`
      `var netExchAmt`
      `var netAmt`
      `var vatExchAmt`
      `var vatAmt`
      `var vatExchAmt`
      `var vatAmt`
      result = {}
      resultForDisplay = {}
      chargeDto = @getChargeDto(tr)
      invoiceDto = @getInvoiceDto(tr)
      unitValues = @getUnit(tr)
      chargeUnit = @getChargeUnit(tr)
      exchRate = @getExchRate(tr)
      vatRate = @getVatRate(tr)
      amount = 1
      originAmt = parseFloat(chargeDto.netExchAmt or 0) + parseFloat(chargeDto.vatExchAmt or 0)
      roundByChrgOpt = @roundAmtFunc(chargeDto.currency.roundingOption, resultForDisplay)
      roundByInvcOpt = @roundAmtFunc(invoiceDto.currency.roundingOption, resultForDisplay)
      if chargeDto.intercom
        vatRate = chargeDto.vatRate / 100
      i = 0
      ln = unitValues.length
      while i < ln
        numberOfUnit = 1
        if !Ext.isEmpty(chargeDto.chargeMeasurementList) and chargeDto.chargeMeasurementList[i].numberOfUnit
          numberOfUnit = chargeDto.chargeMeasurementList[i].numberOfUnit
        amount = amount * unitValues[i] * numberOfUnit
        i++
      amount *= chargeUnit
      if amount > 0 and (chargeDto.minValue or chargeDto.maxValue)
        if chargeDto.minValue and amount < chargeDto.minValue
          amount = chargeDto.minValue
          result.minMax = 'MIN'
        else if chargeDto.maxValue and amount > chargeDto.maxValue
          amount = chargeDto.maxValue
          result.minMax = 'MAX'
        resultForDisplay.minMax = result.minMax
      result.exchRate = exchRate
      amount = roundByChrgOpt(amount, 'netAmt')
      result.amount = result.netAmt = amount
      exchAmt = roundByInvcOpt(amount * exchRate, 'netExchAmt')
      result.exchAmt = result.netExchAmt = exchAmt
      if invoiceDto.vatApplied or !Ext.isEmpty(AR.controller.ArCreateDetail.taxCodeList)
        if chargeDto.intercom
          if chargeDto.vatOption == 'SHA_VAT'
            vatAmt = roundByChrgOpt(amount / (1 + vatRate) * vatRate)
            vatExchAmt = roundByInvcOpt(vatAmt * exchRate, 'vatExchAmt')
            result.vatExchAmt = vatExchAmt
            netAmt = roundByChrgOpt(amount - vatAmt, 'netAmt')
            netExchAmt = roundByInvcOpt(exchAmt - vatExchAmt, 'netExchAmt')
            result.netAmt = netAmt
            result.netExchAmt = netExchAmt
          else
            vatAmt = roundByChrgOpt(amount * vatRate)
            vatExchAmt = roundByInvcOpt(vatAmt * exchRate, 'vatExchAmt')
            result.vatExchAmt = vatExchAmt
        else
          if chargeDto.vatOption == 'SHA_VAT'
            vatAmt = roundByChrgOpt(amount / (1 + vatRate) * vatRate)
            vatExchAmt = roundByInvcOpt(exchAmt / (1 + vatRate) * vatRate, 'vatExchAmt')
            result.vatExchAmt = vatExchAmt
            netAmt = roundByChrgOpt(amount - vatAmt, 'netAmt')
            netExchAmt = roundByInvcOpt(exchAmt - vatExchAmt, 'netExchAmt')
            result.netAmt = netAmt
            result.netExchAmt = netExchAmt
          else
            vatExchAmt = roundByInvcOpt(exchAmt * vatRate, 'vatExchAmt')
            result.vatExchAmt = vatExchAmt
      Ext.apply chargeDto, result
      @refreshRow tr, resultForDisplay
      deffAmt = result.netExchAmt + (result.vatExchAmt or 0) - originAmt
      currency = invoiceDto.currency
      if AR.controller.ArCreateDetail.isBatch
        invoiceIndex = Number(tr.closest('tbody').attr('id').replace(/[^0-9]/ig, ''))
        oriTotal = parseFloat(jQuery('#subTotalAmount_' + invoiceIndex).html().replace(/[^0-9\.]/ig, '') or 0)
        total = oriTotal + deffAmt
        jQuery('#subTotalAmount_' + invoiceIndex).html @formatAmount(icsjs.fx.roundAmount(total, currency.roundingOption))
        jQuery('#subTotalCurrency_' + invoiceIndex).html currency.code
      else
        oriTotal = parseFloat(Ext.getCmp('totalAmount').getValue().replace(/[^0-9\.]/ig, '') or 0)
        total = oriTotal + deffAmt
        if total == 0
          Ext.getCmp('totalAmount').setValue 'No Charge'
        else
          Ext.getCmp('totalAmount').setValue currency.code + '  ' + @formatAmount(icsjs.fx.roundAmount(total, currency.roundingOption))
      return
    setTotal: (invoiceIndex, currency) ->
      total = 0
      jQuery('#invoiceIndex' + invoiceIndex).find('.exchangedAmount').each (index, td) ->
        total += parseFloat(jQuery(td).html().replace(/,/g, ''))
        return
      jQuery('#invoiceIndex' + invoiceIndex).find('.vatAmount').each (index, td) ->
        total += parseFloat(jQuery(td).html().replace(/,/g, ''))
        return
      if total == 0
        Ext.getCmp('totalAmount').setValue 'No Charge'
      else
        Ext.getCmp('totalAmount').setValue currency.code + '  ' + @formatAmount(icsjs.fx.roundAmount(total, currency.roundingOption))
      return
    refreshRow: (tr, resultForDisplay) ->
      chargeDto = @getChargeDto(tr)
      @setChargeAmount tr, resultForDisplay.netAmt
      @setExchChargeAmount tr, resultForDisplay
      if tr.find('.vatAmount').length > 0
        @setVatAmount tr, resultForDisplay.vatExchAmt
      intercomCharge = tr.next('.intercomCharge')
      if intercomCharge.length > 0 and resultForDisplay.vatExchAmt > 0
        intercomCharge.find('td.exchangedAmount').html resultForDisplay.vatExchAmt
      return
    isValidExchangeRate: (thisScope) ->
      me = this
      if me.validateExchangeRate(thisScope)
        me.calculateRow jQuery(thisScope).closest('tr.charge')
      return
    validateExchangeRate: (thisScope) ->
      me = this
      unitInput = jQuery(thisScope)
      tr = unitInput.closest('tr.charge')
      errMsg = undefined
      if unitInput.val() == '' or Number(unitInput.val()) == 0
        errMsg = MESSAGES.AP.HIGHLIGHT.MISSING('Exchange Rate')
      else
        exchangeRatePrecision =
          minUiDisplayAfterDecimalPlaces: 6
          noOfDigitAfterDecimalPlaces: 7
          noOfDigitBeforeDecimalPlaces: 8
        validateReturn = validateNumberBeforeAndAfterDecimalPlaces('', unitInput.val(), exchangeRatePrecision)
        if validateReturn and validateReturn.errorMsg
          errMsg = MESSAGES.AP.HIGHLIGHT.INVALID_NUMBER('Exchange Rate', validateReturn.errorMsg)
        if !errMsg and !me.validateToleranceExchRate(unitInput)
          errMsg = MESSAGES.AP.HIGHLIGHT.EXCHANGE_RATE_EXCEED_TOLERANCE()
        me.getChargeDto(tr).exchRate = Number(validateReturn.formattedValue)
        unitInput.val validateReturn.formattedValue
      me.checkValid unitInput, errMsg
    validateToleranceExchRate: (input) ->
      tr = input.closest('tr.charge')
      charge = @getChargeDto(tr)
      toleranceExchRate = AR.controller.ArCreateDetail.exchRateTolerance
      baseExchRate = charge.baseExchRate
      if !toleranceExchRate
        return true
      if !baseExchRate
        return true
      newRate = Number(input.val())
      upperLimit = (100 + toleranceExchRate) * baseExchRate / 100
      lowerLimit = (100 - toleranceExchRate) * baseExchRate / 100
      newRate >= lowerLimit and newRate <= upperLimit
    isValidUnit: (thisScope) ->
      if @validateUnit(thisScope)
        @calculateRow jQuery(thisScope).closest('tr.charge')
      return
    validateUnit: (thisScope) ->
      me = this
      unitInput = jQuery(thisScope)
      tr = unitInput.closest('tr.charge')
      errMsg = undefined
      if unitInput.val() == '' or Number(unitInput.val()) == 0
        errMsg = MESSAGES.AP.HIGHLIGHT.MISSING('Unit')
      else
        if isNaN(unitInput.val())
          errMsg = 'Invalid Number'
        else if Number(unitInput.attr('no')) != 0 and Number(unitInput.val()) < 0
          errMsg = MESSAGES.AP.UNIT_LESS_THAN_ZERO()
        else
          result = AR.util.fn.checkUnit(unitInput.val(), Number(unitInput.attr('decimalPlace')))
          errMsg = result.errorMsg
          me.getChargeDto(tr).chargeMeasurementList[Number(unitInput.attr('no'))].unit = result.formattedValue
          unitInput.val result.formattedValue
      me.checkValid unitInput, errMsg
    isValidUnitRate: (thisScope) ->
      if @validateUnitRate(thisScope)
        @calculateRow jQuery(thisScope).closest('tr.charge')
      return
    validateUnitRate: (thisScope) ->
      me = this
      unitRateInput = jQuery(thisScope)
      tr = unitRateInput.closest('tr.charge')
      chargeIndex = Number(tr.attr('id').replace(/[^0-9]/ig, ''))
      errMsg = undefined
      if unitRateInput.val() == '' or Number(unitRateInput.val()) == 0
        errMsg = MESSAGES.AP.HIGHLIGHT.MISSING('Charge/Unit')
      else
        if isNaN(unitRateInput.val())
          errMsg = 'Invalid Number'
        else if Number(unitRateInput.val()) < 0
          errMsg = MESSAGES.AP.UNIT_LESS_THAN_ZERO()
        else
          chargeDto = me.getChargeDto(tr)
          unitRate = icsjs.fx.roundAmount(unitRateInput.val(), chargeDto.currency.roundingOption)
          chargeDto.unitRate = unitRate
          unitRateInput.val unitRate
      me.checkValid unitRateInput, errMsg
    validateTaxCode: (thisScope) ->
      me = this
      taxCodeInput = jQuery(thisScope)
      errMsg = undefined
      if taxCodeInput.val() == ''
        errMsg = MESSAGES.AP.HIGHLIGHT.MISSING('Tax Code')
      me.checkValid taxCodeInput, errMsg
    onChangeTaxCode: (thisScope) ->
      tr = jQuery(thisScope).closest('tr')
      taxCode = tr.find('select.taxCode').val()
      chargeDto = @getChargeDto(tr)
      if !AR.util.fn.validateTaxCode(tr.find('select.taxCode'))
        return
      taxCodeRecord = null
      i = 0
      ln = AR.controller.ArCreateDetail.taxCodeList.length
      while i < ln
        if taxCode == AR.controller.ArCreateDetail.taxCodeList[i].taxCode
          taxCodeRecord = AR.controller.ArCreateDetail.taxCodeList[i]
        i++
      if chargeDto.intercom
        chargeDto.taxCode = taxCodeRecord.taxCode
        chargeDto.remarks = taxCodeRecord.remarks
        tr.find('.remarks').html chargeDto.remarks
        return
      if taxCodeRecord
        chargeDto.taxCode = taxCodeRecord.taxCode
        chargeDto.remarks = taxCodeRecord.remarks
        chargeDto.vatRate = taxCodeRecord.taxRate
      else
        chargeDto.vatRate = 0
        chargeDto.remarks = ''
        chargeDto.taxCode = ''
      displayVatRate = chargeDto.vatRate
      if parseInt(chargeDto.vatRate) == chargeDto.vatRate
        displayVatRate = chargeDto.vatRate + '.0'
      if tr.find('select.vatRate').length > 0
        tr.find('select.vatRate').val chargeDto.vatRate
      else
        tr.find('.vatRate').html displayVatRate
      tr.find('.remarks').html chargeDto.remarks
      AR.util.fn.calculateRow tr
      return
    onChangeVatRate: (thisScope) ->
      select = jQuery(thisScope)
      tr = select.closest('tr')
      chargeDto = @getChargeDto(tr)
      chargeDto.vatRate = parseFloat(select.val())
      AR.util.fn.calculateRow tr
      return
    updateChargeRemarks: (thisScope) ->
      tr = jQuery(thisScope).closest('tr')
      chargeDto = @getChargeDto(tr)
      chargeDto.remarks = jQuery(thisScope).val()
      return
    onChangeRequestByShipper: (thisScope) ->
      tr = jQuery(thisScope).closest('tr')
      chargeDto = @getChargeDto(tr)
      chargeDto.requestedByShipper = jQuery(thisScope).attr('checked')
      return
    calculateSubTotal: (invoiceIndex, currency) ->
      total = 0
      vatTotal = 0
      jQuery('#invoiceIndex' + invoiceIndex).find('.exchangedAmount').each (index, td) ->
        total += parseFloat(jQuery(td).html().replace(/,/g, ''))
        return
      jQuery('#invoiceIndex' + invoiceIndex).find('.vatAmount').each (index, td) ->
        vatTotal += parseFloat(jQuery(td).html().replace(/,/g, ''))
        return
      jQuery('#subTotalAmount_' + invoiceIndex).html @formatAmount(icsjs.fx.roundAmount(total + vatTotal, currency.roundingOption))
      jQuery('#subTotalCurrency_' + invoiceIndex).html currency.code
      #jQuery('#subTotalVatAmount_' + invoiceIndex).html(this.formatAmount(icsjs.fx.roundAmount(vatTotal, currency.roundingOption)));
      return
    refreshTotals: ->
      invoiceAmendDtoList = AR.controller.ArCreateDetail.invoiceAmendDtoList
      i = 0
      ln = invoiceAmendDtoList.length
      while i < ln
        if invoiceAmendDtoList[i]
          @calculateSubTotal i, invoiceAmendDtoList[i].currency
        i++
      return
    getInvoiceDto: (tr) ->
      invoiceIndex = Number(tr.closest('tbody').attr('id').replace(/[^0-9]/ig, ''))
      AR.controller.ArCreateDetail.invoiceAmendDtoList[invoiceIndex]
    getChargeDto: (tr, invoiceDto) ->
      if !invoiceDto
        invoiceDto = @getInvoiceDto(tr)
      chargeIndex = Number(tr.attr('id').replace(/[^0-9]/ig, ''))
      if invoiceDto.existingChargeList and chargeIndex < invoiceDto.existingChargeList.length
        invoiceDto.existingChargeList[chargeIndex]
      else
        invoiceDto.newAddedChargeList[chargeIndex - (invoiceDto.existingChargeList.length)]
    afterAddCharge: (chargeDtoList) ->
      `var invoiceDto`
      `var invoiceIndex`
      chargeRowMap = {}
      i = 0
      ln = chargeDtoList.length
      while i < ln
        chargeDto = chargeDtoList[i]
        invoiceIndex = chargeDto.invoiceIndex
        invoiceDto = AR.controller.ArCreateDetail.invoiceAmendDtoList[invoiceIndex]
        chargeDto.baseExchRate = chargeDto.exchRate
        AR.util.fn.calculateCharge invoiceDto, chargeDto
        if !invoiceDto.existingChargeList
          invoiceDto.existingChargeList = []
        if !invoiceDto.newAddedChargeList
          invoiceDto.newAddedChargeList = []
        if !chargeRowMap['#invoiceIndex' + invoiceIndex]
          chargeRowMap['#invoiceIndex' + invoiceIndex] = []
        totalIndex = invoiceDto.existingChargeList.length + invoiceDto.newAddedChargeList.length
        invoiceDto.newAddedChargeList.push chargeDto
        chargeRow = chargeTableTpl.generateChargeRow(invoiceDto, chargeDto, false, totalIndex)
        chargeRowMap['#invoiceIndex' + invoiceIndex].push chargeRow
        i++
      for index of chargeRowMap
        tbody = jQuery(index)
        trList = chargeRowMap[index]
        invoiceIndex = Number(index.replace(/[^0-9]/ig, ''))
        invoiceDto = AR.controller.ArCreateDetail.invoiceAmendDtoList[invoiceIndex]
        tbody.append trList.join('')
        if AR.controller.ArCreateDetail.isBatch
          AR.util.fn.calculateSubTotal invoiceIndex, invoiceDto.currency
        else
          AR.util.fn.setTotal invoiceIndex, invoiceDto.currency
      if Ext.getCmp('add_charge_detail_window')
        Ext.getCmp('add_charge_detail_window').destroy()
      if chargeDtoList.length > 0
        jQuery('#addNewChargeBlock').hide()
      Ext.getCmp('ar_create_detail_charge').updateLayout()
      AR.util.fn.validateAll()
      AR.util.fn.distinguishCharge()
      return
    distinguishCharge: ->
      jQuery('.chargeBody').each ->
        isEven = true
        jQuery(this).children('tr').each (index) ->
          if Ext.String.startsWith(jQuery(this).attr('id'), 'chargeRow')
            isEven = !isEven
          if isEven
            jQuery(this).addClass 'charge-even'
          else
            jQuery(this).removeClass 'charge-even'
          return
        return
      return
    checkUnit: (value, decimalPlace) ->
      precisionInfo = {}
      precisionInfo.noOfDigitBeforeDecimalPlaces = 15
      precisionInfo.noOfDigitAfterDecimalPlaces = decimalPlace
      precisionInfo.minUiDisplayAfterDecimalPlaces = decimalPlace
      validateNumberBeforeAndAfterDecimalPlaces null, value, precisionInfo
    validateAll: ->
      invoiceList = AR.controller.ArCreateDetail.invoiceAmendDtoList
      result = true
      i = 0
      ln = invoiceList.length
      while i < ln
        trs = jQuery('#invoiceIndex' + i).children()
        j = 0
        lnj = trs.length
        while j < lnj
          result = AR.util.fn.validateRow(jQuery(trs[j])) and result
          j++
        i++
      result
    validateRow: (tr) ->
      inputs = tr.find('input,select')
      result = true
      i = 0
      ln = inputs.length
      while i < ln
        input = jQuery(inputs[i])
        if input.hasClass('unit')
          result = AR.util.fn.validateUnit(input) and result
        else if input.hasClass('chargeUnit')
          result = AR.util.fn.validateUnitRate(input) and result
        else if input.hasClass('exchangeRate')
          result = AR.util.fn.validateExchangeRate(input) and result
        else if input.hasClass('taxCode')
          result = AR.util.fn.validateTaxCode(input) and result
        i++
      #add check for non-editable Charge/Unit
      tr.find('td.chargeUnit').each (index, td) ->
        unitRateTd = jQuery(td)
        if Number(unitRateTd.html()) == 0
          result = false
          AR.util.fn.checkValid unitRateTd, MESSAGES.AP.HIGHLIGHT.MISSING('Charge/Unit')
        return
      result
    deleteCharge: ->
      selectedRows = jQuery('#charge_table .chargeCheckBox:checked')
      if selectedRows.length <= 0
        icsjs.fx.promptErrorMsgV2 MESSAGES.COMM.EMPTY_SELECT('Charge')
      else
        selectedTrs = selectedRows.closest('tr.charge')
        i = 0
        ln = selectedTrs.length
        while i < ln
          tr = jQuery(selectedTrs[i])
          intercomTr = tr.next('.intercomCharge')
          if intercomTr.length > 0
            intercomTr.remove()
          chargeIndex = parseInt(tr.attr('id').replace(/[^0-9]/ig, ''))
          invoiceDto = AR.util.fn.getInvoiceDto(tr)
          if chargeIndex < invoiceDto.existingChargeList.length
            invoiceDto.existingChargeList[chargeIndex] = null
          else
            invoiceDto.newAddedChargeList[chargeIndex - (invoiceDto.existingChargeList.length)] = null
          tr.remove()
          i++
        if AR.controller.ArCreateDetail.isBatch
          AR.util.fn.refreshTotals()
        else
          invoiceIndex = Number(jQuery('#charge_table .chargeBody').attr('id').replace(/[^0-9]/ig, ''))
          AR.util.fn.setTotal invoiceIndex, AR.controller.ArCreateDetail.invoiceAmendDtoList[invoiceIndex].currency
          chargeBody = jQuery('#invoiceIndex' + invoiceIndex)
          if chargeBody.children().length == 0
            jQuery('#addNewChargeBlock').show()
      jQuery('#chargeCheckBoxHeader').attr 'checked', ''
      Ext.getCmp('ar_create_detail_charge').updateLayout()
      AR.util.fn.distinguishCharge()
      return
    getCurrency: (currCode) ->
      curr = null
      Ext.Array.each AR.controller.ArCreateDetail.currencyDtoList, (dto) ->
        if dto.code == currCode
          curr = dto
          return false
        return
      curr
    getExchangeRate: (fromCurrCode, toCurrCode) ->
      exchangeRate = 1
      Ext.Array.each AR.controller.ArCreateDetail.exchangeRateDtoList, (dto) ->
        if dto.fromCurrencyCode == fromCurrCode and dto.toCurrencyCode == toCurrCode
          exchangeRate = dto.exchangeRate
          return false
        return
      exchangeRate
    updateExchangeRate: (tr, exchangeRateTd, exchangeRate, toCurrCode) ->
      me = this
      unitRateStr = []
      editable = exchangeRate != 1
      if editable
        exchangeRateTd.addClass 'column-editable'
        unitRateStr.push '<input class="NOBDINPUT FIELD_TEXT exchangeRate" style="width:100%;text-align:right;" value="' + Number(exchangeRate).toFixed(6) + '" onblur="AR.util.fn.isValidExchangeRate(this);"/>'
      else
        exchangeRateTd.removeClass 'column-editable'
        unitRateStr.push '1.000000'
      exchangeRateTd.html unitRateStr.join('')
      tr.find('.toCurrency').text toCurrCode
      me.calculateRow tr
      return
  return
