SELECT [Id]
      ,[name]
  FROM [dbo].[EventTypes]
  WHERE 
    #filter_columns#
    #sort_columns#
    offset @pageOffsetRows rows fetch next @pageLimitRows rows only