invoiceDto = AR.controller.ArCreateDetail.invoiceAmendDtoList[0]
echarge = invoiceDto.existingChargeList
ncharge = invoiceDto.newAddedChargeList

for c, i in echarge
  if c?
    if i%2 is 0
      c.splitTo = 1
    else
      c.splitTo = 2

for c, i in ncharge
  if c?
    if i%2 is 0
      c.splitTo = 1
    else
      c.splitTo = 2

ArBillingAdjustmentDetailDwrBean.doSplit AR.controller.ArCreateDetail.invoiceAmendDtoList, true, null, 'test split', AR.getApplication().getController('BillingAdjustment').doAfterConfirm()