  update [Appeals]
  set --[registration_date]= @registration_date
      --[phone_number]= @phone_number
      [applicant_name]= @applicant_name
      ,[applicant_address]= @applicant_address
      ,[marital_status_id]= @marital_status_id
      ,[sex]= @sex_id
      ,[age]= @age
      ,[education_id]= @education_id
      ,[applicant_privilage_id]= @applicant_privilage_id
      ,[guidance_kind_id]= @guidance_kind_id
      ,[applicant_needs]= @applicant_needs
      ,[offender_name]= @offender_name
      ,[service_content]= @service_content
      ,[comment]= @comment
      --,[user_id]= @
      ,[edit_date]= GETUTCDATE()
      ,[user_edit_id]= @user_edit_id
  where Id=@Appeals_Id