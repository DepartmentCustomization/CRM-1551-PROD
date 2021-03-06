  select [Buildings].Id, [Districts].Id district_id, 
  [Districts].name DistrictName, Streets.Id street_id, 
  [StreetTypes].shortname+N' '+ Streets.name StreetName,
  [Buildings].number, [Buildings].letter,
  [Buildings].[bsecondname] bsecondname, [Buildings].[index] 'index',
  [StreetTypes].shortname+N' '+[Streets].name+N', '+[Buildings].name full_name
  
  from [CRM_1551_Analitics].[dbo].[Buildings] left join [CRM_1551_Analitics].[dbo].[Districts] on [Buildings].district_id=[Districts].Id
  left join [CRM_1551_Analitics].[dbo].[Streets] on [Buildings].street_id=Streets.Id
  left join [CRM_1551_Analitics].[dbo].[StreetTypes] on [Streets].street_type_id=[StreetTypes].Id
  where #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only