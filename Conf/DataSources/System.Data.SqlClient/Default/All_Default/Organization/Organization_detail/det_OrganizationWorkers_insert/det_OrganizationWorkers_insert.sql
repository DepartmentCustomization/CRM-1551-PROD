insert into [CRM_1551_Analitics].[dbo].[Workers]
  (
  [organization_id]
      ,[roles_id]
      ,[name]
      ,[phone_number]
      ,[position]
      ,[active]
      ,[worker_user_id]
      --,[login]
      --,[password]
      ,[user_id]
      ,[registration_date]
      ,[edit_date]
      ,[user_edit_id]
  )
  values
  (
  @organization_id
      ,@roles_id
      ,@name
      ,@phone_number
      ,@position
      ,@active
      ,@worker_user_id
      --,@login
      --,@password
      ,@user_id
      ,getdate()
      ,getdate()
      ,@user_id
  )